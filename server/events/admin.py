from django.contrib import admin
from server.events.models import Organizer, Event, TicketTier


class TicketTierInline(admin.TabularInline):
    model = TicketTier
    extra = 1


class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "organizer_name",
        "organizer_contact",
        "date",
        "start_time",
        "end_time",
        "category",
        "is_approved",
    )
    inlines = [TicketTierInline]

    # If organizer_name/contact are not model fields, uncomment these:
    # def organizer_name(self, obj):
    #     return obj.organizer.organization_name if obj.organizer else "-"
    #
    # def organizer_contact(self, obj):
    #     return obj.organizer.contact_email if obj.organizer else "-"


admin.site.register(Organizer)
admin.site.register(Event, EventAdmin)
admin.site.register(TicketTier)