import axios from "axios";
import { signOut } from "next-auth/react";

const logout = async (): Promise<void> => {
  const {
    data: { path }
  } = await axios.get('/api/auth/logout');
  await signOut({ redirect: false });
  window.location.href = path;
};

export default logout;