const pool = require('../conexion');

class CuentasModel {
    static añadirCuentaPrestamo(cuenta) {
        return new Promise((resolve, reject) => {
            const { id, usuarioId, balance, tasaInteres, fechaProximoPago } = cuenta;
            pool.query('INSERT INTO prestamos (id, usuarioId, balance, tasaInteres, fechaProximoPago, tipo) VALUES (?, ?, ?, ?, ?, ?)', [id, usuarioId, balance, tasaInteres, fechaProximoPago, 'prestamo'], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static añadirCuentaAhorro(cuenta) {
        return new Promise((resolve, reject) => {
            const { id, usuarioId, balance, tasaInteres } = cuenta;
            pool.query('INSERT INTO ahorros (id, usuarioId, balance, tasaInteres, tipo) VALUES (?, ?, ?, ?, ?)', [id, usuarioId, balance, tasaInteres, 'ahorro'], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static editarCuentaPrestamo(id, cuenta) {
        return new Promise((resolve, reject) => {
            const { balance, tasaInteres, fechaProximoPago } = cuenta;
            pool.query('UPDATE prestamos SET balance = ?, tasaInteres = ?, fechaProximoPago = ? WHERE id = ? AND tipo = ?', [balance, tasaInteres, fechaProximoPago, id, 'prestamo'], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static editarCuentaAhorro(id, cuenta) {
        return new Promise((resolve, reject) => {
            const { balance, tasaInteres } = cuenta;
            pool.query('UPDATE ahorros SET balance = ?, tasaInteres = ? WHERE id = ? AND tipo = ?', [balance, tasaInteres, id, 'ahorro'], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static eliminarCuenta(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM cuentas WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static mostrarProximaFechaPago(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT fechaProximoPago FROM cuentas WHERE id = ? AND tipo = ?', [id, 'prestamo'], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0].fechaProximoPago);
            });
        });
    }

    static mostrarResumenCuentas() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT tipo, SUM(balance) AS totalBalance, AVG(tasaInteres) AS promedioTasaInteres FROM cuentas GROUP BY tipo', (error, results) => {
                if (error) {
                    return reject(error);
                }
                const resumen = results.reduce((acc, row) => {
                    acc[`total${row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1)}`] = row.totalBalance;
                    acc[`promedioTasaInteres${row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1)}`] = row.promedioTasaInteres;
                    return acc;
                }, {});
                resolve(resumen);
            });
        });
    }
}

module.exports = CuentasModel;
