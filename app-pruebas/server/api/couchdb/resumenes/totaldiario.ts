import { databases } from "../../../utils/couchdb/couchdb";

const db = databases.ordenes;

export default defineEventHandler(async (event) => {
    try {
        // Verify database connection
        await db.info(); // Throws if connection fails

        // Query the 'totaldiario' view with grouping
        const result = await db.view('ordenes', 'totaldiario', {
            group_level: 1 // Group by date
        });

        // Format results
        const data = result.rows.map(row => ({
            fecha: row.key,
            total: row.value
        }));

        //console.log('Total diario obtenido:', data);

        return { statusCode: 200, data };
    } catch (error) {
        console.error('Error al obtener el total diario:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });
        throw createError({
            statusCode: 500,
            statusMessage: 'Error al obtener el total diario'
        });
    }
});