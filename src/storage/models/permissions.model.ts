import mongoose, { Schema } from 'mongoose';
import { IPermission } from '../interfaces/permission.interface';

const PermissionSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true},
        groupName: { type: String, required: true, unique: false },
        description: { type: String, required: false },
        level: { type: Number, required: true }
    },
    {
        timestamps: false
    }
);

export default mongoose.model<IPermission>('Permission', PermissionSchema, 'permissions');
