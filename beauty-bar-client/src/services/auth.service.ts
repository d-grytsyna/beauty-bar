import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(email: string, password: string) {
    return api
      .post("/auth/signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
    window.location.reload();
  }

  register(email: string, password: string,
    tel:string, name: string, surname: string) {
    return api.post("/auth/signup", {
      email,
      password,
      tel,
      name,
      surname
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}
const authService = new AuthService();
export default authService;