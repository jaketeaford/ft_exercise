from django.shortcuts import render
from realtor.models import House, HousePhoto
from django.http import JsonResponse
import json
import pprint

def index(request):
	return render(request, 'index.html')

def search(request):
	# get all houses so we can start applying filters
	houses = House.objects.all().values()

	if request.GET['mls'] != "":
		houses = houses.filter(mls_num=request.GET['mls'])
	else: 
		# searching by MLS number returns one result, 
		# so no more filtering is required
		if request.GET['city'] != "":
			houses = houses.filter(city=request.GET['city'])
		if request.GET['state'] != "":
			houses = houses.filter(state=request.GET['state'])
		if request.GET['zip'] != "":
			houses = houses.filter(zip_code=request.GET['zip'])
		if request.GET['beds'] != "":
			houses = houses.filter(bed_count=request.GET['beds'])
		if request.GET['baths'] != "":
			houses = houses.filter(bath_count=request.GET['baths'])
		if request.GET['sqft'] != "":
			houses = houses.filter(sq_ft=request.GET['sqft'])

	# now find photos for each house (if there are any) and add them
	# to the queryset
	for house in houses:
		photos = HousePhoto.objects.filter(house=house['id']).values()
		house['photos'] = list(photos)

	return JsonResponse(list(houses), safe=False)