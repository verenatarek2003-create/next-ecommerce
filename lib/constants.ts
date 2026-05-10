export const ROUTES = {
  home: "/",
  products: "/products",
  cart: "/cart",
  wishlist: "/wishlist",
  profile: "/profile",
  login: "/login",
  register: "/register",
} as const;

export const PROTECTED_ROUTES = ["/profile", "/orders", "/settings"];
