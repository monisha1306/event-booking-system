from django.db import models
from django.conf import settings
from events.models import Event

class Booking(models.Model):
    STATUS_CHOICES = [
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=10)
    booking_time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Confirmed')

    def __str__(self):
        return f"{self.user.username} - {self.event.title} - Seat {self.seat_number}"
