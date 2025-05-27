import pruebas from '../pruebas.json';

const BASE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

async function ordenesInsertarCouchDB(total:number): Promise<number> {
    let start = new Date().getTime();
    for (let i = 0; i < total; i++) {
        let anio = new Date().getFullYear();
        let mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        let dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
        let lfecha = `${anio}-${mes}-${dia}T00:00:00.000Z`; // Formato ISO
        const detalleOrden = [
        {
            id: i + 1,
            cantidad: 5,
            precio: Math.floor(Math.random() * 10) + 1,
            producto: {
            id: i + 1,
            nombre: "producto " + (i + 1),
            precio: Math.floor(Math.random() * 10) + 1
            }
        },
        {
            id: i + 2,
            cantidad: 10,
            precio: Math.floor(Math.random() * 10) + 1,
            producto: {
            id: i + 2,
            nombre: "producto " + (i + 2),
            precio: Math.floor(Math.random() * 10) + 1
            }
        }
        ];
        const ldata = {
        nombre: "orden " + (i + 1),
        fecha: lfecha,
        detalle_orden: detalleOrden,
        total: detalleOrden[0].precio + detalleOrden[1].precio
        };
        await $fetch(`${BASE_URL}/api/couchdb/orden/methods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata),
            onRequestError({ request, options, error }) {
                return -1;
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

async function ordenesConsultarAzarCouchDB(total: number): Promise<number> {
    let start = new Date().getTime();

    // Ejecutar el proceso de obtener documentos aleatorios 'total' veces
    for (let i = 0; i < total; i++) {
        // Obtener un documento aleatorio con el nuevo parámetro random
        const response = await $fetch(`${BASE_URL}/api/couchdb/orden/methods?random=true`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        //console.log(response);
    }
    let end = new Date().getTime();
    let time = end - start;

    return time;
}

async function ordenesActualizarCouchDB(total:number): Promise<number> {
    let start = new Date().getTime();
    const docs = await $fetch(`${BASE_URL}/api/couchdb/orden/methods`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });

    for (let i = 0; i < total; i++) {
        const { _id, _rev } = docs[i];
        const ldata = {
            _id,
            _rev,
            fecha: new Date().toISOString(),
            detalle_orden: docs[i].detalle_orden,
            total: Math.floor(Math.random() * 100) + 1,
        }
        await $fetch(`${BASE_URL}/api/couchdb/orden/methods`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata),
            onRequestError({ request, options, error }) {
                return -1;
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

async function ordenesEliminarCouchDB(total: number): Promise<number> {
    let start = new Date().getTime();

    // Consultar todas las categorías para obtener sus _id y _rev
    const response = await $fetch(`${BASE_URL}/api/couchdb/orden/methods`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    // Eliminar cada categoría por su _id y _rev
    for (let i = 0; i < total; i++) {
        const { _id, _rev } = response[i];
        await $fetch(`${BASE_URL}/api/couchdb/orden/methods?_id=${_id}&_rev=${_rev}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let end = new Date().getTime();
    let time = end - start;

    return time;
}

export {ordenesInsertarCouchDB, ordenesConsultarAzarCouchDB, ordenesActualizarCouchDB, ordenesEliminarCouchDB};