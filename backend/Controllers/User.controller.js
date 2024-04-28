import User from "../Models/auth.model.js"           

export const showAllUsers = async(req,res) => {
    try {
        const Allusers = await User.find()
        res.status(200).json(Allusers)
    } catch (error) {
        res.status(500).json({message: "error al mostrar los usuarios",error})
    }

}

// Controlador para obtener los datos del usuario por su nombre de usuario
export const getSingleUser = async (req, res) => {
  try {
    const dataUser = req.params;
    
    const user = await User.findOne({ dataUser });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si se encuentra al usuario, devuelve sus datos
    res.status(200).json(user);
  } catch (error) {
    // Si ocurre algún error, devuelve un error 500
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const updateUser = async(req,res) => {
    const id = req.params.id
    try {
        await User.updateOne({_id:id},req.body)
        res.json({message: "Usuario actualizado correctamente"})
    } catch (error) {
        res.json( {message: error.message})  
    }
}

export const deleteUser = async(req,res) => {
    const id = req.params.id;
    try {
        await User.deleteOne({_id:id},req.body)
        res.status(204).json({message:"User Borrado Satisfactoriamente", id})
    } catch (error) {
        res.status(500).json({message:"no funciona", error})
    }
}