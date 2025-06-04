import { databases } from '../../../utils/couchdb/couchdb';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    
    switch (method) {
        case 'GET': {
            const query = getQuery(event);
            if (query._id) {
                // Obtener un solo documento por ID
                const _id = query._id;
                if (_id) {
                    try {
                        const doc = await databases.ordenes.get(_id);
                        return doc;
                    } catch (error) {
                        console.error(`Error al obtener documento con ID ${_id}:`, error);
                        throw createError({
                            statusCode: 404,
                            statusMessage: `No se encontró el documento con ID ${_id}`,
                        });
                    }
                } else {
                    const docs = await databases.productos.list({ include_docs: true });
                    return docs.rows.map((row: any) => row.doc);
                }
            } else if (query.count) {
                // Obtener el número total de documentos
                const totalResponse = await databases.ordenes.list({ include_docs: false });
                return { total: totalResponse.rows.length };
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