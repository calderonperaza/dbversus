import pruebas from '../pruebas.json';

async function productosInsertarCouchDB(total:number): Promise<number> {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "producto " + i,
        }
        await $fetch('http://localhost:3000/api/couchdb/producto/methods', {
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
    await $fetch('http://localhost:3000/api/couchdb/producto/methods', {
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

export {productosInsertarCouchDB, productosConsultarCouchDB, productoConsultarUnoCouchDB};