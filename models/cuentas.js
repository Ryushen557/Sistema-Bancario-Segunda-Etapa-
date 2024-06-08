const db = require('../conexion');

class CuentaModel {
    añadirCuentaPrestamo(id, usuarioId, balance, tasaInteres, fechaProximoPago) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO cuentas (id, tipo, usuarioId, balance, tasaInteres, fechaProximoPago) VALUES (?, "prestamo", ?, ?, ?, ?)', [id, usuarioId, balance, tasaInteres, fechaProximoPago], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    añadirCuentaAhorro(id, usuarioId, balance, tasaInteres) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO cuentas (id, tipo, usuarioId, balance, tasaInteres) VALUES (?, "ahorro", ?, ?, ?)', [id, usuarioId, balance, tasaInteres], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    editarCuentaPrestamo(id, balance, tasaInteres, fechaProximoPago) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE cuentas SET balance = ?, tasaInteres = ?, fechaProximoPago = ? WHERE id = ? AND tipo = "prestamo"', [balance, tasaInteres, fechaProximoPago, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    editarCuentaAhorro(id, balance, tasaInteres) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE cuentas SET balance = ?, tasaInteres = ? WHERE id = ? AND tipo = "ahorro"', [balance, tasaInteres, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    eliminarCuenta(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM cuentas WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    mostrarProximaFechaPago(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT fechaProximoPago FROM cuentas WHERE id = ? AND tipo = "prestamo"', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    mostrarResumenCuentas() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM cuentas', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = new CuentaModel();
