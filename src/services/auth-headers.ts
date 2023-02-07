
export default function authHeader(): { Authorization?: string } {
  const tokenLocal = localStorage.getItem('auth');
  const auth = tokenLocal && JSON.parse(tokenLocal);
  const token = auth?.state?.session?.token
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
