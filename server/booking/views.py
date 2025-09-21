from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer
from events.models import Event
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.authentication import JWTAuthentication

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        event_id = self.request.data.get('event')
        seat_number = self.request.data.get('seat_number')

        event = get_object_or_404(Event, id=event_id)

        if Booking.objects.filter(event=event, seat_number=seat_number).exists():
            raise ValidationError("Seat already booked.")

        serializer.save(user=self.request.user, event=event, seat_number=seat_number)
