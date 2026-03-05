import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string | null;
}

export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
}

export interface IOrder extends Document {
  user: IUserInfo;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: IShippingAddress;
  paymentMethod: 'cod' | 'online' | 'razorpay' | 'stripe';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  // New fields for payment gateway
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  // Pricing breakdown
  subtotal?: number;
  deliveryCharges?: number;
  gstAmount?: number;
  discount?: number;
  // Delivery info
  pincode?: string;
  deliveryDays?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IOrderModel extends Model<IOrder> {
  // Static methods can be added here if needed
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  color: { type: String, default: null },
});

const ShippingAddressSchema = new Schema<IShippingAddress>({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true, default: 'India' },
  phone: { type: String, required: true },
});

const UserInfoSchema = new Schema<IUserInfo>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>({
  user: {
    type: UserInfoSchema,
    required: true,
  },
  items: {
    type: [OrderItemSchema],
    required: true,
    validate: {
      validator: function(items: IOrderItem[]) {
        return items.length > 0;
      },
      message: 'Order must contain at least one item',
    },
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  shippingAddress: {
    type: ShippingAddressSchema,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'online', 'razorpay', 'stripe'],
    default: 'cod',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  // Payment gateway fields
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  // Pricing breakdown
  subtotal: { type: Number },
  deliveryCharges: { type: Number },
  gstAmount: { type: Number },
  discount: { type: Number },
  // Delivery info
  pincode: { type: String },
  deliveryDays: { type: String },
}, {
  timestamps: true,
});

// Index for better query performance
OrderSchema.index({ 'user.id': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

const OrderModel: IOrderModel = (mongoose.models.Order as IOrderModel) || mongoose.model<IOrder, IOrderModel>('Order', OrderSchema);
export default OrderModel;
