from django.contrib import admin
from .models import Profile
from .models import Product
from .models import Food

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'gender', 'height', 'weight')
admin.site.register(Product)
@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ("name", "calories", "proteins", "fats", "carbohydrates")