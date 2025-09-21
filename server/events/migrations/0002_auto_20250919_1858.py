from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('organizer', models.ForeignKey(to='events.Organizer', on_delete=models.CASCADE)),
                # add other fields here
            ],
        ),
        migrations.CreateModel(
            name='TicketTier',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(max_digits=8, decimal_places=2)),
                ('event', models.ForeignKey(to='events.Event', on_delete=models.CASCADE)),
            ],
        ),
    ]
