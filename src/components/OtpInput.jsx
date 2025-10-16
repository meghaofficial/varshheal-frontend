const OtpInput = ({ otp, setOtp }) => {

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setOtp(value.slice(0, 6));
  };

  return (
    <input
      type="text"
      value={otp}
      onChange={handleChange}
      inputMode="numeric"
      maxLength="6"
      className="outline-none border border-gray-300 rounded p-3 w-full mt-1 text-center tracking-widest text-sm"
      placeholder="Enter OTP"
    />
  );
};

export default OtpInput;