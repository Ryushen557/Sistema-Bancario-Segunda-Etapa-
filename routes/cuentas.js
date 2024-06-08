const express = require('express');
const router = express.Router();
const CuentaController = require('../controllers/cuentas');

router.post('/prestamo', (req, res) => {
    CuentaController.AñadirCuentaPrestamo(req, res);
});

router.post('/ahorro', (req, res) => {
    CuentaController.AñadirCuentaAhorro(req, res);
});

router.put('/prestamo/:id', (req, res) => {
    CuentaController.EditarCuentaPrestamo(req, res);
});

router.put('/ahorro/:id', (req, res) => {
    CuentaController.EditarCuentaAhorro(req, res);
});

router.delete('/:id', (req, res) => {
    CuentaController.EliminarCuenta(req, res);
});

router.get('/prestamo/:id/proxima-fecha-pago', (req, res) => {
    CuentaController.MostrarProximaFechaPago(req, res);
});

router.get('/', (req, res) => {
    CuentaController.MostrarResumenCuentas(req, res);
});

module.exports = router;
