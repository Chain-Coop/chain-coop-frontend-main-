export const handleLogout = async (navigate: any) => {
  try {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  } catch (error) {
    navigate("/");
  }
};
