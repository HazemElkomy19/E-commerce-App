export interface AuthUser {
  name: string,
  email:string,
  password:string,
  rePassword:string,
  phone:string
}

export interface LoginUser {
  email:string,
  password:string
}

export interface resetUser {
  email:string,
  newPassword:string
}

