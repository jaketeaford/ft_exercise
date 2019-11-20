from django.db import models

# Create your models here.
class House(models.Model):
	mls_num = models.IntegerField(unique=True)
	street1 = models.CharField(max_length=100)
	street2 = models.CharField(max_length=50)
	city = models.CharField(max_length=100)
	state = models.CharField(max_length=25)
	zip_code = models.IntegerField()
	neighborhood = models.CharField(max_length=100)
	sales_price = models.IntegerField()
	list_date = models.DateField()
	bed_count = models.IntegerField()
	bath_count = models.IntegerField()
	garage_size = models.CharField(default="No Garage", max_length=20)
	sq_ft = models.IntegerField()
	lot_size = models.IntegerField()
	description = models.TextField()
