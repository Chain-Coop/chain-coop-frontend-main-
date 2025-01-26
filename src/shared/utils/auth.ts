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
    console.error("Logout error:", error);
    navigate("/");
  }
};
