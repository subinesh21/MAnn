import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductState extends Document {
  productId: string;
  isHidden: boolean;
  isOutOfStock: boolean;
  isRemoved: boolean;
  customData?: {
    name?: string;
    price?: number;
    description?: string;
    [key: string]: any;
  };
  updatedAt: Date;
}

interface IProductStateModel extends Model<IProductState> {}

const ProductStateSchema = new Schema<IProductState>({
  productId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true
  },
  isHidden: { 
    type: Boolean, 
    default: false 
  },
  isOutOfStock: { 
    type: Boolean, 
    default: false 
  },
  isRemoved: { 
    type: Boolean, 
    default: false 
  },
  customData: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for efficient queries
ProductStateSchema.index({ isRemoved: 1, isHidden: 1 });

const ProductStateModel: IProductStateModel = 
  (mongoose.models.ProductState as IProductStateModel) || 
  mongoose.model<IProductState, IProductStateModel>('ProductState', ProductStateSchema);

export default ProductStateModel;
