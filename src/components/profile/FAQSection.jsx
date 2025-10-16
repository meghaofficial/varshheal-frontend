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
        <a
          href="#"
          className="text-pink-600 font-semibold hover:underline"
        >
          Delete Account
        </a>
      </div>
    </div>
  );
};

export default FAQSection;
