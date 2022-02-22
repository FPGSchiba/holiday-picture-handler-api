import mongoose, { Schema } from 'mongoose';
import { IRole } from '../interfaces/role.interface';

const RoleSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: false },
        roles: [{type: String, required: true }],
    },
    {
        timestamps: false
    }
);

export default mongoose.model<IRole>('Role', RoleSchema, 'roles');
