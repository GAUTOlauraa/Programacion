import prisma from "../prisma.js";

//crear tareas
export const crearTarea = async (userId, { titulo }) => {

    const encontrarUser = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!encontrarUser) throw new Error("usuario no encontrado");

    const tarea = await prisma.tarea.create({
        data: {
            titulo,
            userId,
        },
        select: {
            id: true,
            titulo: true,
            userId: true,
        },
    });
    return tarea;
};


//listar por usuario
export const listarTareasPorUsuario = async (userId) => {

    const tareasMany = await prisma.tarea.findMany({
        where: { userId },
        select: { id: true, titulo: true }
    })

    if (!tareasMany) {
        throw new Error("no hay tareas");
    }
    return tareasMany
};

export const editarTarea = async (tareaId, { titulo }) => {
    const buscarTarea = await prisma.tarea.findUnique({
        where: { id: tareaId }
    })

    if (!buscarTarea) {
        throw new Error("no se encontro la tarea");
    };

    const tareaUpdate = await prisma.tarea.update({
        where: { id: tareaId },
        data: {
            ...(titulo !== undefined && { titulo }),
        },
        select: {
            id: true,
            titulo: true,
        },
    });
    return tareaUpdate
};

//eliminar tarea
export const eliminarTarea = async (tareaId) => {

    const buscarTarea = await prisma.tarea.findUnique({
        where: { id: tareaId }
    })

    if (!buscarTarea) {
        throw new Error("tarea no encontrada");
    }

    const tareaEliminada = await prisma.tarea.delete({
        where: { id: tareaId }
    });
    return tareaEliminada;
};
