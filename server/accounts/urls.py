from django.urls import path
from .views import RegisterView
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
# from .views import ProfileView
from .views import LandingPageView 


urlpatterns = [
    path('', LandingPageView.as_view(), name='landing'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('profile/', ProfileView.as_view(), name='user-profile'),
 ]


