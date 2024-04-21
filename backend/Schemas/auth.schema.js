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
            prefix: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true,
                unique: true
            },
            // Opcional: puedes añadir campos adicionales como tipo de teléfono (móvil, fijo), etc.
        }
    },


    { timestamps: true }
)

export default userSchema
