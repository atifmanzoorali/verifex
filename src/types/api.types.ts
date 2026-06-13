export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  message: string;
  code: string;
};

export type ApiFailure = {
  success: false;
  error: ApiError;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
