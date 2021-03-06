#!/usr/bin/env sh
set -e

# Collect static
python /app/manage.py collectstatic --noinput

# Run migrations
python /app/manage.py migrate

# Sync API JSONs to the database
python /app/manage.py sync_apis --api-dir /app/data/apis

# Configure linkchecker
if [ "$LINKCHECKER_ENABLED_DEFAULT" != "" ]
then
  python /app/manage.py set_option linkchecker "$LINKCHECKER_ENABLED_DEFAULT" --ifnotset
fi

# Start uWSGI processes
uwsgi --http-socket :8000 --master --module api.wsgi --processes 4 --threads 2 --static-map /admin/static=/app/static
