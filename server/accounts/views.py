from django.shortcuts import render
from rest_framework import generics
from server.accounts.serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from server.accounts.models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
import json




class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]



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
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

User=get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def password_reset(request):
    email = request.data.get("email")
    if not email:
        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        User=get_user_model()
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "No user with this email."}, status=status.HTTP_404_NOT_FOUND)

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

    try:
        send_mail(
            subject="Password Reset Request",
            message=f"You forgot your password? Click the link to reset your password:\n\n{reset_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
    except Exception as e:
        return Response({"error": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "Password reset email sent!", "reset_link": reset_link}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def reset_password_confirm(request, uidb64, token):
    try:
        body = json.loads(request.body)
    except:
        body = {}

    password = body.get("password")
    if not password:
        return Response({"error": "Password is required"}, status=400)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception:
        return Response({"error": "Invalid link"}, status=400)

    if not default_token_generator.check_token(user, token):
        return Response({"error": "Invalid or expired token"}, status=400)

    user.set_password(password)
    user.save()
    return Response({"message": "Password reset successful"}, status=200)