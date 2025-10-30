import { setUser, clearUser } from "../redux/features/authSlice";
import axiosPrivate from "./axiosPrivate";
import axiosPublic from "./axiosPublic";

// export const checkAuth = () => async (dispatch) => {
//   try {
//     const res = await axiosPublic.get("/me", { withCredentials: true });
//     dispatch(setUser(res.data.user));
//   } catch (err) {
//     dispatch(clearUser());
//   }
// };

// SAME AS BELOW
// export const checkAuth = () => async (dispatch) => {
//   try {
//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         const res = await axiosPrivate.get("/user/details", {
//           headers: {
//             Authorization: token?.split(" ")[1],
//           },
//         });
//         dispatch(setUser(res.data.user));
//         return;
//       } catch (manualErr) {
//         console.warn("Manual token invalid or expired:", manualErr);
//         localStorage.removeItem("token");
//       }
//     }

//     // 🌐 Try Google authentication if manual one failed or not found
//     try {
//       const res = await axiosPublic.get("/me", { withCredentials: true });
//       dispatch(setUser(res.data.user));
//       return;
//     } catch (googleErr) {
//       console.warn("Google auth failed:", googleErr);
//     }

//     dispatch(clearUser());
//     // localStorage.removeItem("token");
//   } catch (err) {
//     console.error("Auth check failed:", err);
//     dispatch(clearUser());
//     // localStorage.removeItem("token");
//   }
// };

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
    localStorage.removeItem("token");
  }
};
