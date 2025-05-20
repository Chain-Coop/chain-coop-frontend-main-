export default function authHeader() {
  const userToken = sessionStorage.getItem("authToken");
  if (userToken) {
    return {
      Authorization: `Bearer ${userToken}`,
    };
  } else {
    return {};
  }
}
