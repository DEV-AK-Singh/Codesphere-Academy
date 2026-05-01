import axiosInstance from '../config/axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  profileImage?: string;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
    
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await axiosInstance.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }

  async getProfile(): Promise<User> {
    const response = await axiosInstance.get<{ user: User }>('/auth/profile');
    return response.data.user;
  }

  async updateProfileImage(file: File): Promise<{ user: User; file: any }> {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await axiosInstance.post('/files/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}

export default new AuthService();