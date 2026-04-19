import axios from 'axios';
import { Product, CreateProductDto, UpdateProductDto } from '../types/product';

const baseURL = 'https://dummyjson.com/products';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
});

// Mapping DummyJSON response to our Product interface
const mapProduct = (p: any): Product => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  category: p.category,
  image: p.thumbnail || (p.images && p.images[0]) || '',
  rating: {
    rate: p.rating || 0,
    count: p.stock || 0
  }
});

export class FakeStoreAdapter {
  /**
   * Fetches all products from External API
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axiosInstance.get<{ products: any[] }>('/');
      return response.data.products.map(mapProduct);
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
      const response = await axiosInstance.get<any>(`/${id}`);
      return mapProduct(response.data);
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
      // Map outgoing field 'image' to 'thumbnail' for DummyJSON if needed, 
      // but DummyJSON 'add' returns exactly what you send + id
      const response = await axiosInstance.post<any>('/add', {
        ...productData,
        thumbnail: productData.image
      });
      return mapProduct(response.data);
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
      const response = await axiosInstance.put<any>(`/${id}`, {
        ...productData,
        thumbnail: productData.image
      });
      return mapProduct(response.data);
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
      const response = await axiosInstance.delete<any>(`/${id}`);
      return mapProduct(response.data);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }
}
