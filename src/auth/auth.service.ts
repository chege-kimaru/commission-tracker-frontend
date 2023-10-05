import { http } from "../api/http";
import { User } from "../models/user.model";

export class AuthService {
    static async getUser(): Promise<User> {
        return http.get("/auth/profile");
    }

    static async login(): Promise<void> {
        window.location.href =  `${process.env.REACT_APP_API_URL}/auth/google`;
    }
}