import prisma from "../prisma.js";

//crear etiquetas
export const crearEtiquetas = async ({ nombre }) => {

    const etiqueta = await prisma.etiqueta.create({
        data: { nombre },
        select: { id: true, nombre: true }
    });
    return etiqueta;
};

//buscar etiquetas
export const obtenerEtiquetasDeTarea = async (tareaId) => {
    const tarea = await prisma.tarea.findUnique({
        where: {
            id: tareaId
        },
        select: {
            etiquetas: {
                select: {
                    id: true,
                    nombre: true
                },
            },
        },
    });

    if (!tarea) {
        throw new Error("no se encontro la tarea");
    }

    return tarea.etiquetas;
};

export const asociarEtiquetasATarea = async (tareaId, etiquetaIds) => {
    const tarea = await prisma.tarea.findUnique({
        where: { id: tareaId },
    });

    if (!tarea) throw new Error("Tarea no encontrada");

    await prisma.tarea.update({
        where: { id: tareaId },
        data: {
            etiquetas: {
                connect: etiquetaIds.map((id) => ({ id })),
            },
        },
    });
};

export const editarEtiqueta = async (etiquetaId, { nombre }) => {
    const buscarEtiqueta = await prisma.etiqueta.findUnique({
        where: { id: etiquetaId }
    })

    if (!buscarEtiqueta) {
        throw new Error("no existe la etiqueta");

    }


    const etiquetaUpdate = await prisma.etiqueta.update({
        where: { id: etiquetaId },
        data: {
            ...(nombre !== undefined && { nombre }),
        },
        select: {
            id: true,
            nombre: true
        },
    });
    return etiquetaUpdate
};

//eliminar etiqueta
export const eliminarEtiqueta = async (etiquetaId) => {

    const buscarEtiqueta = await prisma.etiqueta.findUnique({
        where: { id: etiquetaId }
    })

    if (!buscarEtiqueta) {
        throw new Error("no existe la etiqueta");
    }

    const etiquetaEliminada = await prisma.etiqueta.delete({
        where: { id: etiquetaId }
    });
    return etiquetaEliminada;
};