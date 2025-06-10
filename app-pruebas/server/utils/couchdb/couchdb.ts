import nano from "nano";

// Define la URL de CouchDB
const COUCHDB_HOST = process.env.HOST_DB || "localhost"; // Nombre del contenedor de CouchDB
const COUCHDB_PORT = "5984";
const COUCHDB_URL = `http://${COUCHDB_HOST}:${COUCHDB_PORT}`;
const USER = "admin";
const PASSWORD = "password";

console.log(`Conectando a CouchDB en: ${COUCHDB_URL}`);

// Configuración de la conexión a CouchDB
let couch;
try {
    couch = nano({
        url: COUCHDB_URL,
        requestDefaults: {
            auth: {
                username: USER,
                password: PASSWORD,
            },
        },
    });
    // Prueba la conexión al iniciar
    couch.db.get("categorias").then(() => {
        console.log("Conexión a CouchDB exitosa");
    }).catch((err) => {
        console.error("Error al conectar con CouchDB:", err);
    });
} catch (error) {
    console.error("Error al inicializar la conexión con CouchDB:", error);
}

// Define las bases de datos
export const databases = {
    categorias: couch?.use("categorias"),
    ordenes: couch?.use("ordenes"),
    productos: couch?.use("productos"),
    detalleordenes: couch?.use("detalle_ordenes"),
};

export default { couch };
