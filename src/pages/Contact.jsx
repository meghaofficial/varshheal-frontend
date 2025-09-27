import { TbPhoneCalling } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div className="p-8">
      <p className="text-center text-[30px] font-semibold">Contact Us</p>
      <p className="text-gray-500 text-center text-sm">
        Any question or remarks? Just write us a message!
      </p>
      <div className="flex my-8 bg-white">
        {/* left */}
        <div className="w-[40%] relative overflow-hidden bg-[#292929] rounded-lg text-white p-4 h-full flex flex-col justify-between min-h-[500px]">
          <div>
            <p className="text-[30px] font-semibold">Contact Information</p>
            <p className="text-sm ms-1">Say something to shart a live chat!</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <TbPhoneCalling size={20} />
              <span className="text-sm">+91xxxxxxx</span>
            </div>
            <div className="flex items-center gap-3">
              <MdOutlineMailOutline size={20} />
              <span className="text-sm">abc@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaLocationDot size={20} />
              <span className="text-sm">Addresss Lorem ipsum dolor sit.</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center bg-white rounded-full h-8 w-8 cursor-pointer">
              <GrInstagram className="text-black" />
            </div>
          </div>
          {/* circles */}
          <div className="absolute bg-[#383838]/50 h-[150px] w-[150px] rounded-full right-10 bottom-10 z-[99]"></div>
          <div className="absolute bg-[#323232] h-[200px] w-[200px] rounded-full -right-10 -bottom-10"></div>
        </div>
        {/* right */}
        <div className="w-[60%] p-8">
            <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
