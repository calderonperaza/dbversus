import { databases } from '../../../utils/couchdb/couchdb';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    
    switch (method) {
        case 'GET': {
            const query = getQuery(event);
            if (query.id) {
                // Obtener un solo documento por ID
                return await databases.ordenes.get(query.id as string);
            } else if (query.count) {
                // Obtener el número total de documentos
                const totalResponse = await databases.ordenes.list({ include_docs: false });
                return { total: totalResponse.rows.length };
            } else if (query.random) {
                // Obtener un documento aleatorio
                const totalResponse = await databases.ordenes.list({ include_docs: false });
                const totalDocs = totalResponse.rows.length;
                const randomSkip = Math.floor(Math.random() * totalDocs);

                // Obtener un solo documento aleatorio con el 'skip'
                const randomDoc = await databases.ordenes.list({
                    limit: 1,
                    skip: randomSkip,
                    include_docs: true,
                });


                if (randomDoc.rows.length > 0) {
                    // Devolver de una fila aleatoria solo el documento aleatorio
                    return randomDoc.rows[0].doc;
                } else {
                    return { error: 'No se encontró el documento aleatorio' };
                }
            } else {
                // Obtener todos los documentos
                const docs = await databases.ordenes.list({ include_docs: true });
                return docs.rows.map((row: any) => row.doc);
            }
        }       

        case 'POST': {
            const body = await readBody(event);
            const response = await databases.ordenes.insert(body);
            return response;
        }

        case 'PUT': {
            const body = await readBody(event);
            if (!body._id || !body._rev) throw new Error('Se requiere _id y _rev para actualizar');
            return await databases.ordenes.insert(body);
        }

        case 'DELETE': {
            const query = getQuery(event);
            if (!query._id || !query._rev) throw new Error('Se requiere _id y _rev para eliminar');
            return await databases.ordenes.destroy(query._id as string, query._rev as string);
        }

        default:
            return { error: 'Method not allowed' };
    }
});