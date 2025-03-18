#!/bin/bash
set -e

# Función para verificar si CouchDB está disponible
check_couchdb() {
  COUCHDB_URL="http://admin:password@localhost:5984"
  echo "Esperando a que CouchDB esté disponible..."
  until curl -s "$COUCHDB_URL/_up" | grep -q '"status":"ok"'; do
    sleep 1
  done
  echo "CouchDB está disponible."
}

# Inicia CouchDB en primer plano en un subproceso y guarda el PID
echo "Iniciando CouchDB en primer plano..."
/docker-entrypoint.sh /opt/couchdb/bin/couchdb &
COUCHDB_PID=$!

# Verifica que CouchDB esté disponible mientras se ejecuta en primer plano
check_couchdb

# Ejecuta el script de inicialización si existe
if [ -f /init-couchdb.sh ]; then
  echo "Ejecutando script de inicialización..."
  chmod +x /init-couchdb.sh
  /init-couchdb.sh
else
  echo "No se encontró init-couchdb.sh"
fi

# Trae el proceso de CouchDB al primer plano para mantener el contenedor vivo
wait $COUCHDB_PID

