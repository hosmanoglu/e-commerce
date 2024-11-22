import axios, { AxiosInstance } from 'axios';
import { IncomingHttpHeaders } from 'http';

class ApiService {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get<T>(url: string, headers: IncomingHttpHeaders): Promise<T> {
    try {
      const response = await this.client.get<T>(url, { headers });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<T>(url: string, data: any, headers: IncomingHttpHeaders): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, { headers:{authorization:headers.authorization } });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      return new Error(`Server Error: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      return new Error('Network Error');
    } else {
      return new Error(error.message);
    }
  }
}

export default ApiService;
