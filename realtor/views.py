from django.shortcuts import render
from realtor.models import House
from django.http import JsonResponse
# Create your views here.

def index(request):
	return render(request, 'index.html')

def search(request):
	data = {

	}
	return JsonResponse