export default interface User {
  id?: string;
  adressId?: string;
  location: string;
  email: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  penalties: number;
  role: string;
  phoneNumber: string;
}
