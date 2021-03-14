export class UserInfoModel {
    constructor(
      public userEmail: string,
      public id: number,
      public userDefaultRole: string,
      public fullNameA: string,
      public fullNameE: string,    
      public token: string
    ) {}
  }