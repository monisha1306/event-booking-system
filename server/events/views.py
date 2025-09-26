import json
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from server.events.models import Event, TicketTier
from server.events.serializers import EventSerializer, TicketTierSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    # Override create to parse ticket_tiers
    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        if "ticket_tiers" in data and isinstance(data["ticket_tiers"], str):
            try:
                data["ticket_tiers"] = json.loads(data["ticket_tiers"])
            except Exception:
                return Response(
                    {"error": "Invalid ticket_tiers JSON format"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["get"])
    def my_events(self, request):
        organizer_name = request.query_params.get("organizer_name")
        if not organizer_name:
            return Response({"error": "Organizer name is required."}, status=400)
        events = Event.objects.filter(organizer_name=organizer_name)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)


class TicketTierViewSet(viewsets.ModelViewSet):
    queryset = TicketTier.objects.all()
    serializer_class = TicketTierSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        event_id = self.request.query_params.get("event")
        if event_id:
            return TicketTier.objects.filter(event_id=event_id)
        return TicketTier.objects.all()


class EventList(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class EventDetail(APIView):
    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)