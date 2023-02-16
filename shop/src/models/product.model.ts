import mongoose from "mongoose";

interface ProductAttrs {
  title: string;
  price: number;
  userId: string;
}

interface ProductDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

export const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product as products };