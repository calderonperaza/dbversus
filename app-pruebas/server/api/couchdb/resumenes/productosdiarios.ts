import { databases } from "../../../utils/couchdb/couchdb";

const db = databases.ordenes;

export default defineEventHandler(async (event) => {
  try {
    const result = await db.view('ordenes', 'by_date_and_product', {
      // Sin group: true
    });

    const data = result.rows.map(row => ({
      fecha: row.key[0], // fecha
      id: row.key[1],    // _id de la orden
      detalleordenes: {
        cantidad: row.value.cantidad,
        producto: {
          id: row.value.producto_id,
          nombre: row.value.nombre
        }
      }
    }));

    data.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

    //console.log('Resultado de la consulta:', JSON.stringify(data, null, 2));

    return { statusCode: 200, data };
  } catch (error) {
    console.error('Error productosdiarios:', error);
    return { statusCode: 500, error: error.message };
  }
});