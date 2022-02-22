import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId
    username: string
    password: string
    fullName: string
    roles: string[]
    email: string
}