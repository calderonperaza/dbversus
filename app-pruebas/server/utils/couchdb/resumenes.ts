const BASE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

async function resumenesContarOrdenesCouchDB(): Promise<number> {
    let start = new Date().getTime();
    await $fetch(`${BASE_URL}/api/couchdb/resumenes/countordenes`, {
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

async function resumenesProductosCouchDB(): Promise<number> {
    let start = new Date().getTime();
    await $fetch(`${BASE_URL}/api/couchdb/resumenes/productosdiarios`, {
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

async function resumenesProductosFechaCouchDB(): Promise<number> {
    let start = new Date().getTime();
    let anio = new Date().getFullYear();
    let mes = Math.floor(Math.random() * 12) + 1;
    let dia = Math.floor(Math.random() * 28 + 1);
    let fecha = anio + "-" + mes + "-" + dia;

    await $fetch(`${BASE_URL}/api/couchdb/resumenes/productosdiariosfecha?fecha=` + fecha, {
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

interface TotalDiario {
    fecha: string;
    total: number;
}

async function resumenesTotalDiarioCouchDB(): Promise<number> {
    let start = new Date().getTime();
    
    await $fetch(`${BASE_URL}/api/couchdb/resumenes/totaldiario`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

async function resumenesToptenCouchDB(): Promise<number> {
    let start = new Date().getTime();
    await $fetch(`${BASE_URL}/api/couchdb/resumenes/topten`, {
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

export { resumenesContarOrdenesCouchDB, resumenesProductosCouchDB, resumenesProductosFechaCouchDB, resumenesTotalDiarioCouchDB, resumenesToptenCouchDB };