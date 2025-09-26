from django.db import models
from django.conf import settings
from server.events.models import Event
from django.contrib.auth.models import User
class Booking(models.Model):
    # Use your custom user model
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    # Link to the Event
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    
    # Ticket info
    ticket_type = models.CharField(max_length=50, default="Regular")  # default for existing rows
    quantity = models.PositiveIntegerField(default=1)
    
    
    # Booking status
    status = models.CharField(max_length=20, default="Pending")  # Pending, Paid, Cancelled
    
    # Booking timestamp
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.event.title}"
