export default interface AccountModel {
    id?: number,
    email: string,
    password: string,
    tel: string,
    name: string,
    surname: string,
    roles?: string 
  }