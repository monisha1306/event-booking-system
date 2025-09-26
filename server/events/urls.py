from django.urls import path, include
from rest_framework.routers import DefaultRouter
from server.events.views import EventViewSet, TicketTierViewSet, EventList, EventDetail

router = DefaultRouter()
router.register(r"events", EventViewSet, basename="event")
router.register(r"ticket-tiers", TicketTierViewSet, basename="tickettier")

urlpatterns = [
    path("", include(router.urls)),
    path("events-list/", EventList.as_view(), name="event-list"),
    path("events-detail/<int:pk>/", EventDetail.as_view(), name="event-detail"),
]