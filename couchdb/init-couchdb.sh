#!/bin/bash

COUCHDB_URL="http://admin:password@localhost:5984"
DB_NAMES=("detalle_ordenes" "ordenes" "productos" "categorias")

# Tablas internas de CouchDB
curl -s -X PUT "$COUCHDB_URL/_users"
curl -s -X PUT "$COUCHDB_URL/_replicator"
#curl -s -X PUT "$COUCHDB_URL/_global_changes"

# Configurar usuario y contraseña (esto ya está hecho en la URL, pero lo dejamos por consistencia)
curl -s -X PUT "$COUCHDB_URL/_node/_local/_config/admins/admin" -d '"password"'

echo "Preparando creación de bases y documentos..."

# Crear bases de datos
for DB in "${DB_NAMES[@]}"; do
    echo "Creando base de datos $DB..."
    curl -s -X PUT "$COUCHDB_URL/$DB"
done

echo "Bases de datos creadas."

# Crear un solo design document con ambas vistas en 'ordenes'
echo "Creando design document 'ordenes' con vistas 'by_date' y 'by_date_and_product'..."
curl -s -X PUT "$COUCHDB_URL/ordenes/_design/ordenes" -H "Content-Type: application/json" -d '{
  "views": {
    "by_date": {
      "map": "function(doc) { if (doc.fecha) { var date = doc.fecha.split('\''T'\'')[0]; emit(date, 1); } }",
      "reduce": "_count"
    },
    "by_date_and_product": {
      "map": "function(doc) { if (doc.fecha && doc.detalle_orden) { var date = doc.fecha.split('\''T'\'')[0]; doc.detalle_orden.forEach(function(detalle) { var key = [date, doc._id, detalle.producto.id, detalle.producto.nombre]; emit(key, { cantidad: detalle.cantidad, producto_id: detalle.producto.id, nombre: detalle.producto.nombre }); }); } }"
    }
  }
}'

echo "Design document creado en 'ordenes' con ambas vistas."