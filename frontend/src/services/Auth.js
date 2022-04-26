class Auth {

    static setToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
    }
      
    static getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    
    static hasToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken ? true : false;
    }
}

module.exports = Auth;