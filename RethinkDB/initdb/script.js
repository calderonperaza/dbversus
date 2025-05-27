import r from 'rethinkdb';

export async function initializeDatabase() {
    let conn;
    try {
        conn = await r.connect({ host: 'rethinkdb', port: 28015 });

        const dbName = process.env.DB_NAME || 'cafeteria';
        const tables = (process.env.TABLES || 'categorias,productos,ordenes').split(',');

        // Crear base de datos si no existe
        const dbList = await r.dbList().run(conn);
        if (!dbList.includes(dbName)) {
            await r.dbCreate(dbName).run(conn);
            console.log(`Base de datos '${dbName}' creada.`);
        } else {
            console.log(`La base de datos '${dbName}' ya existe.`);
        }

        // Crear tablas si no existen
        const tableList = await r.db(dbName).tableList().run(conn);
        for (const table of tables) {
            if (!tableList.includes(table)) {
                await r.db(dbName).tableCreate(table).run(conn);
                console.log(`Tabla '${table}' creada.`);
            } else {
                console.log(`La tabla '${table}' ya existe.`);
            }
        }

        console.log('Inicialización de la base de datos completada.');
    } catch (error) {
        console.error('Error inicializando la base de datos:', error);
    } finally {
      if(conn){
        conn.close()
      }
    }
}

initializeDatabase();