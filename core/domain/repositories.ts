import type {
  Cart,
  Category,
  Product,
  ProductListResult,
  UserProfile,
} from "@/types/domain";

export interface ProductFilters {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  category?: string;
}

export interface ProductRepository {
  list(filters?: ProductFilters): Promise<ProductListResult>;
  byId(id: number): Promise<Product>;
  categories(): Promise<Category[]>;
  relatedByCategory(category: string, limit?: number): Promise<ProductListResult>;
}

export interface CartRepository {
  byUserId(userId: number): Promise<Cart[]>;
}

export interface UserRepository {
  byId(userId: number): Promise<UserProfile>;
}
