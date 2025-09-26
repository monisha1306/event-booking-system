from rest_framework import serializers
from server.events.models import Event, TicketTier

class TicketTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketTier
        fields = ["id", "name", "price", "quantity", "booked_quantity", "event"]
        extra_kwargs = {"event": {"required": False, "allow_null": True}}

class EventSerializer(serializers.ModelSerializer):
    ticket_tiers = TicketTierSerializer(many=True, required=False,write_only=True)
    banner_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            "id", "title", "description", "date", "start_time", "end_time",
            "location", "category", "banner_image", "banner_image_url",
            "organizer_name", "organizer_contact",
            "is_approved", "created_at", "ticket_tiers",
        ]
        read_only_fields = ["is_approved", "created_at"]

    def get_banner_image_url(self, obj):
        if obj.banner_image:
            return obj.banner_image.url
        return None

    def create(self, validated_data):
        # Extract nested tickets if present
        ticket_data = validated_data.pop("ticket_tiers", [])
        # Create the Event
        event = Event.objects.create(**validated_data)
        # Create associated TicketTiers
        for ticket in ticket_data:
            TicketTier.objects.create(event=event, **ticket)
        return event

    def update(self, instance, validated_data):
        # Handle nested ticket update if needed
        ticket_data = validated_data.pop("ticket_tiers", [])
        instance = super().update(instance, validated_data)

        # Update or create TicketTiers
        for ticket in ticket_data:
            ticket_obj, created = TicketTier.objects.update_or_create(
                event=instance,
                name=ticket.get("name"),
                defaults={
                    "price": ticket.get("price"),
                    "quantity": ticket.get("quantity"),
                }
            )
        return instance