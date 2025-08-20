export class User {
  username: string;
  birthdate: string;
  age: number;
  email: string;
  valid: boolean;

  constructor(
    username: string = '',
    birthdate: string = '',
    age: number = 0,
    email: string = '',
    valid: boolean = false
  ) {
    this.username = username;
    this.birthdate = birthdate;
    this.age = age;
    this.email = email;
    this.valid = valid;
  }
}