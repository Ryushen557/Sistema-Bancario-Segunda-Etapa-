const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarios');

router.get('/', (req, res) => {
    UsuarioController.ObtenerTodosLosUsuarios(req, res);
});

router.post('/', (req, res) => {
    UsuarioController.AñadirUsuario(req, res);
});

router.put('/:id', (req, res) => {
    UsuarioController.EditarUsuario(req, res);
});

router.delete('/:id', (req, res) => {
    UsuarioController.BorrarUsuario(req, res);
});

router.get('/:id', (req, res) => {
    UsuarioController.ObtenerDetallesUsuario(req, res);
});

router.get('/:id/cuentas', (req, res) => {
    UsuarioController.ObtenerCuentasUsuario(req, res);
});

module.exports = router;
