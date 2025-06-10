import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'diyweboffi@gmail.com',
          subject: `New Contact Form Submission: ${formData.subject}`,
          text: `\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}\n`,
          // Add a 'from' field for reply-to
          from: formData.email
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      toast({
        title: "Message Received",
        description: "Thank you for contacting us. Our team will respond within 24 hours.",
        duration: 5000,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Delivery Failed",
        description: "Your message couldn't be sent. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How soon can I expect a response?",
      answer: "We typically respond to all inquiries within 24 hours during business days (Monday-Friday). For urgent matters, please call our support line."
    },
    {
      question: "What information should I include in my message?",
      answer: "Please include as much detail as possible about your inquiry, including any relevant account information, order numbers, or specific questions you have."
    },
    {
      question: "Do you offer phone support?",
      answer: "Yes! Our phone support is available from 9AM to 5PM EST. You can reach us at +1 (555) 123-4567."
    },
    {
      question: "Where are you located?",
      answer: "Our headquarters are located at 123 Business Avenue, Suite 456, New York, NY 10001. We also have remote teams across multiple time zones."
    },
    {
      question: "Can I schedule a meeting with your team?",
      answer: "Absolutely! After submitting your contact information, our team will reach out to schedule a meeting at your convenience."
    }
  ];

  return (
    <>
      <Head>
        <title>Contact | Nurmaa</title>
        <meta name="description" content="Connect with our team for inquiries, support, and partnerships" />
      </Head>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-[#ebebd3] to-[#fff] py-16 px-4 sm:px-6 lg:px-8 mt-[60px]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-[#121769] mb-4"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-[#67246a] max-w-2xl mx-auto"
            >
              Have questions or want to work together? We'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ebebd3]"
            >
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-[#121769] mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    {['name', 'email', 'subject'].map((field) => (
                      <div key={field}>
                        <label htmlFor={field} className="block text-sm font-medium text-[#67246a] mb-1 capitalize">
                          {field} <span className="text-[#fe49af]">*</span>
                        </label>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          id={field}
                          name={field}
                          value={(formData as any)[field]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#ebebd3] rounded-lg focus:ring-2 focus:ring-[#fe49af] focus:border-[#fe49af] transition text-[#121769] placeholder-[#67246a]/60 bg-[#ebebd3]/30"
                          placeholder={`Your ${field}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#67246a] mb-1">
                      Message <span className="text-[#fe49af]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#ebebd3] rounded-lg focus:ring-2 focus:ring-[#fe49af] focus:border-[#fe49af] transition text-[#121769] placeholder-[#67246a]/60 bg-[#ebebd3]/30 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#fe49af] to-[#121769] text-white font-bold py-3 px-6 rounded-lg hover:from-[#121769] hover:to-[#fe49af] focus:outline-none focus:ring-2 focus:ring-[#fe49af] focus:ring-offset-2 transition-transform transform hover:scale-105 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Contact Information */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ebebd3]"
              >
                <div className="p-8 sm:p-10">
                  <h2 className="text-2xl font-bold text-[#121769] mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-[#ebebd3] rounded-lg p-3">
                        <FiMail className="h-6 w-6 text-[#121769]" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-[#67246a]">Email</h3>
                        <p className="text-[#121769]">support@nurmaa.com</p>
                        <p className="text-[#121769]">sales@nurmaa.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-[#ebebd3] rounded-lg p-3">
                        <FiPhone className="h-6 w-6 text-[#fe49af]" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-[#67246a]">Phone</h3>
                        <p className="text-[#121769]">+1 (555) 123-4567</p>
                        <p className="text-[#67246a]">Mon-Fri: 9AM-5PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-[#ebebd3] rounded-lg p-3">
                        <FiMapPin className="h-6 w-6 text-[#67246a]" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-[#67246a]">Address</h3>
                        <p className="text-[#121769]">123 Business Avenue</p>
                        <p className="text-[#121769]">Suite 456, New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ebebd3]"
              >
                <div className="p-8 sm:p-10">
                  <h2 className="text-2xl font-bold text-[#121769] mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-[#ebebd3] pb-4 last:border-b-0 last:pb-0">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="flex justify-between items-center w-full text-left focus:outline-none"
                        >
                          <h3 className="text-lg font-medium text-[#67246a] hover:text-[#fe49af] transition">
                            {faq.question}
                          </h3>
                          <FiChevronDown className={`h-5 w-5 text-[#fe49af] transition-transform ${activeFaq === index ? 'transform rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeFaq === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-2 text-[#121769]">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Contact;