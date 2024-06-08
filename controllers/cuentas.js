const CuentaModel = require('../models/cuentas');

class CuentaController {
    AñadirCuentaPrestamo(req, res) {
        const { id, usuarioId, balance, tasaInteres, fechaProximoPago } = req.body;
        CuentaModel.añadirCuentaPrestamo(id, usuarioId, balance, tasaInteres, fechaProximoPago)
            .then(() => res.status(201).json({ mensaje: 'Cuenta de préstamo añadida', cuenta: { id, usuarioId, balance, tasaInteres, fechaProximoPago } }))
            .catch(error => res.status(500).json({ mensaje: 'Error al añadir cuenta de préstamo', error }));
    }

    AñadirCuentaAhorro(req, res) {
        const { id, usuarioId, balance, tasaInteres } = req.body;
        CuentaModel.añadirCuentaAhorro(id, usuarioId, balance, tasaInteres)
            .then(() => res.status(201).json({ mensaje: 'Cuenta de ahorro añadida', cuenta: { id, usuarioId, balance, tasaInteres } }))
            .catch(error => res.status(500).json({ mensaje: 'Error al añadir cuenta de ahorro', error }));
    }

    EditarCuentaPrestamo(req, res) {
        const { id } = req.params;
        const { balance, tasaInteres, fechaProximoPago } = req.body;
        CuentaModel.editarCuentaPrestamo(id, balance, tasaInteres, fechaProximoPago)
            .then(result => {
                if (result.affectedRows > 0) {
                    res.json({ mensaje: 'Cuenta de préstamo actualizada', cuenta: { id, balance, tasaInteres, fechaProximoPago } });
                } else {
                    res.status(404).json({ mensaje: 'Cuenta de préstamo no encontrada' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al actualizar cuenta de préstamo', error }));
    }

    EditarCuentaAhorro(req, res) {
        const { id } = req.params;
        const { balance, tasaInteres } = req.body;
        CuentaModel.editarCuentaAhorro(id, balance, tasaInteres)
            .then(result => {
                if (result.affectedRows > 0) {
                    res.json({ mensaje: 'Cuenta de ahorro actualizada', cuenta: { id, balance, tasaInteres } });
                } else {
                    res.status(404).json({ mensaje: 'Cuenta de ahorro no encontrada' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al actualizar cuenta de ahorro', error }));
    }

    EliminarCuenta(req, res) {
        const { id } = req.params;
        CuentaModel.eliminarCuenta(id)
            .then(result => {
                if (result.affectedRows > 0) {
                    res.json({ mensaje: 'Cuenta eliminada' });
                } else {
                    res.status(404).json({ mensaje: 'Cuenta no encontrada' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al eliminar cuenta', error }));
    }

    MostrarProximaFechaPago(req, res) {
        const { id } = req.params;
        CuentaModel.mostrarProximaFechaPago(id)
            .then(rows => {
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.status(404).json({ mensaje: 'No se encontró la próxima fecha de pago' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al obtener la próxima fecha de pago', error }));
    }

    MostrarResumenCuentas(req, res) {
        CuentaModel.mostrarResumenCuentas()
            .then(rows => res.json(rows))
            .catch(error => res.status(500).json({ mensaje: 'Error al obtener el resumen de cuentas', error }));
    }
}

module.exports = new CuentaController();
