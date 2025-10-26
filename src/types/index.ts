export interface User {
  userId: string;
  name: string;
  email: string;
  role?: string | null;
  phone?: number | null;
}
