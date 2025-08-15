from rest_framework import serializers
from .models import Event, TicketTier, Organizer

class TicketTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketTier
        fields = '__all__'
        extra_kwargs = {
            'event': {'required': False, 'allow_null': True}  # ✅ make event optional
        }


class EventSerializer(serializers.ModelSerializer):
    ticket_tiers = TicketTierSerializer(many=True, required=False)
   

    class Meta:
        model = Event
        fields = '__all__'
        extra_kwargs = {
            'organizer': {'required': False, 'allow_null': True}  
        }

    def create(self, validated_data):
        tiers_data = validated_data.pop('ticket_tiers', [])
        event = Event.objects.create(**validated_data)
        for tier_data in tiers_data:
            TicketTier.objects.create(event=event, **tier_data)
        return event
    

