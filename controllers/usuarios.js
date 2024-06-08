const UsuarioModel = require('../models/usuarios');

class UsuarioController {
    ObtenerTodosLosUsuarios(req, res) {
        UsuarioModel.obtenerTodosLosUsuarios()
            .then(rows => res.json(rows))
            .catch(error => res.status(500).json({ mensaje: 'Error al obtener usuarios', error }));
    }

    AñadirUsuario(req, res) {
        const { id, nombre, email } = req.body;
        UsuarioModel.añadirUsuario(id, nombre, email)
            .then(() => res.status(201).json({ mensaje: 'Se ha añadido el usuario', usuario: { id, nombre, email } }))
            .catch(error => res.status(500).json({ mensaje: 'Error al añadir usuario', error }));
    }

    EditarUsuario(req, res) {
        const { id } = req.params;
        const { nombre, email } = req.body;
        UsuarioModel.editarUsuario(id, nombre, email)
            .then(result => {
                if (result.affectedRows > 0) {
                    res.json({ mensaje: 'Usuario actualizado', usuario: { id, nombre, email } });
                } else {
                    res.status(404).json({ mensaje: 'No se encontró el usuario en la base de datos' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al actualizar usuario', error }));
    }

    BorrarUsuario(req, res) {
        const { id } = req.params;
        UsuarioModel.borrarUsuario(id)
            .then(result => {
                if (result.affectedRows > 0) {
                    res.json({ mensaje: 'Usuario eliminado' });
                } else {
                    res.status(404).json({ mensaje: 'No se encontró el usuario en la base de datos' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al eliminar usuario', error }));
    }

    ObtenerDetallesUsuario(req, res) {
        const { id } = req.params;
        UsuarioModel.obtenerDetallesUsuario(id)
            .then(rows => {
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.status(404).json({ mensaje: 'No se encontró el usuario en la base de datos' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al obtener detalles del usuario', error }));
    }

    ObtenerCuentasUsuario(req, res) {
        const { id } = req.params;
        UsuarioModel.obtenerCuentasUsuario(id)
            .then(({ cuentasPrestamos, cuentasAhorros }) => {
                if (cuentasPrestamos.length > 0 || cuentasAhorros.length > 0) {
                    res.json({ cuentasPrestamos, cuentasAhorros });
                } else {
                    res.status(404).json({ mensaje: 'No se encontraron cuentas para el usuario en la base de datos' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al obtener cuentas del usuario', error }));
    }
}

module.exports = new UsuarioController();
