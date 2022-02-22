import { IUser } from "./interfaces/user.interface";
import MRoles from './models/roles.model';
import MPermission from './models/permissions.model';

export function userHasPermission(user: IUser, searchPermission: string) {
    user.roles.map((roleName: string) => {
        MRoles.findOne({name: roleName}).then((result) => {
            if (result) {
                result.permissions.map((permissionName) => {
                    MPermission.find({ groupName: permissionName }).then((result) => {
                        result.map((permission) => {
                            if (searchPermission === permission.name) {
                                return true;
                            }
                        })
                    })
                });
            }
        });
    });

    return false;
}