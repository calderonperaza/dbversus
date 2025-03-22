import { databases } from '../../../utils/couchdb/couchdb';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    
    switch (method) {
        //GET todos
        case 'GET': {
            const query = getQuery(event);
            if (query.id) {
                return await databases.ordenes.get(query.id as string);
            }
            const docs = await databases.ordenes.list({ include_docs: true });
            return docs.rows.map((row: any) => row.doc);
        }

        // GET uno por id
        case 'GET': {
            const query = getQuery(event);
            if (query.id) {
                return await databases.ordenes.get(query.id as string);
            }
            const docs = await databases.ordenes.list({ include_docs: true });
            return docs.rows.map((row: any) => row.doc);
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
            if (!query.id || !query.rev) throw new Error('Se requiere _id y _rev para eliminar');
            return await databases.ordenes.destroy(query.id as string, query.rev as string);
        }

        default:
            return { error: 'Method not allowed' };
    }
});