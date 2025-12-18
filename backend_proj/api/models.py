from django.contrib.auth.models import User
from django.db import models

class Greeting(models.Model):
    message = models.CharField(max_length=255)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    height = models.FloatField()
    weight = models.FloatField()
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    calorie_norm = models.IntegerField(default=2000)

    def __str__(self):
        return self.user.username

class Food(models.Model):
    name = models.CharField(max_length=100)          # Название еды
    calories = models.IntegerField()                  # Калорийность (ккал)
    proteins = models.FloatField()                    # Белки (граммы)
    fats = models.FloatField()                        # Жиры (граммы)
    carbohydrates = models.FloatField()               # Углеводы (граммы)
    photo = models.ImageField(upload_to='food_photos/', null=True, blank=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    calories_per_100g = models.FloatField()  # калории на 100 грамм

    def __str__(self):
        return self.name

class Meal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.FloatField()
    calories = models.FloatField(default=0)
    date = models.DateField()

    def __str__(self):
        return f"{self.food.name} - {self.amount}g"

    @property
    def calories(self):
        return round(self.food.calories * self.amount / 100, 2)

    @property
    def proteins(self):
        return round(self.food.proteins * self.amount / 100, 2)

    @property
    def fats(self):
        return round(self.food.fats * self.amount / 100, 2)

    @property
    def carbohydrates(self):
        return round(self.food.carbohydrates * self.amount / 100, 2)
