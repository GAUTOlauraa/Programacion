import {
  registrar,
  loguear,
  listarTodosLosUsuarios,
  obtenerUsuarioPorId,
  eliminarUsuario,
  editarUsuario,
  crearUsuario,
  crearPerfilDeUsuario,
  obtenerPerfilDeUsuario,
  obtenerTodosLosPerfiles,
} from "../services/userService.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({ msg: "complete toods los campos" });
    }

    const user = await registrar({ name, username, password });
    res.status(201).json({ msg: "usuario registrado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const loguearUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: "complete todos los campos" });
    }

    const user = await loguear({ username, password });
    res.status(201).json({ msg: "inicio de sesion correcto" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const ListarTodosLosUsuarios = async (req, res) => {
  try {
    const { sexo } = req.query;
    const usuarios = await listarTodosLosUsuarios(sexo);
    res.json(usuarios);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

export const ListarTodosLosPerfilesDeUsuarios = async (req, res) => {
  try {
    const perfiles = await obtenerTodosLosPerfiles();
    res.json(perfiles);
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener los perfiles" });
  }
};

export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    const usuario = await obtenerUsuarioPorId(userId);
    res.json(usuario);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

export const eliminarUnUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    await eliminarUsuario(userId);
    res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ msg: error.message });
    }
  }
};

export const crearPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, edad } = req.body;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ msg: "ID de usuario inválido" });
    }

    const perfil = await crearPerfilDeUsuario(userId, { bio, edad });
    res.status(201).json(perfil);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const obtenerUnPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ msg: "ID de usuario inválido" });
    }

    const perfil = await obtenerPerfilDeUsuario(userId);
    res.json(perfil);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const obtenerTareasDeUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);
    const tareas = await listarTareasPorUsuario(userId);
    res.json(tareas);
  } catch (error) {
    next(error);
  }
};

export const crearNuevoUsuario = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }

    const user = await crearUsuario({ name, username, password });
    res.status(201).json(user);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username } = req.body;
    const userId = parseInt(id);

    if (name === undefined && username === undefined) {
      return res
        .status(400)
        .json({ msg: "debe cambiar al menos uno de los campos" });
    }

    const usuarioActualizado = await editarUsuario(userId, { name, username });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(404).json({ msg: "usuario no encontrado" });
  }
};
