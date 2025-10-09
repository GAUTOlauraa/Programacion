import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SECRET from "../constants/constants.js";
import prisma from "../prisma.js";

//register
export const registrar = async ({ name, username, sexo, password }) => {
  const usuariosExistente = await prisma.user.findUnique({
    where: { username },
  });

  if (usuariosExistente) {
    throw new Error("El usuario ya existe");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username,
      name,
      sexo,
      password: hashedPassword,
    },
  });

  return {
    username: newUser.username,
    name: newUser.name,
  };
};

//login
export const loguear = async ({ username, password }) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("usuario no encontrado");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("usuario y/o contraseña incorrectos");
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: "1h",
  });
  return {
    user: {
      id: user.id,
      username: user.username,
    },
    token,
  };
};

export const crearUsuario = async ({ name, username, sexo, password }) => {
  const usuarioOcupado = await prisma.user.findUnique({
    where: { username: username, sexo, password },
  });

  if (usuarioOcupado) {
    throw new Error("nombre de usuario ocupado");
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      username,
      sexo,
      password,
    },
    select: {
      id: true,
      username: true,
      name: true,
      sexo: true
    },
  });
  return newUser;
};

//listar todos
export const listarTodosLosUsuarios = async (sexo) => {

  const userMany = await prisma.user.findMany({
    where: { sexo },
    select: {
      id: true,
      username: true,
      password: true,
      sexo: true,
    },
  });
  if (!userMany) {
    throw new Error("no hay usuarios");
  }
  return userMany;
};

export const buscarPorSexo = async () => {
  const encontrarUsuario = await prisma.user.findMany({
    where: { sexo: "" },
  });
};

//listar uno
export const obtenerUsuarioPorId = async (userId) => {
  const id = parseInt(userId);

  if (isNaN(id)) {
    throw new Error("id de usuario invalido");
  }
  const userById = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      name: true,
    },
  });
  if (!userById) {
    throw new Error("usuario no encontrado");
  }
  return userById;
};

//editar nombre y nombre de usuario
export const editarUsuario = async (userId, { name, username }) => {
  const id = parseInt(userId);

  if (isNaN(id)) {
    throw new Error("id de usuario invalido");
  }


  const userUpdate = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name !== undefined && { name }),
      ...(username !== undefined && { username }),
    },
    select: {
      id: true,
      username: true,
      name: true,
    },
  });
  return userUpdate;
};

//eliminar usuario
export const eliminarUsuario = async (userId) => {
  const id = parseInt(userId);

  if (isNaN(id)) {
    throw new Error("id de usuario invalido");
  }
  const usuarioExistente = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!usuarioExistente) {
    throw new Error("Usuario no encontrado");
  }
  const usuarioEliminado = await prisma.user.delete({
    where: { id: userId },
  });

  return usuarioEliminado;
};

export const obtenerPerfilDeUsuario = async (userId) => {
  const id = parseInt(userId);

  if (isNaN(id)) {
    throw new Error("id de usuario invalido");
  }
  const perfil = await prisma.perfil.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
      bio: true,
      edad: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });
  if (!perfil) throw new Error("Perfil no encontrado");
  return perfil;
};

export const obtenerTodosLosPerfiles = async () => {
  const perfiles = await prisma.perfil.findMany({
    select: {
      id: true,
      bio: true,
      edad: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });
  return perfiles;
};

export const crearPerfilDeUsuario = async (userId, { bio, edad }) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new Error("usuario no encontrado");

  const perfilExistente = await prisma.perfil.findUnique({
    where: {
      userId,
    },
  });
  if (perfilExistente) throw new Error("el usuario ya tiene un perfil");

  const perfil = await prisma.perfil.create({
    data: {
      bio,
      edad,
      userId,
    },
    select: {
      id: true,
      bio: true,
      edad: true,
    },
  });
  return perfil;
};
