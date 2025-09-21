from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Event, TicketTier
from .serializers import EventSerializer, TicketTierSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    @action(detail=False, methods=['get'])
    def my_events(self, request):
        organizer_name = request.query_params.get('organizer_name')
        if not organizer_name:
            return Response({"error": "Organizer name is required."}, status=400)
        events = Event.objects.filter(organizer_name=organizer_name)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

class TicketTierViewSet(viewsets.ModelViewSet):
    queryset = TicketTier.objects.all()
    serializer_class = TicketTierSerializer

class EventList(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

# Get single event by ID
class EventDetail(APIView):
    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)