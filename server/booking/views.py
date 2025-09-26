from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from server.booking.models import Booking
from server.booking.serializers import BookingSerializer
from server.events.models import TicketTier

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        user = request.user
        event_id = request.data.get("event")
        tickets = request.data.get("tickets")  # [{tier_id, quantity}, ...]

        if not tickets:
            return Response({"error": "No tickets provided."}, status=400)

        bookings_created = []

        for t in tickets:
            tier = TicketTier.objects.get(id=t["tier_id"])
            requested_quantity = int(t["quantity"])
            available = tier.quantity - tier.booked_quantity

            if requested_quantity > available:
                return Response(
                    {"error": f"Not enough seats in {tier.name}. Available: {available}."},
                    status=400
                )

            tier.booked_quantity += requested_quantity
            tier.save()

            booking = Booking.objects.create(
                user=user,
                event=tier.event,
                ticket_tier=tier,
                quantity=requested_quantity,
                status="Paid"
            )
            bookings_created.append(booking)

        serializer = self.get_serializer(bookings_created, many=True)
        return Response(serializer.data, status=201)