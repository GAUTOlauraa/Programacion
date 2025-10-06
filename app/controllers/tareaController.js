import {
    eliminarTarea,
    listarTareasPorUsuario,
    crearTarea,
    editarTarea
} from "../services/tareaService.js";

export const eliminarUnaTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaId = parseInt(id);

        await eliminarTarea(tareaId);
        res.status(200).json({ msg: "Tarea eliminada correctamente" });

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}


export const obtenerTareasDeUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const tareas = await listarTareasPorUsuario(userId);
        res.json(tareas);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const crearNuevaTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo } = req.body;
        const userId = parseInt(id);
        const tarea = await crearTarea(userId, { titulo });
        res.status(201).json(tarea);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo } = req.body;
        const tareaId = parseInt(id);

        if (titulo === undefined) {
            return res.status(400).json({ msg: "debe modificar el campo" });
        }

        const tareaActualizada = await editarTarea(tareaId, { titulo });
        res.json(tareaActualizada);

    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};
