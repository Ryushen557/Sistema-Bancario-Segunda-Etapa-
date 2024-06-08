const db = require('../conexion');

class UsuarioModel {
    obtenerTodosLosUsuarios() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuarios', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    añadirUsuario(id, nombre, email) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO usuarios (id, nombre, email) VALUES (?, ?, ?)', [id, nombre, email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    editarUsuario(id, nombre, email) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    borrarUsuario(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    obtenerDetallesUsuario(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    obtenerCuentasUsuario(id) {
        return new Promise((resolve, reject) => {
            const cuentasPrestamos = new Promise((resolve, reject) => {
                db.query('SELECT * FROM prestamos WHERE usuarioId = ?', [id], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            const cuentasAhorros = new Promise((resolve, reject) => {
                db.query('SELECT * FROM ahorros WHERE usuarioId = ?', [id], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            Promise.all([cuentasPrestamos, cuentasAhorros])
                .then(results => resolve({ cuentasPrestamos: results[0], cuentasAhorros: results[1] }))
                .catch(error => reject(error));
        });
    }
}

module.exports = new UsuarioModel();
