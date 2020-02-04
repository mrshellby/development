# Generated by Django 3.0.3 on 2020-03-18 09:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Badge',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='API',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('api_id', models.CharField(max_length=255, unique=True)),
                ('api_authentication', models.CharField(choices=[('unknown', 'Onbekend'), ('none', 'Geen'), ('mutual_tls', 'Mutual TLS'), ('api_key', 'API Key'), ('ip_whitelist', 'IP Whitelist')], default='unknown', max_length=31)),
                ('api_type', models.CharField(choices=[('unknown', 'Onbekend'), ('rest_json', 'Rest/JSON'), ('rest_xml', 'Rest/XML'), ('soap_xml', 'SOAP/XML'), ('grpc', 'gRPC'), ('graphql', 'GraphQL'), ('sparql', 'SPARQL'), ('wfs', 'WFS'), ('wms', 'WMS')], default='unknown', max_length=31)),
                ('contact_chat', models.CharField(blank=True, max_length=255)),
                ('contact_email', models.CharField(blank=True, max_length=255)),
                ('contact_fax', models.CharField(blank=True, max_length=255)),
                ('contact_phone', models.CharField(blank=True, max_length=255)),
                ('contact_url', models.URLField(blank=True, max_length=2000)),
                ('description', models.TextField(default='<placeholder>')),
                ('forum_url', models.URLField(blank=True, max_length=2000)),
                ('forum_vendor', models.CharField(blank=True, max_length=31)),
                ('is_reference_implementation', models.BooleanField(default=False)),
                ('organization_name', models.CharField(default='<placeholder>', max_length=255)),
                ('scores_has_contact_details', models.BooleanField(default=None, null=True)),
                ('scores_has_documentation', models.BooleanField(default=None, null=True)),
                ('scores_has_specification', models.BooleanField(default=None, null=True)),
                ('scores_provides_sla', models.BooleanField(default=None, null=True)),
                ('service_name', models.CharField(default='<placeholder>', max_length=255)),
                ('terms_government_only', models.BooleanField(null=True)),
                ('terms_pay_per_use', models.BooleanField(null=True)),
                ('terms_support_response_time', models.CharField(blank=True, max_length=255)),
                ('terms_uptime_guarantee', models.DecimalField(decimal_places=6, max_digits=8, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Relation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_api', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='relations_from', to='core.API', to_field='api_id')),
                ('name', models.CharField(blank=True, max_length=255)),
                ('to_api', models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.DO_NOTHING, related_name='relations_to', to='core.API', to_field='api_id')),
            ],
        ),
        migrations.CreateModel(
            name='APIBadge',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('api', models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.DO_NOTHING, to='core.API', to_field='api_id')),
                ('badge', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Badge')),
            ],
        ),
        migrations.AddField(
            model_name='api',
            name='badges',
            field=models.ManyToManyField(related_name='apis', through='core.APIBadge', to='core.Badge'),
        ),
        migrations.AddField(
            model_name='api',
            name='referenced_apis',
            field=models.ManyToManyField(related_name='referenced_by_apis', through='core.Relation', to='core.API'),
        ),
        migrations.CreateModel(
            name='Environment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('production', 'Productie'), ('acceptation', 'Acceptatie'), ('demo', 'Demo')], max_length=31)),
                ('api_url', models.URLField(max_length=2000)),
                ('specification_url', models.URLField(blank=True, max_length=2000)),
                ('documentation_url', models.URLField(max_length=2000)),
                ('api', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='environments', to='core.API', to_field='api_id')),
            ],
        ),
        migrations.AlterField(
            model_name='api',
            name='description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='api',
            name='organization_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='api',
            name='service_name',
            field=models.CharField(max_length=255),
        ),
        migrations.RemoveField(
            model_name='api',
            name='scores_has_contact_details',
        ),
        migrations.RemoveField(
            model_name='api',
            name='scores_has_documentation',
        ),
        migrations.RemoveField(
            model_name='api',
            name='scores_has_specification',
        ),
        migrations.RemoveField(
            model_name='api',
            name='scores_provides_sla',
        ),
    ]
