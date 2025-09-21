from django.urls import path,include
from .views import RegisterView
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

from .views import LandingPageView 
from .views import password_reset,reset_password_confirm


urlpatterns = [
    path('', LandingPageView.as_view(), name='landing'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("password-reset/", password_reset, name="password-reset"),
    path("reset-password/<uidb64>/<token>/", reset_password_confirm, name="reset-password-confirm"),
   
    #path("accounts/", include("django.contrib.auth.urls")),
]