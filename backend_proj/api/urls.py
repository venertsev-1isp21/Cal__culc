from django.urls import path
from .views import hello_world
from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import register_view
from .views import MealViewSet, get_daily_calories
from .views import user_info
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from . import views

router = DefaultRouter()
router.register('meals', MealViewSet)

urlpatterns = [
    path('register/', register_view, name='register'),
    path('calories/', get_daily_calories),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('user_info/', views.user_info, name='user_info'),
    path('foods/', views.food_search, name='food_search'),

] + router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)