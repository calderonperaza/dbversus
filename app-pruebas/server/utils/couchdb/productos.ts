import pruebas from '../pruebas.json';

const BASE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

async function productosInsertarCouchDB(total:number): Promise<number> {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            nombre: "producto " + i,
        }
        await $fetch(`${BASE_URL}/api/couchdb/producto/methods`, {
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

async function productosConsultarCouchDB(): Promise<number> {
    let start = new Date().getTime();
    await $fetch(`${BASE_URL}/api/couchdb/producto/methods`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        onRequestError({ request, options, error }) {
            return -1;
        },
    })        
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

async function productosConsultarAzarCouchDB(total: number): Promise<number> {
    let start = new Date().getTime();

    // Ejecutar el proceso de obtener documentos aleatorios 'total' veces
    for (let i = 0; i < total; i++) {
        // Obtener un documento aleatorio con el nuevo parámetro random
        const response = await $fetch(`${BASE_URL}/api/couchdb/producto/methods?random=true`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        //console.log(response);
    }
    let end = new Date().getTime();
    let time = end - start;

    return time;
}

async function productosActualizarCouchDB(total:number): Promise<number> {
    let start = new Date().getTime();
    const docs = await $fetch(`${BASE_URL}/api/couchdb/producto/methods`, {
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
            nombre: "producto " + (i + 1) + " Actualizado",
        }
        await $fetch(`${BASE_URL}/api/couchdb/producto/methods`, {
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

async function productosEliminarCouchDB(total: number): Promise<number> {
    let start = new Date().getTime();

    // Consultar todas las categorías para obtener sus _id y _rev
    const response = await $fetch(`${BASE_URL}/api/couchdb/producto/methods`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    // Eliminar cada categoría por su _id y _rev
    for (let i = 0; i < total; i++) {
        const { _id, _rev } = response[i];
        await $fetch(`${BASE_URL}/api/couchdb/producto/methods?_id=${_id}&_rev=${_rev}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let end = new Date().getTime();
    let time = end - start;

    return time;
}

export {productosInsertarCouchDB, productosConsultarCouchDB, productosConsultarAzarCouchDB, productosActualizarCouchDB, productosEliminarCouchDB};