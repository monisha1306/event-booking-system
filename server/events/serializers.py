from rest_framework import serializers
from .models import Event, TicketTier
import json

class TicketTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketTier
        fields = ['id', 'name', 'price', 'quantity', 'event']
        extra_kwargs = {
            'event': {'required': False, 'allow_null': True}
        }

class EventSerializer(serializers.ModelSerializer):
    ticket_tiers = TicketTierSerializer(many=True, required=False)

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'date', 'start_time', 'end_time',
            'location', 'category', 'banner_image',
            'organizer_name', 'organizer_contact',
            'is_approved', 'created_at', 'ticket_tiers'
        ]
        read_only_fields = ['is_approved', 'created_at']
        
        def get_banner_image(self, obj):
         if obj.banner_image:
            # Convert binary data to string using base64
            return base64.b64encode(obj.banner_image).decode('utf-8')
         return None

  
    
    def create(self, validated_data):
        # Get ticket tiers JSON string from the request
        tiers_data_str = self.context['request'].data.get('ticket_tiers')

        # Convert JSON string to list of dicts
        tiers_data = json.loads(tiers_data_str) if tiers_data_str else []

        # Create event
        event = Event.objects.create(**validated_data)

        # Create related ticket tiers
        for tier_data in tiers_data:
            TicketTier.objects.create(event=event, **tier_data)

        return event
