# Generated by Django 3.0.5 on 2020-12-15 11:22

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_api_links_noconstraint'),
    ]

    operations = [
        migrations.CreateModel(
            name='APIDesignRuleTestSuite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(null=True)),
                ('api_endpoint', models.URLField(null=True)),
                ('api', models.OneToOneField(db_constraint=False, on_delete=django.db.models.deletion.DO_NOTHING, related_name='test_suite', to='core.API', to_field='api_id')),
            ],
        ),
        migrations.CreateModel(
            name='DesignRuleSession',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('started_at', models.DateTimeField()),
                ('percentage_score', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('test_version', models.CharField(default='', max_length=200)),
                ('test_suite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sessions', to='core.APIDesignRuleTestSuite')),
            ],
            options={
                'ordering': ('-started_at',),
            },
        ),
        migrations.CreateModel(
            name='DesignRuleResult',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rule_type_url', models.URLField()),
                ('rule_type_name', models.CharField(default='', max_length=250)),
                ('rule_type_description', models.TextField(default='')),
                ('success', models.BooleanField(blank=True, default=False)),
                ('errors', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=500), null=True, size=None)),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='results', to='core.DesignRuleSession')),
            ],
        ),
    ]
