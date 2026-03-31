
export interface Role {
  id: string;
  nom: string;
  description: string;
  privileges: string[];
  createdAt: string; // ou Date
  isChecked?: boolean; // Peut-être optionnel
  setFieldValue?: any; // À vérifier si cela fait vraiment partie du modèle
}
export interface RoleObject {
    code: number;
    message: string;
    data: RoleData[];
  }
export interface RoleData {
    id: number;
    nom: string;
    description: string;
    createdAt?: string;
    rolePermissions?: RolePermission[];
    users?:UserRole[];
  }

  export interface RolePermission {
    permissionId: number;
    permission: Permission;
  }

 export interface Permission {
    id:number,
    nom: string;
    description: string;
  }



export interface UserRole {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    sexe: string;
    email: string;
    createdAt: string;
  }

 