import ee, logging
from ee.ee_exception import EEException 

logger = logging.getLogger(__name__)
try:
	ee.Initialize()

except EEException as e:
	print("Failed to Initialize google earth engine. Error is: "+ str(e))

def imageToMapId(imageName, visParams={}):
    """  """
    try:
        eeImage = ee.Image(imageName)
        mapId = eeImage.getMapId(visParams)
        return {
        	'url': mapId['tile_fetcher'].url_format
        }
    except EEException as e:
    	logger.error("******imageToMapId error************", sys.exc_info()[0])
    return {
    	'errMsg':str(sys.exc_info()[0])
    }

def getMap(collectionName, visParams={}, reducer='mosaic', time_start=None, time_end=None):
    try:
        values = None
        eeCollection = ee.ImageCollection(collectionName).select('NDVI')
        if (time_start and time_end):
            eeFilterDate = ee.Filter.date(time_start, time_end)
            eeCollection = eeCollection.filter(eeFilterDate)
        if(reducer == 'min'):
            values = ee.data.getTileUrl(eeCollection.min().getMapId(visParams))
        elif (reducer == 'max'):
            values = imageToMapId(eeCollection.max(), visParams)
        elif (reducer == 'mosaic'):
            values = imageToMapId(eeCollection.mosaic(), visParams)
        else:
            values = imageToMapId(eeCollection.mean(), visParams)
        
    except EEException as e:
        print(str(e))
        print(str(sys.exc_info()[0]))
        raise Exception(sys.exc_info()[0])
    tile_url_template = values[:-12]+"{z}/{x}/{y}"
    return values
    # return tile_url_template.format(**values)