import ee
from ee.ee_exception import EEException

import math
from .local_settings import SERVICE_ACCOUNT, SERVICE_KEYFILE

try:
    ee.Initialize()
except EEException as e:
    service_account_email=SERVICE_ACCOUNT
    filename=SERVICE_KEYFILE
    credentials=ee.ServiceAccountCredentials(service_account_email,filename)
    ee.Initialize(credentials)


def getPondMap(startDate):
    def pondClassifier(shape):
        # latest = ee.Image(waterCollection.select('water').filterBounds(shape.geometry()).first())

        avg = mosaic.reduceRegion(
            reducer=ee.Reducer.mean(),
            scale=30,
            geometry=shape.geometry(),
            bestEffort=True
        )

        try:
            val = ee.Number(ee.Algorithms.If(avg.get('water'),avg.get('water'),0))

            cls = val.gt(0.25)

            cls = cls.add(val.gt(0.75))
        except:
            val = np.random.choice(2, 1)
            cls = ee.Number(val[0])

        return ee.Feature(shape).set({'pondCls': val})


    today = ee.Date(startDate)
    prevTime = today.advance(-32,'day')

    # get ponds feature collection, calculate the area, and filter based on area
    ponds = ee.FeatureCollection('projects/servir-e-sa/rangelands/SW_WPmerged')\
                    .map(addArea).filter(ee.Filter.gt("area",10000))

    # get feature collection of all countries and filter for Kenya
    kenya = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.eq("country_co","KE"))

    # get the Imagecollection for Landsat 8 surface reflectance product
    lc8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR").filterDate(prevTime,today).filterBounds(kenya)
    # get the Imagecollection for Landsat 7 surface reflectance product
    le7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR").filterDate(prevTime,today).filterBounds(kenya)

    lc8Bands = ['B2','B3','B4','B5','B6','B7','pixel_qa']
    le7Bands = ['B1','B2','B3','B4','B5','B7','pixel_qa']
    newBands = ['blue','green','red','nir','swir1','swir2','pixel_qa']

    # merge the two landsat collections together with the same band names
    landsat = lc8.select(lc8Bands,newBands).merge(le7.select(le7Bands,newBands)).map(cloudMask)

    # caluclate water index for each image in collection
    waterCollection = landsat.map(waterClassifier)
    mosaic = waterCollection.max()

    # classify ponds by area covered by water
    pond_cls = ponds.map(pondClassifier)

    # convert the feature colelction to an image
    pondsImg = pond_cls.reduceToImage(properties=['pondCls'],
                                       reducer=ee.Reducer.first())

    map_id = pondsImg.getMapId({"min":0,"max":1,"palette":"silver,lightblue,blue,darkblue"})

    # tile_url_template = unicode("https://earthengine.googleapis.com/map/{mapid}/{${z}}/{${x}}/{${y}}?token={token}","utf-8")
    # return {"mapid":mapid['mapid'],'token':mapid['token']}
    return map_id['tile_fetcher'].url_format


def addArea(feature):
    return feature.set('area',feature.area())


# helper function to extract bit values from an integer image
def extractBits(image,start,end,name):
    pattern = 0
    for i in range(start,end):
        pattern += int(math.pow(2,i))
    bitmask = image.select([0],[name]).bitwiseAnd(pattern).rightShift(start)
    return bitmask

# function to mask clouds and cloud shadows
def cloudMask(image):
    clouds = extractBits(image.select('pixel_qa'),5,5,'clouds').neq(1)
    shadows = extractBits(image.select('pixel_qa'),3,3,'shadows').neq(1)
    mask = clouds.And(shadows)
    return image.updateMask(mask)


def waterClassifier(img):
    wetness = img.expression('0.1511*B1 + 0.1973*B2 + 0.3283*B3 + 0.3407*B4 + -0.7117*B5 + -0.4559*B7',{
        'B1': img.select('blue'),
        'B2': img.select('green'),
        'B3': img.select('red'),
        'B4': img.select('nir'),
        'B5': img.select('swir1'),
        'B7': img.select('swir2'),
    }).rename('tcWetness')

    THRESHOLD = ee.Number(-0.1304) # threshold based on an analysis for ponds

    mask = img.select([0]).mask()

    water = ee.Image(0).where(mask, wetness.gt(THRESHOLD))

    result = img.addBands(water.rename(['water']))
    return result.copyProperties(img, ["system:time_start","CLOUD_COVER"])