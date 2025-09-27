import React from "react";

const ContactForm = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* fname, lname */}
      <div className="flex items-center gap-6">
        <div className="text-sm flex flex-col w-full">
          <label>First Name</label>
          <input type="text" className="outline-none p-2 text-sm border-b" />
        </div>
        <div className="text-sm flex flex-col w-full">
          <label>Last Name</label>
          <input type="text" className="outline-none p-2 text-sm border-b" />
        </div>
      </div>
      {/* email, phone */}
      <div className="flex items-center gap-6">
        <div className="text-sm flex flex-col w-full">
          <label>Email</label>
          <input type="email" className="outline-none p-2 text-sm border-b" />
        </div>
        <div className="text-sm flex flex-col w-full">
          <label>Phone</label>
          <input type="text" className="outline-none p-2 text-sm border-b" />
        </div>
      </div>
      {/* message */}
      <div>
        <label>Message</label>
        <textarea
          className="bg-white outline-none p-2 text-sm resize-none w-full border-b"
          rows={2}
        ></textarea>
      </div>
      <button className="w-fit text-sm hover:bg-black hover:text-white border px-3 py-1 cursor-pointer">Submit</button>
    </div>
  );
};

export default ContactForm;
