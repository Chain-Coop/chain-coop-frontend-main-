
import React from "react";

export default function authHeader() {
  const user = sessionStorage.getItem("userData");

  if (user) {
    return {
      Authorization: "Bearer " + user,
    };
  } else {
    return {};
  }
}
