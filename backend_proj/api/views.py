from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, generics, permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, MealSerializer
from .models import Meal, Food, Profile, Product
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from difflib import SequenceMatcher
from rest_framework.views import APIView
from .serializers import ProfileSerializer

# Приветственный тест
@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from Django!"})

# Регистрация через класс
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

# Регистрация через функцию
@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Логин
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "success": True,
            "username": user.username,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })
    else:
        return Response({"success": False, "detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# Логаут
@api_view(['POST'])
def logout_view(request):
    refresh_token = request.data.get("refresh")
    if refresh_token:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  # Требует включения BLACKLIST в settings
            return Response({"success": True})
        except Exception as e:
            return Response({"success": False, "detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"success": False, "detail": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)

# Meals
class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Meal.objects.filter(user=user)
        date_param = self.request.query_params.get('date')
        if date_param:
            qs = qs.filter(date=date_param)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Получить дневную норму калорий
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_daily_calories(request):
    profile = Profile.objects.get(user=request.user)
    if profile.gender.lower() == 'male':
        bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5
    else:
        bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161
    return Response({'daily_calories': int(bmr)})

# Информация о пользователе
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user

    try:
        profile = Profile.objects.get(user=user)

        if profile.gender.lower() == 'male':
            tot = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5
        else:
            tot = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161

        bmr = ((tot / 100) * 20) + tot  # BMR + 20%
        calorie_norm = int(bmr)

        return Response({
            "username": user.username,
            "height": profile.height,
            "weight": profile.weight,
            "age": profile.age,
            "gender": profile.gender,
            "calorie_norm": calorie_norm,
        })

    except Profile.DoesNotExist:
        return Response({
            "username": user.username,
            "height": None,
            "weight": None,
            "age": None,
            "gender": None,
            "calorie_norm": 0,
        })

    
# Поиск еды
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def food_search(request):
    """
    Поиск продуктов с нормализацией запроса и возвращением полного URL для фото
    """
    query = request.GET.get('q', '') or ''
    query = " ".join(query.lower().split())  # удаляем лишние пробелы и делаем lower

    if not query:
        return Response([])

    words = query.split()

    # 1) AND-фильтр по всем словам
    qs = Food.objects.all()
    for w in words:
        qs = qs.filter(name__icontains=w)

    results = list(qs[:10])

    if results:
        def relevance_score_exact(food_obj):
            name = (food_obj.name or "").lower()
            word_matches = sum(1 for w in words if w in name)
            starts_bonus = 1 if name.startswith(words[0]) else 0
            return (word_matches * 10) + starts_bonus

        results_sorted = sorted(results, key=relevance_score_exact, reverse=True)[:10]

        # Генерируем payload с абсолютными URL
        payload = []
        for f in results_sorted:
            photo_url = request.build_absolute_uri(f.photo.url) if f.photo else None
            payload.append({
                'id': f.id,
                'name': f.name,
                'calories': f.calories,
                'proteins': f.proteins,
                'fats': f.fats,
                'carbohydrates': f.carbohydrates,
                'photo': photo_url
            })
        return Response(payload)

    # Fallback: fuzzy search
    all_foods = list(Food.objects.all())

    def fuzzy_score(name: str, query: str):
        return SequenceMatcher(None, name.lower(), query.lower()).ratio()

    scored = []
    for f in all_foods:
        name = (f.name or "").lower()
        base = fuzzy_score(name, query)
        word_bonus = sum(0.1 for w in words if w in name)
        score = base + word_bonus
        if score >= 0.35:
            scored.append((f, score))

    scored_sorted = sorted(scored, key=lambda x: x[1], reverse=True)[:10]

    payload = []
    for f, score in scored_sorted:
        photo_url = request.build_absolute_uri(f.photo.url) if f.photo else None
        payload.append({
            'id': f.id,
            'name': f.name,
            'calories': f.calories,
            'proteins': f.proteins,
            'fats': f.fats,
            'carbohydrates': f.carbohydrates,
            'photo': photo_url,
            'score': round(score, 3)
        })

    return Response(payload)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    