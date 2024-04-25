import User from "../Models/auth.model.js"           

export const showAllUsers = async(req,res) => {
    try {
        const Allusers = await User.find()
        res.status(200).json(Allusers)
    } catch (error) {
        res.status(500).json({message: "error al mostrar los usuarios",error})
    }

}

export const getOneUser = async(req, res) => {
    const {id}= req.params;
    try {
        const userAlone = await User.findById({_id:id})
        if (!userAlone) {
            return res.status(404).json({ message: "El usuario no fue encontrado" });
        }
        
        res.status(200).json({ user: userAlone});
    } catch (error) {
        res.status(500).json({message:"el id no existe", error})
    }
}

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