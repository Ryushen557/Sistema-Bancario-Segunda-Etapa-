const pool = require('../conexion');

class CooperativaModel {
    static añadirCooperativa(cooperativa) {
        return new Promise((resolve, reject) => {
            const { id, nombre, usuariosDeCooperativa } = cooperativa;
            pool.query('INSERT INTO cooperativas (id, nombre) VALUES (?, ?)', [id, nombre], (error, results) => {
                if (error) {
                    return reject(error);
                }
                const cooperativaId = results.insertId;
                const usuarioCooperativaPromises = usuariosDeCooperativa.map(usuarioId => 
                    pool.query('INSERT INTO usuario_cooperativa (cooperativaId, usuarioId) VALUES (?, ?)', [cooperativaId, usuarioId])
                );
                Promise.all(usuarioCooperativaPromises)
                    .then(() => resolve(results))
                    .catch(reject);
            });
        });
    }

    static eliminarUsuarioDeCooperativa(cooperativaId, usuarioId) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM usuario_cooperativa WHERE cooperativaId = ? AND usuarioId = ?', [cooperativaId, usuarioId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static relacionarUsuarioConCooperativa(cooperativaId, usuarioId) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO usuario_cooperativa (cooperativaId, usuarioId) VALUES (?, ?)', [cooperativaId, usuarioId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static obtenerTodasCooperativas() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM cooperativas', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static obtenerDetallesCooperativa(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM cooperativas WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    }

    static obtenerResumen() {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT 
                    (SELECT COUNT(*) FROM ahorros) AS totalAhorros, 
                    (SELECT COUNT(*) FROM prestamos) AS totalPrestamos, 
                    (SELECT COUNT(*) FROM usuarios) AS totalUsuarios 
                FROM DUAL`, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    }
}

module.exports = CooperativaModel;
