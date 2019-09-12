export class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;

  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
  }
}
