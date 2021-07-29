from .select_controls import conservancies, wards, counties, ftypes
from .model import addNewForecast as af

def popDB(year, montha, monthb, monthc, day):
	prefix ='rdst/forecasts/'
	suffix ='.pdf'

	for x in counties:
		frname = prefix + ftypes['FF'] +  x + ' dated ' + year + '-' + monthc + '-' + day + suffix
		maname = prefix + x + '_'+ year + monthb +'.'+ year +montha+'_'+ftypes['MA'] + suffix
		czname = prefix + x +'_'+ year + monthb+'_'+ftypes['ZS'] + suffix
		af(filename=frname,date=year+'-'+monthc+'-'+day, ftype=ftypes['FF'], region=x)
		af(filename=maname,date=year+monthb, ftype=ftypes['MA'], region=x)
		af(filename=czname,date=year+monthb, ftype=ftypes['FF'], region=x)


	for y in wards:
		wrdzname = prefix  +  y + '_'+ year + monthb+ '_' + ftypes['ZS'] + suffix
		af(filename=wrdzname,date=year+monthb, ftype=ftypes['ZS'], region=y)

	for z in conservancies:
		cozname = prefix + z +'_'+ year + monthb+'_'+ftypes['ZS'] + suffix
		af(filename=cozname,date=year+monthb, ftype=ftypes['FF'], region=z)