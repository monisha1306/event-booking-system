from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from events.views import EventViewSet, TicketTierViewSet
from accounts.views import LandingPageView
from django.conf import settings
from booking.views import BookingViewSet
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'tickets', TicketTierViewSet) 

urlpatterns = [
    
    path('', LandingPageView.as_view(), name='landing_page'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  
    path('api/events/', include('events.urls')),  
    path('api/accounts/', include('accounts.urls')),
    path('api/booking/', include('booking.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)