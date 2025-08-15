from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProfileSerializer
from rest_framework.views import APIView


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class LandingPageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "message": "Welcome to the Event Booking System API!",
            "endpoints": {
                "register": "/api/accounts/register/",
                "login": "/api/accounts/login/",
                "refresh": "/api/accounts/refresh/",
                "profile": "/api/accounts/profile/"
            }
        })