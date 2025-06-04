const BASE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
let arrayPruebas: any[] = [];

async function ordenesInsertarCouchDB(inicio:number, total:number): Promise<number> {
    let start = new Date().getTime();
    let final = parseInt(String(inicio)) + total;

    for (let i = inicio; i < final; i++) {
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
            _id: `${i}`,
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

async function ordenesConsultarAzarCouchDB(inicio: number, total: number): Promise<number> {
    let start = new Date().getTime();
    
    let ids = Array.from({ length: total }, (_, i) => i + parseInt(String(inicio)));
    for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    let unicosIds = ids.slice(0, total);

    //console.log("IDs únicos generados: ", unicosIds);
    //console.log("Total de IDs únicos: ", unicosIds.length);

    for (let i = 0; i < unicosIds.length; i++) {
        let _id = unicosIds[i];
        const result = await $fetch(`${BASE_URL}/api/couchdb/orden/methods?_id=${_id}`, {
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

async function ordenesActualizarCouchDB(inicio: number, total:number): Promise<number> {
    let start = new Date().getTime();

    for (let i = 0; i < total; i++) {
        const { _id, _rev } = arrayPruebas[i];
        const ldata = {
            _id,
            _rev,
            nombre: "Categoria " + (_id) + " Actualizada",
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

async function ordenesEliminarCouchDB(inicio: number, total: number): Promise<number> {
    let start = new Date().getTime();
    let final = (parseInt(String(inicio)) + total) - 1;

    // Eliminar cada categoría por su _id y _rev
    for (let i = inicio; i <= final; i++) {
        const response = await $fetch(`${BASE_URL}/api/couchdb/orden/methods?_id=${i}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const { _id, _rev } = response;
        await $fetch(`${BASE_URL}/api/couchdb/orden/methods?_id=${_id}&_rev=${_rev}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    }
    arrayPruebas = []; // Limpiar el arrayPruebas después de eliminar
    let end = new Date().getTime();
    let time = end - start;

    return time;
}

export {ordenesInsertarCouchDB, ordenesConsultarAzarCouchDB, ordenesActualizarCouchDB, ordenesEliminarCouchDB};