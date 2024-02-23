import decode from 'jwt-decode';

class Auth {
  getUser() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();  // Checks if there is a saved token and if it's still valid
    return !!token && !this.isTokenExpired(token); // !!token: This checks if a token exists. !this.isTokenExpired(token): This checks if the token is not expired 
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      decoded.exp < Date.now() / 1000 ? true : false; // This checks if the token is expired
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    // This will redirects the user to the homepage
    window.location.assign('/'); 
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // This will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new Auth();