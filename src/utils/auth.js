// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

export function isAdmin() {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    return !!decoded.isAdmin;
  } catch (error) {
    return false;
  }
}
