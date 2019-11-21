from django.db import models
from django.utils.safestring import mark_safe

GARAGES = (
	('No Garage', 'No Garage'),
	('1-Car Garage', '1-Car Garage'),
	('2-Car Garage', '2-Car Garage'),
	('3-Car+ Garage', '3-Car+ Garage'),
)

# Create your models here.
class House(models.Model):
	mls_num = models.IntegerField(unique=True, verbose_name="MLS Number")
	street1 = models.CharField(max_length=100, verbose_name="Address Line 1")
	street2 = models.CharField(max_length=50, verbose_name="Address Line 2", blank=True)
	city = models.CharField(max_length=100)
	state = models.CharField(max_length=25)
	zip_code = models.IntegerField(verbose_name="Zip Code")
	neighborhood = models.CharField(max_length=100)
	sales_price = models.IntegerField(verbose_name="Sales Price")
	list_date = models.DateField(verbose_name="Date Listed")
	bed_count = models.IntegerField(verbose_name="Bedrooms")
	bath_count = models.IntegerField(verbose_name="Bathrooms")
	garage_size = models.CharField(default="No Garage", max_length=20, choices=GARAGES)
	sq_ft = models.IntegerField(verbose_name="Square Footage")
	lot_size = models.IntegerField(verbose_name="Lot Size (Acres)")
	description = models.TextField()

	# formatting for admin page listings
	def __str__(self):
		street = self.street1

		if self.street2 != "":
			street += " " + self.street2

		return street + ", " + self.city + " " + self.state + " " + str(self.zip_code)

class HousePhoto(models.Model):
	house = models.ForeignKey(House, on_delete=models.CASCADE, null=True)
	photo = models.ImageField()

	# custom method to show image in admin interface entries rather than just the image URL
	def image_tag(self):
		return mark_safe('<img src="%s" height="200" />' % (self.photo.url))

	image_tag.short_description = 'Image'