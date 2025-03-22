import nano from "nano";

const COUCHDB_URL = process.env.COUCHDB_URL || "http://localhost:5984";
const USER = "admin";
const PASSWORD = "password";

const couch = nano({
    url: COUCHDB_URL,
    requestDefaults: {
        auth: {
            username: USER,
            password: PASSWORD
        }
    }
});

export const databases = {
    categorias: couch.use('categorias'),
    ordenes: couch.use('ordenes'),
    productos: couch.use('productos'),
    detalleordenes: couch.use('detalle_ordenes')
};

export default { couch };

