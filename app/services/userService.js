import bcrypt from "bcryptjs";
const users = [];

export const registrar = async ({ username, password }) => {
    //const usuarioExistente = username.find((user) => user.username === username);
    const usuarioExistente = await prisma.User.findUnique({
        where: {username}
    })


    if (usuarioExistente) throw new Error("ya existe el usuario");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: username, username, password: hashedPassword };
    users.push(newUser);

    return { newUser };
}


export const login = async ({ username, password }) => {
    const user = users.find((u) => u.username === username);
    if(!user) throw new Error ("usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error ("Usuario y/o contrasena incorrectors");
    const token = jwt.sign ({username: user.username}, SECRET, {expiresIn:"1h",});

    return {user: {username: user.username}, token};

}