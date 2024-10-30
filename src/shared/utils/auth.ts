import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_REACT_SECRET_KEY || '';
export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const saveRememberMe = (email: string, password: string) => {
  const encryptedPassword = encryptData(password);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("encryptedPassword", encryptedPassword);
  sessionStorage.setItem("rememberMe", "true");
};

export const handleLogout = async (navigate: any) => {
  try {
    // 1. Try server logout first
    // try {
    //   await axios.post('/api/auth/logout', {}, {
    //     withCredentials: true
    //   });
    // } catch (error) {
    //   console.error('Server logout failed:', error);
    //   // Continue with client logout even if server fails
    // }

    const rememberMe = sessionStorage.getItem("rememberMe") === "true";
    const savedEmail = sessionStorage.getItem("email");
    const savedEncryptedPassword = sessionStorage.getItem("encryptedPassword");

    sessionStorage.clear();
    localStorage.clear();

    if (rememberMe && savedEmail && savedEncryptedPassword) {
      sessionStorage.setItem("email", savedEmail);
      sessionStorage.setItem("encryptedPassword", savedEncryptedPassword);
      sessionStorage.setItem("rememberMe", "true");
    }

    navigate("/");
  } catch (error) {
    console.error('Logout error:', error);
    navigate("/");
  }
};