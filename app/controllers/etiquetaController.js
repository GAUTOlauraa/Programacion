import {
    editarEtiqueta,
    obtenerEtiquetasDeTarea,
    eliminarEtiqueta,
    asociarEtiquetasATarea,
    crearEtiquetas
} from "../services/etiquetaService.js";

export const listarEtiquetasDeTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaId = parseInt(id);
        const etiquetas = await obtenerEtiquetasDeTarea(tareaId);
        res.json(etiquetas);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
};

export const eliminarUnaEtiqueta = async (req, res) => {
    try {
        const { id } = req.params;
        const etiquetaId = parseInt(id);

        await eliminarEtiqueta(etiquetaId);
        res.status(200).json({ msg: "etiqueta eliminada correctamente" });

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const crearNuevaEtiqueta = async (req, res) => {
    try {
        const { nombre } = req.body;
        const etiqueta = await crearEtiquetas({ nombre });
        res.status(201).json(etiqueta);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
};

export const asociarEtiquetas = async (req, res) => {
    try {
        const { id } = req.params;
        const { etiquetaIds } = req.body;
        const tareaId = parseInt(id);

        await asociarEtiquetasATarea(tareaId, etiquetaIds);
        res.json({ message: "Etiquetas asociadas" });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const actualizarEtiqueta = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const etiquetaId = parseInt(id);

        if (nombre === undefined) {
            return res.status(400).json({ msg: "debe modificar el campo" });
        }

        const etiquetaActualizada = await editarEtiqueta(etiquetaId, { nombre });
        res.json(etiquetaActualizada);

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
};
