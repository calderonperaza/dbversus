const BASE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
let arrayPruebas: any[] = [];

async function productosInsertarCouchDB(inicio: number, total:number): Promise<number> {
    let start = new Date().getTime();
    let final = parseInt(String(inicio)) + total;
    for (let i = inicio; i < final; i++) {
        const ldata = {
            _id: `${i}`,
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

async function productosConsultarAzarCouchDB(inicio: number, total: number): Promise<number> {
    let start = new Date().getTime();
    
    let ids = Array.from({ length: total }, (_, i) => i + parseInt(String(inicio)));
    for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    let unicosIds = ids.slice(0, total);

    for (let i = 0; i < unicosIds.length; i++) {
        let _id = unicosIds[i];
        const result = await $fetch(`${BASE_URL}/api/couchdb/producto/methods?_id=${_id}`, {
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json',
            },
            onRequestError({ request, options, error }) {
                return -1;
            },
        })
        arrayPruebas.push(result);
    }
    let end = new Date().getTime();
    let time = end - start;

    return time;
}

async function productosActualizarCouchDB(inicio: number, total:number): Promise<number> {
    let start = new Date().getTime();
    
    for (let i = 0; i < total; i++) {
        
        const { _id, _rev } = arrayPruebas[i];
        const ldata = {
            _id,
            _rev,
            nombre: "producto " + (_id) + " Actualizado",
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

async function productosEliminarCouchDB(inicio: number, total: number): Promise<number> {
    let start = new Date().getTime();
    let final = (parseInt(String(inicio)) + total) - 1;

    // Eliminar cada categoría por su _id y _rev
    for (let i = inicio; i <= final; i++) {
        const response = await $fetch(`${BASE_URL}/api/couchdb/producto/methods?_id=${i}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const { _id, _rev } = response;
        await $fetch(`${BASE_URL}/api/couchdb/producto/methods?_id=${_id}&_rev=${_rev}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    }
    arrayPruebas = []; // Limpiar el arrayPruebas después de eliminar
    let end = new Date().getTime();
    let time = end - start;

    return time;
}

export {productosInsertarCouchDB, productosConsultarCouchDB, productosConsultarAzarCouchDB, productosActualizarCouchDB, productosEliminarCouchDB};