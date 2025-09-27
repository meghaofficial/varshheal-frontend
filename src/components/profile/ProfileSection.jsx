import { FaEdit } from "react-icons/fa";

const ProfileSection = () => {
  return (
    <div>
    {/* header */}
      <div className="flex items-center justify-between">
            <span className="text-[25px] font-semibold pt-serif">PROFILE</span>
            <FaEdit className="cursor-pointer text-gray-500 hover:text-black" />
      </div>
      {/* lower profile content */}
      <div className="mt-5 flex gap-10 items-center">
            <div className="h-[150px] w-[150px] p-1.5 rounded border-[1.5px] border-gray-300">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrIt2Br55TADlJL6ILL-ZuDMozf4j43fNXRQ&s" alt="profile" className="rounded shadow shadow-gray-500" />
            </div>
            <div className="flex flex-col gap-5 text-gray-500">
                  <p>Megha Sharma</p>
                  <p>megha@gmail.com</p>
                  <p>+918439536098</p>
            </div>
      </div>
    </div>
  )
}

export default ProfileSection
