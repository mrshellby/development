# Generated by Django 3.1.7 on 2021-03-08 09:52

from django.db import migrations


name_map = {
    'Logius': 'Logius',
    'Gemeente Amsterdam': 'Gemeente Amsterdam',
    'VNG Realisatie': 'VNG Realisatie',
    'VNG / commondatafactory': 'VNG Realisatie',
    'Centraal Bureau voor de Statistiek (CBS)': 'Centraal Bureau voor de Statistiek',
    'Ministerie van Infrastructuur en Waterstaat': 'Ministerie van IenW-Rijkswaterstaat',
    'Kadaster': 'Dienst voor het kadaster en de openbare registers',
    'KOOP': 'Uitvoeringsorganisatie Bedrijfsvoering Rijk (UBR)',
    'Werkmaatschappij': 'Uitvoeringsorganisatie Bedrijfsvoering Rijk (UBR)',
    'Luchtmeetnet': 'Rijksinstituut voor Volksgezondheid en Milieu',
    'RIVM': 'Rijksinstituut voor Volksgezondheid en Milieu',
    'Ondernemersplein (KVK)': 'Kamer van Koophandel Nederland',
    'Kamers van Koophandel': 'Kamer van Koophandel Nederland',
    'Kamer van Koophandel': 'Kamer van Koophandel Nederland',
    'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties (BZK)':
        'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties',
    'RDW': 'RDW',
    'DSO': 'Digitaal Stelsel Omgevingswet (DSO-LV)',
    'Provincie Zuid-Holland': 'Provincie Zuid-Holland',
    'Gemeenschappelijke Regeling Drechtsteden': 'Gemeenschappelijke Regeling Drechtsteden',
    'RVO Rijksdienst voor Ondernemend Nederland': 'Rijksdienst voor Ondernemend Nederland',
    'Ministerie van Algemene Zaken': 'Ministerie van Algemene Zaken',
    'Gemeente Enschede': 'Gemeente Enschede',
    'Eindhoven': 'Gemeente Eindhoven',
}

oin_map = {
    'Logius': '00000001822477348000',
    'Gemeente Amsterdam': '00000001002564440000',
    'VNG Realisatie': '00000001821002193000',
    'Centraal Bureau voor de Statistiek': '00000001812483297000',
    'Ministerie van IenW-Rijkswaterstaat': '00000001821699180000',
    'Dienst voor het kadaster en de openbare registers': '00000001802327497000',
    'Uitvoeringsorganisatie Bedrijfsvoering Rijk (UBR)': '00000004000000059000',
    'Rijksinstituut voor Volksgezondheid en Milieu': '00000004000000062000',
    'Kamer van Koophandel Nederland': '00000001006033404000',
    'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties': '00000001003214345000',
    'RDW': '00000001804770694000',
    'Digitaal Stelsel Omgevingswet (DSO-LV)': '00000004130854102000',
    'Provincie Zuid-Holland': '00000001002306608000',
    'Gemeenschappelijke Regeling Drechtsteden': '00000001817301409000',
    'Rijksdienst voor Ondernemend Nederland': '00000004000000006000',
    'Ministerie van Algemene Zaken': '00000001003227376000',
    'Gemeente Enschede': '00000001001589623000',
    'Gemeente Eindhoven': '00000001001902763000',
}


def create_organizations(apps, schema_editor):
    Organization = apps.get_model('core', 'organization')  # noqa
    API = apps.get_model('core', 'api')  # noqa
    for api in API.objects.all():
        if api.organization_name == 'Rijksmuseum':
            api.delete()
            continue
        org_name = name_map[api.organization_name]
        oin = oin_map[org_name]
        org = Organization.objects.get_or_create(name=org_name, oin=oin)[0]
        api.organization = org
        api.save()


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_alter_code_api'),
    ]

    operations = [
        migrations.RunPython(create_organizations),
    ]
