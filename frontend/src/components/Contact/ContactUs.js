import React from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";
import swal from "sweetalert";
import Navigator from "../Navigator/Navigator";

function ContactUs() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_blwihvu",   // 🔹 replace with your EmailJS service ID
        "template_ucqzhic",  // 🔹 replace with your template ID
        e.target,
        "PgaHmhlH2BT2RsgtQ"    // 🔹 replace with your public key
      )
      .then(
        (result) => {
          swal({
            title: "✅ Message Sent Successfully!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#12af39",
            className: "store-swal-button",
          })
        },
        (error) => {
          alert("❌ Failed to send message, please try again.");
        }
      );

    e.target.reset(); // clear the form
  };

  return (
    <>
      <Navigator />
      <div className="contact-container">
        <div className="contact-card">
          <h2>Contact Us</h2>
          <p>
            We'd love to hear from you! Fill out the form below and we'll get back
            to you as soon as possible.
          </p>

          {/* Contact Form with EmailJS */}
          <form className="contact-form" onSubmit={sendEmail}>
            {/* Full Name */}
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" placeholder="John Doe" required />

            {/* Email */}
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" placeholder="you@example.com" required />

            {/* Message */}
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message here..."
              required
            ></textarea>

            {/* Submit Button */}
            <button type="submit">Send Message</button>
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <p>
              Or reach us directly at{" "}
              <a>
                support@agriconnect.com
              </a>
            </p>
            <p>📞 +91 98765 43210</p>
          </div>
        </div>
      </div>
    </>

  );
}

export default ContactUs;
