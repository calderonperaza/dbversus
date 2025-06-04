import { databases } from "../../../utils/couchdb/couchdb";

const db = databases.ordenes;

export default defineEventHandler(async (event) => {
    try {
        // Verify database connection
        await db.info(); // Throws if connection fails

        // Query the 'topten' view with grouping
        const result = await db.view('ordenes', 'topten', {
            group_level: 2, // Group by producto.id and producto.nombre
            descending: true, // Order by cantidad in descending order
            limit: 10 // Limit to top 10 products
        });

        // Format results to match MySQL output
        const data = result.rows.map(row => ({
            idproducto: row.key[0],
            nombre: row.key[1],
            cantidad: row.value
        }));

        //console.log('Top ten obtenido:', data);

        return { statusCode: 200, data };
    } catch (error) {
        console.error('Error al obtener el top ten:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });
        throw createError({
            statusCode: 500,
            statusMessage: 'Error al obtener el top ten'
        });
    }
});