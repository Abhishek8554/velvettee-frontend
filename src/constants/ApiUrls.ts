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
}
