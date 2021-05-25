import json
from django.http import JsonResponse
from .geefunctions import getMap 

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