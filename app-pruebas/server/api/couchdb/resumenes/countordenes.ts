import { databases } from "../../../utils/couchdb/couchdb"; 

const db = databases.ordenes;

export default defineEventHandler(async (event) => {
    try {
        const result = await db.view('ordenes', 'by_date', {
            group: true,
            reduce: true
        });

        const data = result.rows.map(row => ({
            fecha: row.key,
            totalOrdenes: row.value
        }));

        data.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

        //console.log('Resultado de la consulta:', JSON.stringify(data, null, 2));

        return { statusCode: 200, data };
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return { statusCode: 500, error: error.message };
    }
});

