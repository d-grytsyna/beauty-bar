import { jwtDecode } from "jwt-decode";
interface User {
    refreshToken?: string;
    token?: string;
   
  }
  
  const getLocalRefreshToken = (): string | undefined => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.refreshToken;
  };
  
  const getLocalAccessToken = (): string | undefined => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.token;
  };
  
  const updateLocalAccessToken = (token: string): void => {
    let user: User = JSON.parse(localStorage.getItem("user") || "{}");
    user.token = token;
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  const getUser = (): User | null => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    return user;
  };
  
  const setUser = (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  const removeUser = (): void => {
    localStorage.removeItem("user");
  };
  const getUserRole = (): string | undefined => {
    const token = getLocalAccessToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); 
        return decodedToken?.iss;
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
    return undefined;
  };
  const getUserEmail = (): string | undefined => {
    const token = getLocalAccessToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken?.sub; 
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
    return undefined;
  };
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
    getUserRole,
    getUserEmail
  };
  
  export default TokenService;
  