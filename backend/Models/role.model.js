import { Schema, model } from 'mongoose';

export const ROLES = ["user", "admin"];

const roleSchema = new Schema(
    {
        name: {
            type: String,
            default: "user" // Establece "user" como valor predeterminado
        }
    },
    {
        versionKey: false,
    }
);

export default model('Roles', roleSchema);
