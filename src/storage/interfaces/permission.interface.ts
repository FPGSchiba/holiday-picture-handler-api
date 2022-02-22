import { Types } from "mongoose";

export interface IPermission {
    _id: Types.ObjectId
    name: string            // The Name used in ARIA to distinguish the different permissions
    groupName: string
    description: string     
    level: number           // The Level of Access to this permission: 0: None, 1: Read, 2: Write
}