import { databases } from "../../../utils/couchdb/couchdb";

const db = databases.ordenes;

export default defineEventHandler(async (event) => {
    const { fecha } = getQuery(event); // Obtener el parámetro fecha
  
    if (!fecha) {
      return { statusCode: 400, error: 'El parámetro fecha es requerido' };
    }
  
    // Normalizar la fecha a formato YYYY-MM-DD (agregar ceros a la izquierda)
    const [anio, mes, dia] = fecha.split('-');
    const fechaNormalizada = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}T00:00:00.000Z`;

    //console.log('Fecha normalizada:', fechaNormalizada);
  
    try {
      const result = await db.view('ordenes', 'by_date_and_product', {
        startkey: [fechaNormalizada],           // Filtra por fecha normalizada
        endkey: [fechaNormalizada, "\uffff"],   // Incluye todos los _id para esa fecha
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
  
      // Ordenar por fecha (opcional, ya que solo hay una fecha)
      data.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  
      //console.log('Resultado de la consulta:', JSON.stringify(data, null, 2));

      return { statusCode: 200, data };
    } catch (error) {
      console.error('Error productosdiarios:', error);
      return { statusCode: 500, error: error.message };
    }
  });