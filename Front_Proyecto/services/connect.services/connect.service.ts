import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
});

// Añade el token de autenticación a cada petición de forma automática
instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

@Injectable({
  providedIn: 'root',
})
export class ConnectService {

  private saveToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Inicia sesión y guarda el token si las credenciales son correctas
  async getPostDirect(login: any): Promise<any> {
    try {
      const response: AxiosResponse = await instance.post('login', login);
      const token = response.data.token;
      if (token) {
        this.saveToken(token);
        return response.data;
      }
      return undefined;
    } catch {
      return undefined;
    }
  }

  // Registra un nuevo usuario
  async register(user: any): Promise<any> {
    try {
      const response: AxiosResponse = await instance.post('register', user);
      return response.data;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return undefined;
    }
  }

  // Comprueba si el email existe y solicita el envío del código de verificación
  async getEmail(verifyEmail: any): Promise<any> {
    try {
      const response: AxiosResponse = await instance.post('get-email', verifyEmail);
      return response.data;
    } catch (error) {
      console.error('Error al verificar el email:', error);
      return undefined;
    }
  }

  // Comprueba si el código de verificación es correcto
  async getCode(checkCode: any): Promise<any> {
    try {
      const response: AxiosResponse = await instance.post('code-check', checkCode);
      return response.data;
    } catch (error) {
      console.error('Error al verificar el código:', error);
      return undefined;
    }
  }

  // Actualiza la contraseña del usuario
  async resetPassword(resetPassword: any): Promise<any> {
    try {
      const response: AxiosResponse = await instance.post('reset-password', resetPassword);
      return response.data;
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      return undefined;
    }
  }

  // Obtiene todas las entradas del blog
  async getBlogs(): Promise<any> {
    try {
      const response: AxiosResponse = await instance.get('blog');
      return response.data;
    } catch (error) {
      console.error('Error al obtener el blog:', error);
      return undefined;
    }
  }

  // Obtiene el detalle de una entrada del blog por su ID
  async getBlogDetail(id: string): Promise<any> {
    try {
      const response: AxiosResponse = await instance.get(`blog/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la entrada del blog:', error);
      return undefined;
    }
  }

  // Crea una nueva entrada en el blog
  async newBlogEntry(blog: any): Promise<any> {
    try {
      const response: AxiosResponse = await instance.post('blog', blog);
      return response.data;
    } catch (error) {
      console.error('Error al crear la entrada del blog:', error);
      return undefined;
    }
  }
}
