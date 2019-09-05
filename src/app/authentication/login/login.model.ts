export class Login {
  _token: string;
  _id: string;
  name: string;

  constructor(user) {
    this._token = user.token;
    this._id = user.user._id;
    this.name = user.user.name;
  }
}
