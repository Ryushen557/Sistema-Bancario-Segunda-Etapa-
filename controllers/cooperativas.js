const CooperativaModel = require('../models/cooperativas');

class CooperativaController {
    ObtenerTodasLasCooperativas(req, res) {
        CooperativaModel.obtenerTodasLasCooperativas()
            .then(rows => res.json(rows))
            .catch(error => res.status(500).json({ mensaje: 'Error al obtener cooperativas', error }));
    }

    AñadirCooperativa(req, res) {
        const { id, nombre, direccion } = req.body;
        CooperativaModel.añadirCooperativa(id, nombre, direccion)
            .then(() => res.status(201).json({ mensaje: 'Se ha añadido la cooperativa', cooperativa: { id, nombre, direccion } }))
            .catch(error => res.status(500).json({ mensaje: 'Error al añadir cooperativa', error }));
    }

    EditarCooperativa(req, res) {
        const { id } = req.params;
        const { nombre, direccion } = req.body;
        CooperativaModel.editarCooperativa(id, nombre, direccion)
            .then(result => {
                if (result.affectedRows > 0) {
                    res.json({ mensaje: 'Cooperativa actualizada', cooperativa: { id, nombre, direccion } });
                } else {
                    res.status(404).json({ mensaje: 'No se encontró la cooperativa en la base de datos' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al actualizar cooperativa', error }));
    }

    BorrarCooperativa(req, res) {
        const { id } = req.params;
        CooperativaModel.borrarCooperativa(id)
            .then(result => {
                if (result.affectedRows > 0) {
                    res.json({ mensaje: 'Cooperativa eliminada' });
                } else {
                    res.status(404).json({ mensaje: 'No se encontró la cooperativa en la base de datos' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al eliminar cooperativa', error }));
    }

    ObtenerDetallesCooperativa(req, res) {
        const { id } = req.params;
        CooperativaModel.obtenerDetallesCooperativa(id)
            .then(rows => {
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.status(404).json({ mensaje: 'No se encontró la cooperativa en la base de datos' });
                }
            })
            .catch(error => res.status(500).json({ mensaje: 'Error al obtener detalles de la cooperativa', error }));
    }
}

module.exports = new CooperativaController();
