import { Request, Response, NextFunction } from 'express';
import { FakeStoreAdapter } from '../FakeStoreAdapter/fake.store.adapter';

// @desc    Get all external products
// @route   GET /api/external-products
// @access  Public
export const getExternalProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await FakeStoreAdapter.getAllProducts();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single external product
// @route   GET /api/external-products/:id
// @access  Public
export const getExternalProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid product ID' });
      return;
    }
    const product = await FakeStoreAdapter.getProductById(id);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new external product
// @route   POST /api/external-products
// @access  Public
export const createExternalProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await FakeStoreAdapter.addProduct(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update external product
// @route   PUT /api/external-products/:id
// @access  Public
export const updateExternalProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid product ID' });
      return;
    }
    const product = await FakeStoreAdapter.updateProduct(id, req.body);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete external product
// @route   DELETE /api/external-products/:id
// @access  Public
export const deleteExternalProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid product ID' });
      return;
    }
    const product = await FakeStoreAdapter.deleteProduct(id);
    res.status(200).json({
      success: true,
      data: product,
      message: 'Product deleted from external store'
    });
  } catch (error) {
    next(error);
  }
};
