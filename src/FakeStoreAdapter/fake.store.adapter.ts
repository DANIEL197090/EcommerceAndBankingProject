import axios from 'axios';
import { Product, CreateProductDto, UpdateProductDto } from '../types/product';

const baseURL = 'https://fakestoreapi.com/products';

export class FakeStoreAdapter {
  /**
   * Fetches all products from FakeStoreAPI
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(baseURL);
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
      const response = await axios.get<Product>(`${baseURL}/${id}`);
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
      const response = await axios.post<Product>(baseURL, productData);
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
      const response = await axios.put<Product>(`${baseURL}/${id}`, productData);
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
      const response = await axios.delete<Product>(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }
}
