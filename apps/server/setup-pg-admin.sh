#!/bin/sh
docker run -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=nimbler@nimble.com' -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecretNimbleWord' --name google-search-nimble-pg-admin -d dpage/pgadmin4