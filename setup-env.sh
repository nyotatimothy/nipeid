#!/bin/bash

# Common environment variables
ENV_VARS='NEXTAUTH_SECRET=+R6VsX5FfdRq4BY9/fkpLZoCQedyYgiAbXUwXjO082A=
NEXTAUTH_URL=+R6VsX5FfdRq4BY9/fkpLZoCQedyYgiAbXUwXjO082A=
GOOGLE_CLIENT_ID=268296256132-t62vi714i6v17e2jubiq2mdghe7c3rug.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=yhtf noyo huzy vrco
DATABASE_URL=postgresql://postgres:mnDhmqpPVBmVmWbkZEUbwQvoRGCgTHLS@gondola.proxy.rlwy.net:36004/railway'

# Create each environment file
echo "$ENV_VARS" > .env
echo "$ENV_VARS" > .env.local
echo "$ENV_VARS" > .env.development
echo "$ENV_VARS" > .env.production
echo "$ENV_VARS" > .env.ppe

echo "Environment files created successfully!" 