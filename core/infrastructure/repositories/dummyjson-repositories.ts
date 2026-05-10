import type {
  Cart,
  Category,
  Product,
  ProductListResult,
  UserProfile,
} from "@/types/domain";
import type {
  CartRepository,
  ProductFilters,
  ProductRepository,
  UserRepository,
} from "@/core/domain/repositories";
import { axiosClient } from "@/core/infrastructure/http/axios-client";

const buildProductPath = (filters?: ProductFilters) => {
  if (filters?.category) {
    return `/products/category/${encodeURIComponent(filters.category)}`;
  }
  if (filters?.search) {
    return "/products/search";
  }
  return "/products";
};

const buildProductParams = (filters?: ProductFilters) => ({
  q: filters?.search || undefined,
  limit: filters?.limit ?? 12,
  skip: filters?.skip ?? 0,
  sortBy: filters?.sortBy || undefined,
  order: filters?.order || undefined,
});

export class DummyJsonProductRepository implements ProductRepository {
  async list(filters?: ProductFilters): Promise<ProductListResult> {
    const path = buildProductPath(filters);
    const { data } = await axiosClient.get<ProductListResult>(path, {
      params: buildProductParams(filters),
    });
    return data;
  }

  async byId(id: number): Promise<Product> {
    const { data } = await axiosClient.get<Product>(`/products/${id}`);
    return data;
  }

  async categories(): Promise<Category[]> {
    const { data } = await axiosClient.get<Category[]>("/products/categories");
    return data;
  }

  async relatedByCategory(
    category: string,
    limit = 4,
  ): Promise<ProductListResult> {
    const { data } = await axiosClient.get<ProductListResult>(
      `/products/category/${encodeURIComponent(category)}`,
      { params: { limit, skip: 0 } },
    );
    return data;
  }
}

export class DummyJsonCartRepository implements CartRepository {
  async byUserId(userId: number): Promise<Cart[]> {
    const { data } = await axiosClient.get<{ carts: Cart[] }>(
      `/carts/user/${userId}`,
    );
    return data.carts;
  }
}

export class DummyJsonUserRepository implements UserRepository {
  async byId(userId: number): Promise<UserProfile> {
    const { data } = await axiosClient.get<UserProfile>(`/users/${userId}`);
    return data;
  }
}
