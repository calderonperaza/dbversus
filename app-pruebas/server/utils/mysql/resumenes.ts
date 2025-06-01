
//consultas de resumenes o totales
async function resumenesContarOrdenes(): Promise<number>  {
    let start = new Date().getTime();
    await $fetch('http://localhost:3000/api/mysql/resumenes/countordenes', {
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

async function resumenesProductos(): Promise<number>  {
    let start = new Date().getTime();
    await $fetch('http://localhost:3000/api/mysql/resumenes/productosdiarios', {
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

async function resumenesProductosFecha(): Promise<number>  {
    let start = new Date().getTime();
    let anio = new Date().getFullYear();        
    let mes = Math.floor(Math.random() * 12)+1;
    let dia = Math.floor(Math.random() * 28 + 1);
    let fecha= anio + "-" + mes + "-" + dia;

    await $fetch('http://localhost:3000/api/mysql/resumenes/productosdiariosfecha?fecha=' + fecha, {
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

async function resumenesTotalDiario() : Promise<number> {
    let start = new Date().getTime();
    await $fetch('http://localhost:3000/api/mysql/resumenes/totaldiario', {
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

async function resumenesTopten(): Promise<number>  {
    let start = new Date().getTime();
    await $fetch('http://localhost:3000/api/mysql/resumenes/topten', {
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

export { resumenesContarOrdenes, resumenesProductos, resumenesProductosFecha, resumenesTotalDiario, resumenesTopten };