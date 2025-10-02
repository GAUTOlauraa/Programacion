
export const registrarUsuario = async (req, res) => {
    try {
        const user = await registrar(req.body);
        res.status(201).json({ msg: "usuario registrado correctamente", user });

    } catch (error) {
        res.status(400).json({ msg: error.message });

    }

}

export const loguearUsuario = async (req, res) => {
    try {
        const { user, token } = await login(req.body);
        res.json({ token, user })

    } catch (error) {
        res.status(400).json({ msg: error.message });

    }

}