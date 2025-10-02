import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfileSection = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="text-[25px] font-semibold pt-serif">PROFILE</span>
        <FaEdit className="cursor-pointer text-gray-500 hover:text-black" />
      </div>
      {/* lower profile content */}
      <div className="mt-5 flex md:flex-row flex-col gap-10 items-center">
        <div className="md:h-[150px] min-h-[200px] md:w-[150px] min-w-[200px] p-1.5 rounded border-[1.5px] border-gray-300">
          <img
            src={
              user?.avatar ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrIt2Br55TADlJL6ILL-ZuDMozf4j43fNXRQ&s"
            }
            alt="profile"
            className="rounded shadow shadow-gray-500 h-full w-full"
          />
        </div>
        <div className="flex flex-col gap-5 text-gray-500 md:items-start items-center">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
          <p>+918439536098</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
