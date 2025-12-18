from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Meal, Food

class RegisterSerializer(serializers.ModelSerializer):
    height = serializers.FloatField(write_only=True)
    weight = serializers.FloatField(write_only=True)
    age = serializers.IntegerField(write_only=True)
    gender = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'height', 'weight', 'age', 'gender')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        height = validated_data.pop('height')
        weight = validated_data.pop('weight')
        age = validated_data.pop('age')
        gender = validated_data.pop('gender')

        user = User.objects.create_user(
            username=validated_data.get('username'),
            password=validated_data.get('password')
        )

        Profile.objects.create(
            user=user,
            height=height,
            weight=weight,
            age=age,
            gender=gender
        )
        return user

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"

class MealSerializer(serializers.ModelSerializer):
    food_name = serializers.CharField(source='food.name', read_only=True)
    calories = serializers.FloatField(read_only=True)
    proteins = serializers.FloatField(read_only=True)
    fats = serializers.FloatField(read_only=True)
    carbohydrates = serializers.FloatField(read_only=True)
    photo = serializers.CharField(source='food.photo', read_only=True)

    class Meta:
        model = Meal
        fields = ["id", "food", "food_name", "amount", "date", "calories", "proteins", "fats", "carbohydrates", "photo"]
        read_only_fields = ['user', 'calories']  # убираем 'date' из read_only_fields

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        if 'date' not in validated_data:
            from django.utils.timezone import localdate
            validated_data['date'] = localdate()
        return super().create(validated_data)

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Profile
        fields = ['username', 'height', 'weight', 'age', 'gender', 'calorie_norm']
