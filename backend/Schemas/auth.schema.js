import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        uname: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
          },
        profileImage: {
            type: String,  // Guardará la URL de la imagen
            default: 'default-image-url.jpg'  // Puedes definir una imagen por defecto
        },
        phoneNumber: {
                type: String,
                unique: true
            },
        
    },


    { timestamps: true }
)

export default userSchema
