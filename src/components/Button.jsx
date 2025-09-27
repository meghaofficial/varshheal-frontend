import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Button = ({ classname, name, url, size }) => {
  return (
    <div className="flex items-center">
      <Link
        to={url}
        className={`border-2 border-black cursor-pointer hover:text-white hover:bg-black ${classname}`}
      >
        {name}
      </Link>
      <Link
        to={url}
        className={`border-y-2 border-r-2 border-black hover:text-white hover:bg-black cursor-pointer ${classname}`}
      >
        <ChevronRight size={size} />
      </Link>
    </div>
  );
};

export default Button;
