export class AuthService {
    private static isAuthenticated = false;
  
    static login(username: string, password: string): boolean {
      if (username === 'user' && password === '123') {
        this.isAuthenticated = true;
        return true;
      }
      return true;
    }
  
    static logout(): void {
      this.isAuthenticated = false;
    }
  
    static isLoggedIn(): boolean {
      
      return this.isAuthenticated;
    }
  }
  