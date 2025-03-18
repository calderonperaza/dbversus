#!/bin/bash

COUCHDB_URL="http://admin:password@localhost:5984"
DB_NAMES=("detalle_ordenes" "ordenes" "productos" "categorias")

#tablas de couchdb
curl -s -X PUT "$COUCHDB_URL/_users"
curl -s -X PUT "$COUCHDB_URL/_replicator"
#curl -s -X PUT "$COUCHDB_URL/_global_changes"

#usur y pass
curl -s -X PUT "$COUCHDB_URL/_node/_local/_config/admins/admin" -d '"password"'

echo "Preparando creación de base y documentos..."

# Recorre el array de nombres de base de datos y crea cada una
for DB in "${DB_NAMES[@]}"; do
    echo "Creando base de datos $DB..."
    curl -s -X PUT "$COUCHDB_URL/$DB"
done

echo "BDs creadas."

