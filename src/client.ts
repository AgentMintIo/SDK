import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config, ErrorResponse } from './types';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * SafeQuery API Client
 * Handles API requests to the SafeQuery service
 */
export class SafeQueryClient {
  private client: AxiosInstance;
  private baseUrl: string;
  private timeout: number;

  /**
   * Create a new SafeQuery client
   * @param config Optional configuration
   */
  constructor(config?: Config) {
    // Default base URL for the API from environment variable or fallback
    this.baseUrl = config?.baseUrl || process.env.API_URL || 'https://agent-mint-api';
    
    // Default timeout in milliseconds
    this.timeout = config?.timeout || 30000;

    // Create axios instance with default configuration
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: unknown) => this.handleApiError(error)
    );
  }

  /**
   * Make a GET request to the API
   * @param endpoint API endpoint
   * @param params Query parameters
   * @returns Promise with the response data
   */
  async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const config: AxiosRequestConfig = {
      params
    };

    try {
      const response = await this.client.get<T>(endpoint, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Handle API errors
   * @param error Error from axios
   * @returns Standardized error
   */
  private handleApiError(error: unknown): never {
    let errorMessage = 'An unknown error occurred';
    let errorDetails: string | undefined;

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorResponse = error.response.data as ErrorResponse;
        errorMessage = errorResponse.error || `API Error: ${error.response.status}`;
        errorDetails = errorResponse.details;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    const enhancedError = new Error(errorMessage) as Error & { details?: string, status?: number };
    
    if (errorDetails) {
      enhancedError.details = errorDetails;
    }
    
    if (axios.isAxiosError(error) && error.response) {
      enhancedError.status = error.response.status;
    }

    throw enhancedError;
  }
} 