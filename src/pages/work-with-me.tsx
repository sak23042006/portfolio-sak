import Footer from "@/components/Footer";
import React, { useRef, useState } from "react";
import {
  FaCode,
  FaMobileAlt,
  FaPalette,
  FaRocket,
  FaHandshake,
  FaTools,
  FaCheckCircle,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const projectTypes = [
  "Full Stack App",
  "Mobile App",
  "UI/UX",
  "Landing Page",
  "E-commerce",
  "Consultation",
  "Other",
];

const services = [
  {
    icon: <FaCode />,
    title: "Full-Stack Development",
    desc: "Modern web apps using React, Node.js, APIs, databases.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Apps",
    desc: "Cross-platform apps using React Native and Expo.",
  },
  {
    icon: <FaPalette />,
    title: "UI/UX Design",
    desc: "Sleek, user-first interfaces with interactive design.",
  },
];

const engagementModels = [
  {
    title: "MVP Launch",
    icon: <FaRocket />,
    points: ["2-3 weeks", "Rapid prototyping", "Launch-ready"],
  },
  {
    title: "Growth Partner",
    icon: <FaHandshake />,
    points: ["Ongoing dev", "Monthly retainer", "Scalable support"],
  },
  {
    title: "Custom Builds",
    icon: <FaTools />,
    points: ["Custom timeline", "Integrations", "Infrastructure"],
  },
];

const YOUR_EMAIL = "arun.ofc09@gmail.com";
const YOUR_WHATSAPP = "917397584609";

const WorkWithMe = () => {
  const contactRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    otherProjectType: "",
    message: "",
  });
  const [sendOption, setSendOption] = useState("email");
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.projectType ||
      !form.message.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.projectType === "Other" && !form.otherProjectType.trim()) {
      setError("Please specify your project type.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    const selectedProjectType =
      form.projectType === "Other" && form.otherProjectType
        ? `Other - ${form.otherProjectType}`
        : form.projectType;
    const subject = encodeURIComponent(`Requesting for ${selectedProjectType}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}`);
    const whatsappText = encodeURIComponent(
      `Hi! I'm interested in working with you.\n\nProject Type: ${selectedProjectType}\n\n${form.message}\n\nEmail: ${form.email}\n${form.name}`
    );

    if (sendOption === "email") {
      window.open(
        `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`,
        "_blank"
      );
    } else if (sendOption === "whatsapp") {
      window.open(
        `https://wa.me/${YOUR_WHATSAPP}?text=${whatsappText}`,
        "_blank"
      );
    }
  };

  const handleStartProjectClick = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white min-h-screen px-2 sm:px-4 md:px-8 py-8 md:py-12 space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Let’s Build Together 🚀
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mb-6">
          I help businesses and founders turn ideas into high-impact digital
          products. Whether it's a web app, mobile app, or full-stack solution —
          I'm ready to help.
        </p>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 transition px-6 sm:px-8 py-3 rounded-full font-semibold text-white shadow-lg w-full sm:w-auto"
          onClick={handleStartProjectClick}
        >
          Start a Project
        </button>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto px-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 text-center hover:shadow-2xl transition border border-white/10"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-indigo-400">
                {service.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="max-w-6xl mx-auto px-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          Engagement Models
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {engagementModels.map((model, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 text-center hover:shadow-2xl transition border border-white/10"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-indigo-400">
                {model.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                {model.title}
              </h3>
              <ul className="text-left space-y-2">
                {model.points.map((point, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm sm:text-base">
                    <FaCheckCircle className="mr-2 text-green-400" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-4xl mx-auto px-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          Workflow
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
          {["Discovery", "Proposal", "Execution", "Delivery"].map(
            (step, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-4 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/10"
              >
                <div className="text-2xl sm:text-4xl font-bold text-indigo-400 mb-1 sm:mb-2">
                  {idx + 1}
                </div>
                <p className="text-gray-200 font-medium text-xs sm:text-base">{step}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Why Me Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-2">
        <div className="space-y-3 sm:space-y-4">
          { [
            "Clear Communication",
            "Fast Turnaround",
            "Quality Code",
            "Collaborative Approach",
          ].map((point, idx) => (
            <p key={idx} className="flex items-center text-base sm:text-lg text-gray-300">
              <FaCheckCircle className="text-green-400 mr-2 sm:mr-3" /> {point}
            </p>
          ))}
        </div>
        <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg text-gray-100 border border-white/10">
          <p className="italic text-sm sm:text-base">
            "Working with this developer was smooth and productive. They
            understood our goals quickly and delivered exactly what we needed.
            Highly recommended!"
          </p>
          <p className="mt-3 sm:mt-4 text-right font-semibold text-xs sm:text-base">
            — Happy Client,{" "}
            <a
              href="https://exploresteps.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-indigo-300 hover:text-indigo-400"
            >
              exploresteps.com
            </a>
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="max-w-3xl mx-auto text-center scroll-mt-24 px-2"
        ref={contactRef}
        id="work-together"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Let’s Work Together
        </h2>
        <form
          className="space-y-6 sm:space-y-8 bg-white/5 p-4 sm:p-10 rounded-xl shadow-lg border border-white/10"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="w-full mb-2 text-left">
              <span className="text-red-400 bg-red-900/30 px-4 py-2 rounded block text-xs sm:text-base">
                {error}
              </span>
            </div>
          )}
          <input
            className="w-full bg-white/10 rounded-lg p-3 sm:p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 transition text-sm sm:text-base"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            className="w-full bg-white/10 rounded-lg p-3 sm:p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 transition text-sm sm:text-base"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
            type="email"
          />
          <div className="w-full text-left space-y-2">
            <select
              className="w-full bg-white/10 rounded-lg p-3 sm:p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 transition text-sm sm:text-base"
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              required
              style={{
                color: form.projectType ? "white" : "#a1a1aa",
                backgroundColor: "rgba(255,255,255,0.10)",
              }}
            >
              <option
                value=""
                style={{ color: "#a1a1aa", background: "#18181b" }}
              >
                Select a project type
              </option>
              {projectTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                  style={{
                    color: "#18181b",
                    background: "#fff",
                  }}
                >
                  {type}
                </option>
              ))}
            </select>
            {/* Show input if "Other" is selected */}
            {form.projectType === "Other" && (
              <input
                className="mt-3 w-full bg-white/10 rounded-lg p-3 sm:p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 transition text-sm sm:text-base"
                placeholder="Please specify your project type"
                name="otherProjectType"
                value={form.otherProjectType}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            )}
            {form.projectType && (
              <div className="mt-2 text-indigo-300 text-xs sm:text-sm">
                <FaCheckCircle className="inline mr-1 text-green-400" />
                Selected:{" "}
                {form.projectType === "Other" && form.otherProjectType
                  ? `Other - ${form.otherProjectType}`
                  : form.projectType}
              </div>
            )}
          </div>
          <textarea
            className="w-full bg-white/10 rounded-lg p-3 sm:p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 transition text-sm sm:text-base"
            rows={5}
            placeholder="Tell me about your project..."
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
          {/* Add send option */}
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6 mb-2">
            <label
              className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg transition
                ${
                  sendOption === "email"
                    ? "bg-blue-600 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
            >
              <input
                type="radio"
                name="sendOption"
                value="email"
                checked={sendOption === "email"}
                onChange={() => setSendOption("email")}
                className="accent-blue-500"
              />
              <span>Email</span>
            </label>
            <label
              className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg transition
                ${
                  sendOption === "whatsapp"
                    ? "bg-blue-600 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
            >
              <input
                type="radio"
                name="sendOption"
                value="whatsapp"
                checked={sendOption === "whatsapp"}
                onChange={() => setSendOption("whatsapp")}
                className="accent-blue-500"
              />
              <span>WhatsApp</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 sm:px-6 py-3 sm:py-4 rounded-full font-semibold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base sm:text-lg"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
          <a
            href={`mailto:${YOUR_EMAIL}`}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition text-base sm:text-lg"
          >
            <FaEnvelope /> Email
          </a>
          <a
            href={`https://wa.me/${YOUR_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition text-base sm:text-lg"
          >
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default WorkWithMe;
