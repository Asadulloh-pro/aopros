
export default function authHeader(): { Authorization?: string } {
  const tokenLocal = localStorage.getItem('token');
  const token = tokenLocal && JSON.parse(tokenLocal);
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
