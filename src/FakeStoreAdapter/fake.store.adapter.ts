import axios from 'axios';
import { Product, CreateProductDto, UpdateProductDto } from '../types/product';

const baseURL = 'https://fakestoreapi.com/products';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

export class FakeStoreAdapter {
  /**
   * Fetches all products from FakeStoreAPI
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axiosInstance.get<Product[]>('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Fetches a single product by ID
   * @param id The product ID
   */
  static async getProductById(id: number): Promise<Product> {
    try {
      const response = await axiosInstance.get<Product>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Adds a new product
   * @param productData The product details
   */
  static async addProduct(productData: CreateProductDto): Promise<Product> {
    try {
      const response = await axiosInstance.post<Product>('/', productData);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  /**
   * Updates an existing product
   * @param id The product ID
   * @param productData The updated details
   */
  static async updateProduct(id: number, productData: UpdateProductDto): Promise<Product> {
    try {
      const response = await axiosInstance.put<Product>(`/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a product
   * @param id The product ID
   */
  static async deleteProduct(id: number): Promise<Product> {
    try {
      const response = await axiosInstance.delete<Product>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }
}
