import json
from django.http import JsonResponse
from .geefunctions import getMap, clippedMap 
from .model import getForecast as gf

def get_map(request):
	return_obj = {}

	if request.method == "POST":
		try:
			info = request.POST
			option2 = info.get('option2')
			time_start = info.get('time_start', None)
			time_end = info.get('time_end', None)
			visParams = json.loads(info.get('visparams', None))
			reducer = info.get('reducer', None)
			collectionName = info.get('collection')
			map_object = getMap(collectionName, visParams, reducer, time_start, time_end)
			print(map_object)
			return_obj["url"] = map_object
			return_obj["success"] = "success"

		except Exception as e:
			return_obj["error"] = "Error processing Request. Error: "+ str(e)
	print(return_obj)
	return JsonResponse(return_obj)

def get_cmap(request):
	return_obj = {}

	if request.method == "POST":
		try:
			info = request.POST
			option2 = info.get('option2')
			time_start = info.get('time_start', None)
			time_end = info.get('time_end', None)
			visParams = json.loads(info.get('visparams', None))
			reducer = info.get('reducer', None)
			collectionName = info.get('collection')
			county = info.get('county')
			map_object = clippedMap(collectionName, visParams, reducer, time_start, time_end, county)
			return_obj["url"] = map_object
			return_obj["success"] = "success"

		except Exception as e:
			return_obj["error"] = "Error processing Request. Error: "+ str(e)
	print(return_obj)
	return JsonResponse(return_obj)

def get_forecast(request):
	return_obj = {}

	if request.method == "POST":
		try:
			info = request.POST
			date = info.get('date', None)
			ftype = info.get('ftype', None)
			desc = info.get('description', None)
			regi = info.get('region', None)

			pdf = gf(date, ftype, desc, regi)

			return_obj["url"] = pdf
			return_obj["success"] = "success"

		except Exception as e:
			return_obj["error"] = "Error processing Request. Error: "+ str(e)

	return JsonResponse(return_obj)