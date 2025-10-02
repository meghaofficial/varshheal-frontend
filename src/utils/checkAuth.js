import { setUser, clearUser } from "../redux/features/authSlice";
import axiosPublic from "./axiosPublic";

export const checkAuth = () => async (dispatch) => {
  try {
    const res = await axiosPublic.get("/me", { withCredentials: true });
    dispatch(setUser(res.data.user));
  } catch (err) {
    dispatch(clearUser());
  }
};
