from django.shortcuts import render
from rest_framework import viewsets
from .models import Event, TicketTier
from .serializers import EventSerializer, TicketTierSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class TicketTierViewSet(viewsets.ModelViewSet):
    queryset = TicketTier.objects.all()
    serializer_class = TicketTierSerializer
