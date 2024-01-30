import { environment } from '../environments/environment';

export default class ApiUrls {
    constructor() {}
    static LOGIN = '/login';
    static GOOGLE_LOGIN = environment.baseUrl + 'auth/google/callback';
    static GOOGLE_LOGOUT = environment.baseUrl + 'logout';
    static GOOGLE_LOGIN_SUCCESS = '/login-success';
    static REGISTER = '/register';
    static FORGOT_PASSWORD = '/forgot-password';
    static VERIFY_OTP = '/verify-otp';
    static RESET_PASSWORD = '/reset-password';
    static CART_DETAILS = '/cart/getCartItems/{userId}';
    static ADD_ADDRESS = '/users/{userId}/addaddresses';
    static GET_ADDRESS = '/users/{userId}/addresses';
    static CART_SIMILAR_PRODUCTS = '/cart/similarProducts';
    static CART_UPDATE_PRODUCTS = '/cart/updateCartItem';
    static DELETE_ADDRESS = '/users/{userId}/addresses/{addressId}';
    static UPDATE_ADDRESS = '/users/{userId}/updateaddresses';
}
