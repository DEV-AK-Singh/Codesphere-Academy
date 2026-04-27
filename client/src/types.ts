export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'enrolled';
}

export interface User {
  email: string;
  isAdmin: boolean;
}
