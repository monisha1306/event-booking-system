from django.db import models
from django.conf import settings 
# Create your models here.

class Organizer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    organization_name = models.CharField(max_length=255)
    contact_email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.organization_name
    
class Event(models.Model):
    organizer_name = models.CharField(max_length=255, null=True, blank=True)
    organizer_contact = models.CharField(max_length=20, null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True)
    date = models.DateField(null=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    location = models.CharField(max_length=255,null=True)
    category = models.CharField(max_length=100)
    banner_image = models.ImageField(upload_to="event_banners/", null=True, blank=True)

    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return self.title


class TicketTier(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="ticket_tiers")
    name = models.CharField(max_length=100)  # e.g. VIP, General, Early Bird
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} - {self.event.title}"
