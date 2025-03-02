import { Category } from "./category"
import { Brand } from "./product"

export interface Cart {
  cartId: string
  data: cartData
  numOfCartItems:number

}

export interface cartData {
  _id: string
  products: Product[]
  totalCartPrice: number
}

export interface Product {
  count: number
  _id: string
  product: ProductDeatils
  price: number
}

export interface ProductDeatils {
  subcategory: Subcategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}




