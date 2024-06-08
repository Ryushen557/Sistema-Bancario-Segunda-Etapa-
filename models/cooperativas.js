const db = require('../conexion');

class CooperativaModel {
    obtenerTodasLasCooperativas() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM cooperativas', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    añadirCooperativa(id, nombre, direccion) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO cooperativas (id, nombre, direccion) VALUES (?, ?, ?)', [id, nombre, direccion], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    editarCooperativa(id, nombre, direccion) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE cooperativas SET nombre = ?, direccion = ? WHERE id = ?', [nombre, direccion, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    borrarCooperativa(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM cooperativas WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    obtenerDetallesCooperativa(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM cooperativas WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = new CooperativaModel();
