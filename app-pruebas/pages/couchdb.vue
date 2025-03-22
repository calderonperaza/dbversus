<template>
    <div>
        <div class="row flex flex-center q-mt-md">
            <div class="text-h4">Pruebas para CouchDB</div>
        </div>
        <div class="row">
            <div class="text-caption col-12 q-ml-md">
                Recuerda que debes tener arrancado el contenedor de CouchDB levantado con docker y no debe tener datos, solo debe tener la estructura de las databases.
                Haz clic en iniciar y comenzamos las pruebas, primero insertando, luego actualizando, consultando y eliminando.
                Si vuelves ha hacer pruebas se recomienda que ejecutes docker compose down y luego <strong>docker compose up -d</strong> 
                <p>Recuerda que en el archivo <strong>/couchdb/docker-compose.yml</strong> defines la memoria y el CPU asignado al contenedor para las pruebas</p>
            </div>
            <div class="col-12 row q-ml-md">
                <div class="col-2">
                    <div class="text-bold">Pruebas en Categorias</div>
                    <!-- Insercion: <strong>{{ pruebas.categorias.insertar }}</strong><br>
                    Actualizacion: <strong>{{ pruebas.categorias.actualizar }}</strong><br>
                    Consulta: <strong>{{ pruebas.categorias.aleatorio }}</strong><br> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {categoriasInsertarCouchDB, categoriasConsultarCouchDB} from '../server/utils/couchdb/categorias'

</script>