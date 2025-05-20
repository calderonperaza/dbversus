async function resumenesContarOrdenesCouchDB(): Promise<number> {
    let start = new Date().getTime();
    await $fetch('http://localhost:3000/api/couchdb/resumenes/countordenes', {
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
    await $fetch('http://localhost:3000/api/couchdb/resumenes/productosdiarios', {
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

    await $fetch('http://localhost:3000/api/couchdb/resumenes/productosdiariosfecha?fecha=' + fecha, {
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

export { resumenesContarOrdenesCouchDB, resumenesProductosCouchDB, resumenesProductosFechaCouchDB };