// Admin Products Page - Manage Hardcoded Products
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Eye, EyeOff, Trash2, AlertTriangle, CheckCircle, 
  Search, Filter, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { PRODUCTS } from '@/lib/product-data';
import { toast } from 'react-toastify';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [productStates, setProductStates] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch product states from MongoDB
  useEffect(() => {
    fetchProductStates();
  }, []);

  const fetchProductStates = async () => {
    try {
      const response = await fetch('/api/admin/product-state');
      const data = await response.json();
      
      if (data.success) {
        const statesMap = {};
        data.productStates.forEach(state => {
          statesMap[state.productId] = state;
        });
        setProductStates(statesMap);
      }
    } catch (error) {
      console.error('Error fetching product states:', error);
    } finally {
      setLoading(false);
    }
  };

  // Merge hardcoded products with their states
  useEffect(() => {
    const mergedProducts = PRODUCTS.map(product => {
      const state = productStates[product._id] || {};
      return {
        ...product,
        isHidden: state.isHidden || false,
        isOutOfStock: state.isOutOfStock || false,
        isRemoved: state.isRemoved || false,
      };
    });
    
    setProducts(mergedProducts);
  }, [productStates]);

  // Update product state
  const updateProductState = async (productId, updates) => {
    try {
      const response = await fetch('/api/admin/product-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, ...updates })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProductStates(prev => ({
          ...prev,
          [productId]: { ...prev[productId], ...updates }
        }));
        
        const action = updates.isRemoved ? 'removed' : 
                      updates.isHidden ? 'hidden' : 
                      updates.isOutOfStock ? 'marked out of stock' :
                      'restored';
        
        toast.success(`Product ${action} successfully`);
      }
    } catch (error) {
      console.error('Error updating product state:', error);
      toast.error('Failed to update product state');
    }
  };

  // Action handlers
  const handleToggleVisibility = (productId, currentStatus) => {
    updateProductState(productId, { isHidden: !currentStatus });
  };

  const handleToggleStock = (productId, currentStatus) => {
    updateProductState(productId, { isOutOfStock: !currentStatus });
  };

  const handleRemove = (productId) => {
    if (confirm('Are you sure you want to remove this product? This action can be undone.')) {
      updateProductState(productId, { isRemoved: true });
    }
  };

  const handleRestore = (productId) => {
    updateProductState(productId, { 
      isHidden: false, 
      isOutOfStock: false, 
      isRemoved: false 
    });
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product._id.toString().includes(searchTerm);
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    let matchesStatus = true;
    if (filterStatus === 'active') {
      matchesStatus = !product.isHidden && !product.isOutOfStock && !product.isRemoved;
    } else if (filterStatus === 'hidden') {
      matchesStatus = product.isHidden;
    } else if (filterStatus === 'outOfStock') {
      matchesStatus = product.isOutOfStock;
    } else if (filterStatus === 'removed') {
      matchesStatus = product.isRemoved;
    }
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Get unique categories
  const categories = [...new Set(PRODUCTS.map(p => p.category))];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
            <p className="text-gray-600 mt-1">
              Manage {PRODUCTS.length} products from catalog
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{PRODUCTS.length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="removed">Removed</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{product._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={product.primaryImage}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.colors?.length || 0} colors
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{product.price}
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        {product.isRemoved ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Removed
                          </span>
                        ) : product.isOutOfStock ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Out of Stock
                          </span>
                        ) : product.isHidden ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Hidden
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {product.isRemoved ? (
                          <button
                            onClick={() => handleRestore(product._id)}
                            className="text-green-600 hover:text-green-900 flex items-center"
                            title="Restore product"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleToggleVisibility(product._id, product.isHidden)}
                              className={`${
                                product.isHidden 
                                  ? 'text-blue-600 hover:text-blue-900' 
                                  : 'text-gray-600 hover:text-gray-900'
                              } flex items-center`}
                              title={product.isHidden ? 'Show product' : 'Hide product'}
                            >
                              {product.isHidden ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                            
                            <button
                              onClick={() => handleToggleStock(product._id, product.isOutOfStock)}
                              className={`${
                                product.isOutOfStock 
                                  ? 'text-green-600 hover:text-green-900' 
                                  : 'text-yellow-600 hover:text-yellow-900'
                              } flex items-center`}
                              title={product.isOutOfStock ? 'Mark in stock' : 'Mark out of stock'}
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={() => handleRemove(product._id)}
                              className="text-red-600 hover:text-red-900 flex items-center"
                              title="Remove product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of{' '}
                  {filteredProducts.length} products
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Total Products</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{PRODUCTS.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Active</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {products.filter(p => !p.isHidden && !p.isOutOfStock && !p.isRemoved).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Out of Stock</div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {products.filter(p => p.isOutOfStock).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Hidden</div>
            <div className="text-2xl font-bold text-gray-600 mt-1">
              {products.filter(p => p.isHidden && !p.isRemoved).length}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}