# Generated by Django 3.0.5 on 2020-10-07 16:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_urlapilink'),
    ]

    operations = [
        migrations.CreateModel(
            name='Code',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source', models.CharField(choices=[('GitLab repository', 'Gitlab'), ('GitHub repository', 'Github'), ('GitLab snippet', 'Gitlab Snippet'), ('GitHub gist', 'Github Gist'), ('unknown', 'Unknown')], default='unknown', max_length=31)),
                ('owner_name', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('url', models.URLField(max_length=2000, unique=True)),
                ('description', models.TextField()),
                ('last_change', models.DateTimeField(db_index=True)),
                ('stars', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProgrammingLanguage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='CodeAPI',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('api', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.API', to_field='api_id')),
                ('code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Code')),
            ],
        ),
        migrations.AddField(
            model_name='code',
            name='programming_languages',
            field=models.ManyToManyField(related_name='code', to='core.ProgrammingLanguage'),
        ),
        migrations.AddField(
            model_name='code',
            name='related_apis',
            field=models.ManyToManyField(related_name='related_code', through='core.CodeAPI', to='core.API'),
        ),
    ]
