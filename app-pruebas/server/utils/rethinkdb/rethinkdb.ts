
// entorno de desarrollo 

// import rethink from 'rethinkdb';
// async function connect() {
//     const host = 'localhost';
//     return await rethink.connect({ host, port: 28015, db: 'cafeteria' });
// }

// export { connect, rethink };


// entorno de produccion

import rethink from 'rethinkdb';
async function connect() {
  const host = process.env.HOST_DB || 'localhost';
  return await rethink.connect({
    host,
    port: 28015,
    db: 'cafeteria'
  });
}

export { connect, rethink };
