import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    if (validateForm()) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID,
          process.env.NEXT_PUBLIC_TEMPLATE_ID,
          form.current,
          process.env.NEXT_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
            setIsSubmitted(true);
            form.current.reset()
            setTimeout(() => {
              setIsSubmitted(false)
            }, 3000);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  const validateForm = () => {
    const nameInput = form.current["user_name"];
    const emailInput = form.current["user_email"];
    const subjectInput = form.current["user_subject"];
    const messageInput = form.current["message"];

    const errors = {};

    if (!nameInput.value.trim()) {
      errors.name = "Name is required.";
    }

    if (!emailInput.value.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
      errors.email = "Invalid email address.";
    }

    if (!subjectInput.value.trim()) {
      errors.subject = "Subject is required.";
    }

    if (!messageInput.value.trim()) {
      errors.message = "Message is required.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  return (
    <section
      id="contact"
      className="gap-4 py-10 mx-auto max-w-contentContainer xl:py-32"
    >
      <div className="mb-10 text-center">
        <p className="text-lg font-semibold tracking-wide font-titleFont text-textGreen">
          04. What’s Next?
        </p>
        <h2 className="mb-3 text-5xl font-semibold font-titleFont">
          Get In Touch
        </h2>
        <p className="max-w-[600px] mx-auto text-textDark mb-4">
          I would be delighted to connect with you and discuss potential
          collaborations or answer any questions you may have. Let’s create
          something amazing together!
        </p>
      </div>
      <form
        className="flex flex-col gap-5 mx-auto lgl:max-w-[650px]"
        ref={form}
        onSubmit={sendEmail}
        >
        {isSubmitted && (
          <div className="px-3 py-2 mx-auto rounded bg-[#112240] w-fit">
            <p className="text-textGreen">Form Sent Successfully</p>
          </div>
        )}
        <input
          className={`px-2 py-2 bg-transparent border border-solid rounded border-textGreen ${
            errors.name ? "border-red-500" : ""
          }`}
          type="text"
          placeholder="Your Name"
          name="user_name"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

        <input
          className={`px-2 py-2 bg-transparent border border-solid rounded border-textGreen ${
            errors.email ? "border-red-500" : ""
          }`}
          type="email"
          placeholder="Your Email"
          name="user_email"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

        <input
          className={`px-2 py-2 bg-transparent border border-solid rounded border-textGreen ${
            errors.subject ? "border-red-500" : ""
          }`}
          type="text"
          placeholder="Subject"
          name="user_subject"
        />
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject}</p>
        )}

        <textarea
          placeholder="Your Message"
          name="message"
          rows="7"
          className={`px-2 py-1 bg-transparent border border-solid rounded border-textGreen ${
            errors.message ? "border-red-500" : ""
          }`}
        ></textarea>
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message}</p>
        )}

        <button className="w-36 h-12 rounded-md text-textGreen text-[13px] border border-textGreen hover:bg-hoverColor duration-300">
          Submit
        </button>
      </form>
    </section>
  );
};
export default Contact;
