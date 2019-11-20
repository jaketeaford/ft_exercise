from django.contrib import admin
from realtor.models import House, HousePhoto

# Register your models here.
class HousePhotoAdmin(admin.StackedInline):
	model = HousePhoto
	fields = ('image_tag', 'photo')
	readonly_fields = ['image_tag']

@admin.register(House)
class HouseAdmin(admin.ModelAdmin):
	inlines = [HousePhotoAdmin]

#@admin.register(HousePhoto)
class HousePhotoAdmin(admin.ModelAdmin):
	pass