export const handleLogout = (navigate: any) => {
  const rememberMe = sessionStorage.getItem("rememberMe") === "true";

  if (rememberMe) {
    const email = sessionStorage.getItem("email") ?? "";
    const password = sessionStorage.getItem("password") ?? "";

    sessionStorage.clear();
    localStorage.clear();
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("rememberMe", "true");
  } else {
    sessionStorage.clear();
    localStorage.clear();
  }

  navigate("/");
};
