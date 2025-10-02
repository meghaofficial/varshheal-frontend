import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputReact = ({ phone, setPhone }) => {
  return (
    <div>
      <PhoneInput
        country={"in"} // Set a default country
        value={phone}
        onChange={setPhone}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: true,
        }}
      />
    </div>
  );
};

export default PhoneInputReact;