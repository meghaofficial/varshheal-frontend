import { setUser, clearUser } from "../redux/features/authSlice";
import axiosPrivate from "./axiosPrivate";
import axiosPublic from "./axiosPublic";

export const checkAuth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const res = await axiosPrivate.get("/user/details", {
        headers: {
          Authorization: token,
        },
      });
      dispatch(setUser(res.data.user));
      return;
    } else {
      const res = await axiosPublic.get("/me", { withCredentials: true });
      dispatch(setUser(res.data.user));
      return;
    }
  } catch (err) {
    console.error("Auth check failed:", err);
    dispatch(clearUser());
    // localStorage.removeItem("token");
  }
};

// export const checkAuth = () => async (dispatch, getState) => {
//   try {
//     const token = localStorage.getItem("token");
//     const currentUser = getState().auth.user;

//     let res;
//     if (token) {
//       res = await axiosPrivate.get("/user/details", {
//         headers: { Authorization: token },
//       });
//     } else {
//       res = await axiosPublic.get("/me", { withCredentials: true });
//     }

//     const newUser = res.data.user;
//     if (JSON.stringify(newUser) !== JSON.stringify(currentUser)) {
//       dispatch(setUser(newUser));
//     }
//   } catch (err) {
//     console.error("Auth check failed:", err);
//     dispatch(clearUser());
//     localStorage.removeItem("token");
//   }
// };
