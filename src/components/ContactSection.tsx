import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { SERVICES } from '../data/siteContent';
import { AnimatedWords } from './AnimatedWords';

interface ContactSectionProps {
  preselectedProjectType?: string;
  preselectedNote?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export function ContactSection({
  preselectedProjectType,
  preselectedNote,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(
    preselectedProjectType || 'Residential Construction',
  );
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedProjectType) {
      setProjectType(preselectedProjectType);
      setSubmittedRef(null);
    }
  }, [preselectedProjectType]);

  useEffect(() => {
    if (preselectedNote) {
      setMessage(preselectedNote);
      setSubmittedRef(null);
    }
  }, [preselectedNote]);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      next.name = 'Please enter your full name.';
    }
    const phoneDigits = phone.replace(/[^\d]/g, '');
    if (phoneDigits.length < 7) {
      next.phone = 'Please enter a valid contact phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!projectType) {
      next.projectType = 'Please select a project type.';
    }
    if (!message.trim() || message.trim().length < 10) {
      next.message = 'Please share a brief overview of your project.';
    }
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      const refCode = `SB-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(refCode);
    }, 450);
  };

  return (
    <section id="contact" className="py-14 lg:py-24 bg-[#FAF7F2]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <AnimatedWords
              as="p"
              stagger={0.04}
              text="07 · Contact"
              className="text-xs font-medium tracking-[0.14em] uppercase text-[#B85A3A]"
            />
            <AnimatedWords
              as="h2"
              delay={0.05}
              text="Start your architectural build."
              className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1B1F1D] leading-[1.12]"
            />
            <AnimatedWords
              as="p"
              delay={0.14}
              stagger={0.025}
              duration={0.42}
              text="Share your site details and project goals. Our engineering lead responds within one business day."
              className="mt-4 text-sm sm:text-base text-[#5C615D] leading-relaxed"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 pt-7 border-t border-[#E3DDD2] space-y-5"
            >
              <motion.div whileHover={{ x: 4 }} className="flex items-start gap-3.5 transition-colors">
                <MapPin className="w-4 h-4 text-[#203D33] shrink-0 mt-1" />
                <div className="text-sm text-[#5C615D]">
                  Talstrasse 82, Zurich · 1120 NW Couch St, Portland
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} className="flex items-start gap-3.5 transition-colors">
                <Phone className="w-4 h-4 text-[#203D33] shrink-0 mt-1" />
                <div className="text-sm text-[#5C615D] tabular-nums">
                  +1 (503) 555-0194 · +41 44 555 01 40
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} className="flex items-start gap-3.5 transition-colors">
                <Mail className="w-4 h-4 text-[#203D33] shrink-0 mt-1" />
                <div className="text-sm text-[#5C615D]">consultations@summitbuilders.com</div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="lg:col-span-7 bg-[#F1ECE3] border border-[#E3DDD2] hover:border-[#B85A3A]/60 rounded-2xl p-7 sm:p-9 transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(32,61,51,0.09)]"
          >
            {submittedRef ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="py-8 text-center max-w-md mx-auto"
              >
                <div className="w-12 h-12 rounded-full bg-[#203D33] text-[#FAF7F2] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <AnimatedWords
                  as="h3"
                  immediate
                  stagger={0.045}
                  text="Inquiry Received"
                  className="mt-5 font-display text-2xl font-semibold text-[#1B1F1D]"
                />
                <p className="mt-3 text-sm text-[#5C615D] leading-relaxed">
                  Thank you, <span className="font-medium text-[#1B1F1D]">{name}</span>. Your{' '}
                  <span className="font-medium text-[#1B1F1D]">{projectType}</span> request has been
                  logged under reference{' '}
                  <span className="font-mono text-[#203D33] font-medium">{submittedRef}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRef(null);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                    setErrors({});
                  }}
                  className="mt-6 px-5 py-2.5 text-sm font-medium text-[#203D33] border border-[#203D33] rounded-lg hover:bg-[#203D33] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#1B1F1D] mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Elena Rostova"
                      className={`w-full px-4 py-3 text-sm bg-[#FFFDF9] border rounded-lg text-[#1B1F1D] placeholder:text-[#5C615D]/50 focus:outline-none focus:ring-2 focus:ring-[#203D33]/20 focus:border-[#203D33] transition-colors ${
                        errors.name ? 'border-red-600' : 'border-[#E3DDD2]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-700">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-medium text-[#1B1F1D] mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (503) 555-0148"
                      className={`w-full px-4 py-3 text-sm bg-[#FFFDF9] border rounded-lg text-[#1B1F1D] placeholder:text-[#5C615D]/50 focus:outline-none focus:ring-2 focus:ring-[#203D33]/20 focus:border-[#203D33] transition-colors ${
                        errors.phone ? 'border-red-600' : 'border-[#E3DDD2]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-700">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#1B1F1D] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@example.com"
                      className={`w-full px-4 py-3 text-sm bg-[#FFFDF9] border rounded-lg text-[#1B1F1D] placeholder:text-[#5C615D]/50 focus:outline-none focus:ring-2 focus:ring-[#203D33]/20 focus:border-[#203D33] transition-colors ${
                        errors.email ? 'border-red-600' : 'border-[#E3DDD2]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-700">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block text-xs font-medium text-[#1B1F1D] mb-1.5"
                    >
                      Project Type
                    </label>
                    <select
                      id="contact-project-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className={`w-full px-4 py-3 text-sm bg-[#FFFDF9] border rounded-lg text-[#1B1F1D] focus:outline-none focus:ring-2 focus:ring-[#203D33]/20 focus:border-[#203D33] transition-colors ${
                        errors.projectType ? 'border-red-600' : 'border-[#E3DDD2]'
                      }`}
                    >
                      {SERVICES.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-xs text-red-700">{errors.projectType}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#1B1F1D] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Site location, approximate scale, and target schedule..."
                    className={`w-full px-4 py-3 text-sm bg-[#FFFDF9] border rounded-lg text-[#1B1F1D] placeholder:text-[#5C615D]/50 focus:outline-none focus:ring-2 focus:ring-[#203D33]/20 focus:border-[#203D33] transition-colors resize-y ${
                      errors.message ? 'border-red-600' : 'border-[#E3DDD2]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-700">{errors.message}</p>
                  )}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-7 py-3.5 text-sm font-medium text-[#FAF7F2] bg-[#203D33] hover:bg-[#162B24] disabled:opacity-60 rounded-lg transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {submitting ? 'Submitting...' : 'Request Consultation'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
