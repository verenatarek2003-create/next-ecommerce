export interface PaginatedResponse<T> {
  [K: string]: T[] | number;
  total: number;
  skip: number;
  limit: number;
}

export type ApiError = {
  message: string;
  status?: number;
};

export interface AuthLoginPayload {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserResponse extends AuthTokens {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}
