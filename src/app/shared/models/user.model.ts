export class UserModel {
    constructor(
      public loginName: string,
      public userId: string,
      public compNameE: string,
      public compNameA: string,  
      public compRef: string,  
      public _token?: string,
      private _tokenExpirationDate?: Date
    ) {}
  
    get token() {
      if (!this._tokenExpirationDate || this._tokenExpirationDate <= new Date()) {
        return null;
      }
      return this._token;
    }
  
    get tokenDuration() {
      if (!this.token) {
        return 0;
      }
      // return 2000; for testing
      return this._tokenExpirationDate.getTime() - new Date().getTime();
    }
  }