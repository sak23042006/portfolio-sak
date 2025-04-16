import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedText from "./AnimatedText";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { ref: formRef, isInView: formInView } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { ref: infoRef, isInView: infoInView } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct the WhatsApp message
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;

    // Create the WhatsApp link
    const whatsappLink = `https://wa.me/917397584609?text=${message}`;

    // Open the link in a new tab
    window.open(whatsappLink, "_blank");

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Contact
          </span>
          <AnimatedText
            text="Get In Touch"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6"
            delay={30}
          />
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 md:mb-12 text-sm sm:text-base">
            Feel free to reach out to me for any inquiries, collaboration opportunities, or just to say hello!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Form */}
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "transition-all duration-1000 transform",
              formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                Send Me a Message
              </h3>
              {submitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-lg mb-6 text-sm sm:text-base">
                  <p className="font-medium">Thank you for your message!</p>
                  <p>I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:focus:ring-2 dark:focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:focus:ring-2 dark:focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:focus:ring-2 dark:focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:focus:ring-2 dark:focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⏳</span> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="sm:w-5 sm:h-5" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div
            ref={infoRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "transition-all duration-1000 transform",
              infoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 h-full">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Mail size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:arun.ofc09@gmail.com"
                      className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
                    >
                      arun.ofc09@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Phone size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+917397584609"
                      className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
                    >
                      +91 7397584609
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MapPin size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-1">
                      Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      Madurai, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
