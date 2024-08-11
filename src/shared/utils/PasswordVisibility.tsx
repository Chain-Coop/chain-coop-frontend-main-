import { useState } from "react";

export const usePasswordVisibilityToggle = (initialType = "password") => {
  const [passwordType, setPasswordType] = useState(initialType);

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };

  return [passwordType, togglePasswordVisibility];
};
