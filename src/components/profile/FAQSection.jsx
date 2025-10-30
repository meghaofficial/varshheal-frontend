import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../utils/axiosPrivate";
import { toastError, toastSuccess } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/features/authSlice";

const FAQSection = () => {
  const faqs = [
    {
      question: "What happens when I update my email address (or mobile number)?",
      answer:
        "Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).",
    },
    {
      question: "When will my account be updated with the new email address (or mobile number)?",
      answer:
        "It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.",
    },
    {
      question:
        "What happens to my existing Flipkart account when I update my email address (or mobile number)?",
      answer:
        "Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.",
    },
    {
      question: "Does my Seller account get affected when I update my email address?",
      answer:
        "Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isGoogleUser = Boolean(user?.isGoogleUser || user?.googleId);

  const deleteAccount = async (userId, isGoogleUser = false) => {
    if (!userId) {
      toastError("User ID missing");
      return;
    }

    // Confirm before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const res = await axiosPrivate.delete(`/delete-account/${userId}`, {
        withCredentials: true
      });

      if (res?.data?.success) {
        toastSuccess(res.data.message || "Account deleted successfully");

        localStorage.removeItem("token");
        if (isGoogleUser) {
          await axiosPrivate.post("/logout", { withCredentials: true });
        }

        dispatch(clearUser());

        navigate("/");
      } else {
        toastError(res.data.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toastError(
        error.response?.data?.message || "Something went wrong while deleting"
      );
    }
  };

  return (
    <div className="text-sm mx-auto text-gray-800 mt-10">
      <h2 className="font-bold mb-6">FAQs</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3 className="font-semibold mb-1">{faq.question}</h3>
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <p
          className="text-pink-600 font-semibold hover:underline cursor-pointer"
          onClick={() => deleteAccount(user?.id, isGoogleUser)}
        >
          Delete Account
        </p>
      </div>
    </div>
  );
};

export default FAQSection;
