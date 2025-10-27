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

export const checkAuth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // 🔒 Try manual authentication first
        const res = await axiosPrivate.get("/user/details", {
          headers: {
            Authorization: token,
          },
        });
        dispatch(setUser(res.data.user));
        return; 
      } catch (manualErr) {
        console.warn("Manual token invalid or expired:", manualErr);
        // localStorage.removeItem("token"); // ❌ remove bad token
      }
    }

    // 🌐 Try Google authentication if manual one failed or not found
    try {
      const res = await axiosPublic.get("/me", { withCredentials: true });
      dispatch(setUser(res.data.user));
      return;
    } catch (googleErr) {
      console.warn("Google auth failed:", googleErr);
    }

    // ❌ If both fail — clear everything
    dispatch(clearUser());
    // localStorage.removeItem("token");
  } catch (err) {
    console.error("Auth check failed:", err);
    dispatch(clearUser());
    // localStorage.removeItem("token");
  }
};

// export const checkAuth = () => async (dispatch) => {
//   try {
//     // First, check if manual token exists
//     const token = localStorage.getItem("token");

//     console.log("token", token)

//     if (token) {
//       // Try to get user via private route (manual auth)
//       const res = await axiosPrivate.get("/user/details");
//       dispatch(setUser(res.data.user));
//       return;
//     }

//     // If no token or failed above, try Google Auth
//     const res = await axiosPublic.get("/me", { withCredentials: true });
//     dispatch(setUser(res.data.user));
//   } catch (err) {
//     // If both fail, clear user and token
//     // localStorage.removeItem("token");
//     // dispatch(clearUser());
//     console.error("Err", err)
//   }
// };
