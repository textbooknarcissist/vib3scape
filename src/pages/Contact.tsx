import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  FaPaperPlane,
  FaCircleCheck,
  FaTriangleExclamation,
} from "react-icons/fa6";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) {
      nextErrors.name = "Full name is required";
    }

    if (!email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please provide a valid email address";
    }

    if (!subject.trim()) {
      nextErrors.subject = "Subject line is required";
    }

    if (!message.trim()) {
      nextErrors.message = "Message text is required";
    } else if (message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (submitStatus) setSubmitStatus(null);

    const isValid = validate();
    if (!isValid) return;

    setIsSubmitting(true);

    // Simulate safe Formspree/mock submission endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form variables
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
    }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>Contact | Vib3scape</title>
        <meta
          name="description"
          content="Get in touch with Ted Vibes. Share your questions, project pitches, or general feedback."
        />
      </Helmet>

      <div className="py-8 px-4 md:px-6 lg:px-8 max-w-2xl mx-auto w-full select-none">
        {/* Title Heading */}
        <SectionHeader>Contact Ted</SectionHeader>

        <p className="text-sm md:text-base text-(--color-fg) leading-relaxed mb-8">
          Got a project idea, feedback on a post, or just want to chat? Drop a
          line below. I normally read and reply to messages within 24 to 48
          hours.
        </p>

        {/* ── Submission Status Toast/Banner ── */}
        {submitStatus === "success" && (
          <div
            className="flex items-start gap-3 p-4 bg-[#e6f4ea] dark:bg-[#132c1c] text-[#137333] dark:text-[#81c995] rounded-(--border-radius) border border-[#a8dab5] dark:border-[#132c1c] mb-6"
            role="alert"
          >
            <FaCircleCheck
              className="w-5 h-5 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="text-sm font-medium">
              <span className="font-bold">Thank you!</span> Your message has
              been sent successfully. I will get back to you shortly.
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div
            className="flex items-start gap-3 p-4 bg-[#fce8e6] dark:bg-[#3b1c1c] text-[#c5221f] dark:text-[#f28b82] rounded-(--border-radius) border border-[#fad2cf] dark:border-[#3b1c1c] mb-6"
            role="alert"
          >
            <FaTriangleExclamation
              className="w-5 h-5 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="text-sm font-medium">
              <span className="font-bold">Error!</span> Something went wrong.
              Please check the fields and try again.
            </div>
          </div>
        )}

        {/* ── Feedback Form ── */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          noValidate
        >
          {/* Row 1: Name */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="contact-name"
              className="text-xs md:text-sm font-semibold text-(--color-fg-bold) mb-2 select-none"
            >
              Full Name <span className="text-(--color-accent)">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={[
                "w-full min-h-11 px-4 py-2 border rounded-(--border-radius) bg-(--color-bg-alt) transition-colors duration-200 text-sm focus:outline-none focus:bg-(--color-bg)",
                errors.name
                  ? "border-[#e05555] focus:border-[#e05555] focus:ring-1 focus:ring-[#e05555]"
                  : "border-(--color-border) focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)",
              ].join(" ")}
              placeholder="Your full name"
              disabled={isSubmitting}
              required
            />
            {errors.name && (
              <span
                role="alert"
                className="text-[#e05555] text-xs font-semibold mt-1.5 ml-1"
              >
                {errors.name}
              </span>
            )}
          </div>

          {/* Row 2: Email */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="contact-email"
              className="text-xs md:text-sm font-semibold text-(--color-fg-bold) mb-2 select-none"
            >
              Email Address <span className="text-(--color-accent)">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={[
                "w-full min-h-11 px-4 py-2 border rounded-(--border-radius) bg-(--color-bg-alt) transition-colors duration-200 text-sm focus:outline-none focus:bg-(--color-bg)",
                errors.email
                  ? "border-[#e05555] focus:border-[#e05555] focus:ring-1 focus:ring-[#e05555]"
                  : "border-(--color-border) focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)",
              ].join(" ")}
              placeholder="you@example.com"
              disabled={isSubmitting}
              required
            />
            {errors.email && (
              <span
                role="alert"
                className="text-[#e05555] text-xs font-semibold mt-1.5 ml-1"
              >
                {errors.email}
              </span>
            )}
          </div>

          {/* Row 3: Subject */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="contact-subject"
              className="text-xs md:text-sm font-semibold text-(--color-fg-bold) mb-2 select-none"
            >
              Subject <span className="text-(--color-accent)">*</span>
            </label>
            <input
              type="text"
              id="contact-subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (errors.subject)
                  setErrors((prev) => ({ ...prev, subject: "" }));
              }}
              className={[
                "w-full min-h-11 px-4 py-2 border rounded-(--border-radius) bg-(--color-bg-alt) transition-colors duration-200 text-sm focus:outline-none focus:bg-(--color-bg)",
                errors.subject
                  ? "border-[#e05555] focus:border-[#e05555] focus:ring-1 focus:ring-[#e05555]"
                  : "border-(--color-border) focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)",
              ].join(" ")}
              placeholder="What is this regarding?"
              disabled={isSubmitting}
              required
            />
            {errors.subject && (
              <span
                role="alert"
                className="text-[#e05555] text-xs font-semibold mt-1.5 ml-1"
              >
                {errors.subject}
              </span>
            )}
          </div>

          {/* Row 4: Message */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="contact-message"
              className="text-xs md:text-sm font-semibold text-(--color-fg-bold) mb-2 select-none"
            >
              Message <span className="text-(--color-accent)">*</span>
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message)
                  setErrors((prev) => ({ ...prev, message: "" }));
              }}
              rows={6}
              className={[
                "w-full px-4 py-3 border rounded-(--border-radius) bg-(--color-bg-alt) transition-colors duration-200 text-sm focus:outline-none focus:bg-(--color-bg) resize-y min-h-30",
                errors.message
                  ? "border-[#e05555] focus:border-[#e05555] focus:ring-1 focus:ring-[#e05555]"
                  : "border-(--color-border) focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)",
              ].join(" ")}
              placeholder="Write your message here..."
              disabled={isSubmitting}
              required
            />
            {errors.message && (
              <span
                role="alert"
                className="text-[#e05555] text-xs font-semibold mt-1.5 ml-1"
              >
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit Action Button */}
          <div className="flex justify-start">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  <FaPaperPlane className="w-3.5 h-3.5" aria-hidden="true" />
                  SendMessage
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
