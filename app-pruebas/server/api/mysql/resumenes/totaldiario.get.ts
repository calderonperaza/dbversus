//Devolveremos las fechas y la suma de las ordenes en esas fechas
import { ordenes } from "../../../utils/mysql";
export default defineEventHandler(async (event) => {      
    try {
        const data = await ordenes.findAll({
            attributes: [[sequelize.fn('date', sequelize.col('fecha')), 'fecha'], [sequelize.fn('sum', sequelize.col('total')), 'total']],
            group: 'fecha',
            raw: true
        });
        return { statusCode:200, data };
         
      } catch (error) {
        console.error('Error totaldiario:', error);
        return(error)
      }    
})