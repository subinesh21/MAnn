'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { uploadProductImage, uploadColorImages } from '@/lib/firebase-storage';

// Simple SVG Icons
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const InventoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 8.586V8a1 1 0 00-1-1h-1z" />
  </svg>
);

const VisibilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

const VisibilityOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const getColorCode = (colorName) => {
  const colors = {
    Azure: '#007FFF',
    Celeste: '#B2FFFF',
    Charcoal: '#36454F',
    Coffee: '#6F4E37',
    Coral: '#b31313ff',
    Fern: '#4F7942',
    'Sand Castle': '#D8C59F',
    Innocent: '#F5F5DC',
    Pink: '#FFC0CB',
    Blue: '#4169E1',
    Green: '#228B22',
    White: '#FFFFFF',
    Black: '#000000',
    Natural: '#A67B5B',
    Walnut: '#5C4033',
    Bamboo: '#906F5D',
    'Natural Wood': '#8B5A2B',
    Terracotta: '#E2725B',
    Multi: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
  };
  return colors[colorName] || '#CCCCCC';
};

export default function AdminProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showColorImages, setShowColorImages] = useState(false);
  const [colorImages, setColorImages] = useState({}); // { color: [img1, img2, img3] }
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    primaryImage: '',
    hoverImage: '',
    category: 'drinkware',
    colors: '',
    faqs: [], // FAQ array
    inStock: true,
    description: '',
    rating: 4.5,
    reviews: 0,
    isActive: true
  });

  // Fetch all products from MongoDB
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products || []);
      } else {
        toast.error('Failed to fetch products');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error loading products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e, fieldName, colorName = null) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
      let imageUrl;
      
      if (colorName) {
        // Handle color-specific image upload
        imageUrl = await uploadProductImage(file, 'temp', `color_${colorName}`);
        
        setColorImages(prev => {
          const currentImages = prev[colorName] || [];
          return {
            ...prev,
            [colorName]: [...currentImages, imageUrl].slice(0, 3) // Max 3 images per color
          };
        });
      } else {
        // Handle regular field image upload
        const productId = expandedProduct === 'new' ? 'new_product' : expandedProduct;
        imageUrl = await uploadProductImage(file, productId, fieldName);
        
        setFormData(prev => ({
          ...prev,
          [fieldName]: imageUrl
        }));
      }
      
      toast.success(`${colorName ? `${colorName} image` : fieldName} uploaded successfully to Firebase!`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload ${colorName ? `${colorName} image` : fieldName}: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const isUpdate = expandedProduct && expandedProduct !== 'new';
      const url = isUpdate ? `/api/admin/products/${expandedProduct}` : '/api/admin/products';
      const method = isUpdate ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
          colors: formData.colors.split(',').map(color => color.trim()),
          rating: parseFloat(formData.rating),
          reviews: parseInt(formData.reviews),
          images: colorImages,
          faqs: formData.faqs.filter(faq => faq.question && faq.answer) // Filter out empty FAQs
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success(isUpdate ? 'Product updated successfully' : 'Product created successfully');
        setExpandedProduct(null);
        setIsAddingNew(false);
        resetForm();
        fetchProducts();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setExpandedProduct(product._id);
    setIsAddingNew(false);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      primaryImage: product.primaryImage,
      hoverImage: product.hoverImage || '',
      category: product.category,
      colors: product.colors.join(', '),
      faqs: product.faqs || [],
      inStock: product.inStock,
      description: product.description,
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
      isActive: product.isActive
    });
    setColorImages(product.images || {});
  };

  const handleAddNew = () => {
    setExpandedProduct('new');
    setIsAddingNew(true);
    resetForm();
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleToggleStock = async (product) => {
    try {
      const newStockStatus = !product.inStock;
      
      // Update full product in MongoDB
      const response = await fetch(`/api/admin/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: newStockStatus })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(`Product marked as ${newStockStatus ? 'in stock' : 'out of stock'}`);
        fetchProducts();
      } else {
        toast.error(data.message || 'Failed to update stock status');
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock status');
    }
  };

  const handleToggleVisibility = async (product) => {
    try {
      const newVisibility = !product.isActive;
      
      // Update full product in MongoDB
      const response = await fetch(`/api/admin/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newVisibility })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(`Product ${newVisibility ? 'published' : 'hidden'}`);
        fetchProducts();
      } else {
        toast.error(data.message || 'Failed to update visibility');
      }
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast.error('Failed to update visibility');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      primaryImage: '',
      hoverImage: '',
      category: 'drinkware',
      colors: '',
      faqs: [],
      inStock: true,
      description: '',
      rating: 4.5,
      reviews: 0,
      isActive: true
    });
    setColorImages({});
    setShowColorImages(false);
  };

  // FAQ Management Functions
  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const removeFAQ = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const updateFAQ = (index, field, value) => {
    setFormData(prev => {
      const newFaqs = [...prev.faqs];
      newFaqs[index] = { ...newFaqs[index], [field]: value };
      return { ...prev, faqs: newFaqs };
    });
  };

  const cancelForm = () => {
    setExpandedProduct(null);
    setIsAddingNew(false);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleAddNew}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <AddIcon />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Product Form */}
      {(expandedProduct === 'new' || expandedProduct) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {isAddingNew ? 'Add New Product' : 'Edit Product'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Image *</label>
              <div className="flex items-start space-x-3">
                <input
                  type="text"
                  name="primaryImage"
                  value={formData.primaryImage}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Enter image URL or upload below"
                />
                <div className="flex flex-col space-y-2">
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm cursor-pointer transition-colors">
                    {uploading ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'primaryImage')}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
              {formData.primaryImage && (
                <div className="mt-2">
                  <img 
                    src={formData.primaryImage} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hover Image</label>
              <div className="flex items-start space-x-3">
                <input
                  type="text"
                  name="hoverImage"
                  value={formData.hoverImage}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter image URL or upload below"
                />
                <div className="flex flex-col space-y-2">
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm cursor-pointer transition-colors">
                    {uploading ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'hoverImage')}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
              {formData.hoverImage && (
                <div className="mt-2">
                  <img 
                    src={formData.hoverImage} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="drinkware">Drinkware</option>
                <option value="tableware">Tableware</option>
                <option value="storage">Storage</option>
                <option value="kitchenware">Kitchenware</option>
                <option value="homeware">Homeware</option>
                <option value="bakeware">Bakeware</option>
                <option value="gardenware">Gardenware</option>
                <option value="gifting">Gifting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-3">
                {[
                  'Azure', 'Celeste', 'Charcoal', 'Coffee', 'Coral', 'Fern', 
                  'Sand Castle', 'Innocent', 'Pink', 'Blue', 'Green', 'White',
                  'Black', 'Natural', 'Walnut', 'Bamboo', 'Natural Wood', 
                  'Terracotta', 'Multi'
                ].map((color) => (
                  <label key={color} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.colors.split(',').map(c => c.trim()).includes(color)}
                      onChange={(e) => {
                        const currentColors = formData.colors.split(',').map(c => c.trim()).filter(c => c);
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            colors: [...currentColors, color].join(', ')
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            colors: currentColors.filter(c => c !== color).join(', ')
                          }));
                        }
                      }}
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm">{color}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder="Selected colors will appear here"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                step="0.1"
                min="0"
                max="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reviews</label>
              <input
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                min="0"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* FAQ Section */}
            <div className="md:col-span-2">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Product FAQs</h3>
                  <button
                    type="button"
                    onClick={addFAQ}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Add FAQ
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-4 relative">
                      <button
                        type="button"
                        onClick={() => removeFAQ(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Question *
                          </label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter frequently asked question"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Answer *
                          </label>
                          <textarea
                            value={faq.answer}
                            onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter detailed answer"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {formData.faqs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No FAQs added yet. Click "Add FAQ" to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Color Images Section */}
            {formData.colors && formData.colors.trim() && (
              <div className="md:col-span-2">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Color Images</h3>
                    <button
                      type="button"
                      onClick={() => setShowColorImages(!showColorImages)}
                      className="text-green-600 hover:text-green-800 font-medium"
                    >
                      {showColorImages ? 'Hide' : 'Show'} Color Image Upload
                    </button>
                  </div>
                  
                  {showColorImages && (
                    <div className="space-y-6">
                      {formData.colors.split(',').map(color => color.trim()).filter(color => color).map((color) => (
                        <div key={color} className="border border-gray-100 rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: getColorCode(color) }}
                            />
                            {color} Images (Max 3)
                          </h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex items-start space-x-2">
                                  <input
                                    type="text"
                                    value={colorImages[color] && colorImages[color][index] ? colorImages[color][index] : ''}
                                    onChange={(e) => {
                                      const newValue = e.target.value;
                                      setColorImages(prev => {
                                        const currentImages = prev[color] || [];
                                        const newImages = [...currentImages];
                                        newImages[index] = newValue;
                                        return {
                                          ...prev,
                                          [color]: newImages.filter(img => img)
                                        };
                                      });
                                    }}
                                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                                    placeholder={`Image ${index + 1} URL`}
                                  />
                                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs cursor-pointer transition-colors whitespace-nowrap">
                                    Upload
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleImageUpload(e, null, color)}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                                {colorImages[color] && colorImages[color][index] && (
                                  <div className="relative">
                                    <img 
                                      src={colorImages[color][index]} 
                                      alt={`${color} image ${index + 1}`}
                                      className="w-full h-20 object-cover rounded border"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setColorImages(prev => ({
                                          ...prev,
                                          [color]: prev[color].filter((_, i) => i !== index)
                                        }));
                                      }}
                                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                      ×
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {colorImages[color] && colorImages[color].length > 0 && (
                            <div className="text-sm text-gray-600">
                              Uploaded {colorImages[color].length} of 3 images
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active/Published</span>
              </label>
            </div>

            <div className="md:col-span-2 flex space-x-4 pt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  isAddingNew ? 'Create Product' : 'Update Product'
                )}
              </button>
              
              <button
                type="button"
                onClick={cancelForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Products ({products.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={product.primaryImage} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{product.price}
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.isActive 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.isActive ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex flex-col items-end space-y-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors"
                        title="Edit Product"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`p-2 ${
                          product.inStock 
                            ? 'text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50' 
                            : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                        } rounded-full transition-colors`}
                        title={product.inStock ? 'Mark as Out of Stock' : 'Mark as In Stock'}
                      >
                        <InventoryIcon />
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(product)}
                        className={`p-2 ${
                          product.isActive 
                            ? 'text-blue-600 hover:text-blue-900 hover:bg-blue-50' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        } rounded-full transition-colors`}
                        title={product.isActive ? 'Hide Product' : 'Show Product'}
                      >
                        {product.isActive ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Product"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}