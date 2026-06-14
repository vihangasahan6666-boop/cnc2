import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { ContactSubmission } from '../types';
import { useToast } from './ToastContext';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export default function ContactView() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [successSubmission, setSuccessSubmission] = useState<ContactSubmission | null>(null);

  // Retrieve previous submissions from localStorage for user verification
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('cnc_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const nameTrimmed = form.name.trim();
    const emailTrimmed = form.email.trim();
    const phoneTrimmed = form.phone.trim();
    const messageTrimmed = form.message.trim();

    if (!nameTrimmed) {
      newErrors.name = 'Name is required';
    }
    
    // Either email address or phone number is required
    if (!emailTrimmed && !phoneTrimmed) {
      newErrors.email = 'At least email or phone number is required';
      newErrors.phone = 'At least email or phone number is required';
    } else {
      if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
        newErrors.email = 'Please provide a valid email address';
      }
      if (phoneTrimmed && !/^\+?[\d\s-]{7,15}$/.test(phoneTrimmed)) {
        newErrors.phone = 'Provide a valid phone format';
      }
    }
    
    if (!messageTrimmed) {
      newErrors.message = 'Please type a brief message';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      toast('Please correct the validation errors on the form.', 'error');
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    const docId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 9);
    
    const docData = {
      id: docId,
      name: form.name.trim(),
      email: form.email.trim() || '',
      phone: form.phone.trim() || '',
      subject: form.subject || null, // save like null or did not fill
      message: form.message.trim(),
      createdAt: new Date().toISOString()
    };

    // Construct local type representation to update local auditing
    const newSubmission: ContactSubmission = {
      id: docId,
      name: docData.name,
      email: docData.email,
      phone: docData.phone,
      subject: docData.subject || "did not fill",
      message: docData.message,
      createdAt: new Date().toLocaleString()
    };

    try {
      // Save directly to raw Firebase firestore cloud database
      await setDoc(doc(db, 'submissions', docId), docData);

      // Successfully saved, now sync with localStorage audit list
      const existing = [...submissions, newSubmission];
      localStorage.setItem('cnc_submissions', JSON.stringify(existing));
      setSubmissions(existing);
      
      setSuccessSubmission(newSubmission);
      toast('Your message has been secure-saved into Google Firebase!', 'success');

      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch (err: any) {
      console.error('Failed to transmit to Firebase Firestore:', err);
      toast('Transmission failed to complete.', 'error');
      try {
        handleFirestoreError(err, OperationType.CREATE, `submissions/${docId}`);
      } catch (innerError) {
        // Managed or logged
      }
    } finally {
      setIsSending(false);
    }
  };

  // Submissions are immortalized and cannot be deleted after being submitted

  return (
    <div className="space-y-24 pb-20 px-6 md:px-16 lg:px-24 py-12 font-manrope">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT COLUMN: GET IN TOUCH DETAILS */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <span className="text-eco-green font-bold text-sm uppercase tracking-widest block">
              Direct Channels
            </span>
            <h2 className="text-4xl font-extrabold font-manrope text-white uppercase tracking-wider">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg font-hanken">
              Whether you are a local family office, a business looking to certify offsets, an academic group, or an interested volunteer — we would love to hear from you. Reach out today.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Address */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full bg-eco-green flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 text-charcoal shadow-md">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Office Address</p>
                <p className="text-white text-base font-medium font-hanken">
                  No:265, Serpentine Road, Borella, Colombo, Sri Lanka
                </p>
              </div>
            </div>

            {/* Telephone */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full bg-eco-green flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 text-charcoal shadow-md">
                <Phone className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hotline Phone</p>
                <a
                  href="tel:0716205405"
                  className="text-white text-base font-medium font-hanken hover:text-eco-green transition-colors"
                >
                  0716205405
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full bg-eco-green flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 text-charcoal shadow-md">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Channel</p>
                <a
                  href="mailto:Carbonneutralcommunity@gmail.com"
                  className="text-white text-base font-medium font-hanken hover:text-eco-green transition-colors"
                >
                  Carbonneutralcommunity@gmail.com
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 space-y-4">
            <span className="text-xs uppercase font-extrabold text-[#ffd700] tracking-[0.2em] block">
              Response Commitment
            </span>
            <p className="text-sm text-gray-400 font-hanken leading-relaxed max-w-sm">
              Our registered environmental advisors attempt to screen and reply to all digital inquiries within 24 operational hours.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: SEND A MESSAGE FORM */}
        <div className="bg-carbon-dark/80 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-carbon-border shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {!successSubmission ? (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-white text-2xl font-extrabold font-manrope">Send a Message</h3>
                  <p className="text-gray-500 text-xs mt-1">Fields marked with simple validation are processed securely.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full bg-transparent border-b ${
                        errors.name ? 'border-red-500' : 'border-white/10'
                      } py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-eco-green transition-colors font-hanken text-base`}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs flex items-center mt-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full bg-transparent border-b ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-eco-green transition-colors font-hanken text-base`}
                      placeholder="E-mail Address"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs flex items-center mt-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`w-full bg-transparent border-b ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      } py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-eco-green transition-colors font-hanken text-base`}
                      placeholder="Phone Number"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-xs flex items-center mt-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" />
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Subject Dropdown */}
                  <div className="relative">
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#0e1a14] border-b border-white/10 py-3 text-white focus:outline-none focus:border-eco-green transition-colors font-hanken text-base cursor-pointer"
                    >
                      <option value="" className="text-gray-500">Subject (Optional)</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Corporate Partnership">Corporate Partnership</option>
                      <option value="Join a CNC Club">Join a CNC Club</option>
                      <option value="Family Carbon Program">Family Carbon Program</option>
                      <option value="Volunteer With Us">Volunteer With Us</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className={`w-full bg-transparent border-b ${
                        errors.message ? 'border-red-500' : 'border-white/10'
                      } py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-eco-green transition-colors resize-none font-hanken text-base`}
                      placeholder="Message"
                    />
                    {errors.message && (
                      <span className="text-red-500 text-xs flex items-center mt-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed font-hanken">
                    By submitting, you agree to the processing of your personal carbon data by CNC as described in our{' '}
                    <a href="#" className="underline text-eco-green hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                    .
                  </p>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-eco-green hover:bg-[#ffd700] hover:text-black text-nature-black font-extrabold py-4 rounded-full uppercase tracking-widest text-xs transition-all duration-300 mt-4 active:scale-98 flex items-center justify-center space-x-2 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSending ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Transmitting...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-eco-green/10 text-eco-green">
                    <CheckCircle className="h-16 w-16" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white text-3xl font-extrabold font-manrope">Thank You!</h3>
                  <p className="text-eco-green font-medium text-sm">
                    Your climate inquiry was transmitted successfully.
                  </p>
                </div>

                <div className="bg-[#0e1a14] border border-[#26352c] rounded-2xl p-5 text-left space-y-3 max-w-md mx-auto text-xs text-gray-300 font-hanken">
                  <p className="border-b border-white/5 pb-2 font-bold text-gray-400 uppercase tracking-widest">
                    Transmission Receipt:
                  </p>
                  <p>
                    <strong className="text-white">Partner Name:</strong> {successSubmission.name}
                  </p>
                  <p>
                    <strong className="text-white">Channel Interest:</strong> {successSubmission.subject}
                  </p>
                  <p>
                    <strong className="text-white">Email Address:</strong> {successSubmission.email}
                  </p>
                  <p>
                    <strong className="text-white">Submitted:</strong> {successSubmission.createdAt}
                  </p>
                </div>

                <button
                  onClick={() => setSuccessSubmission(null)}
                  className="px-8 py-3 bg-[#ffd700] hover:bg-[#e6c200] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* FOOTPRINT AUDIT SUBMISSIONS DISPLAY - CRITICAL TRUST BUILDING */}
      {submissions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto bg-carbon-surface/30 border border-carbon-border p-6 rounded-[2rem] space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-manrope font-bold text-base">Local Submissions Audit Log</h4>
              <p className="text-xs text-gray-500 mt-0.5">Stored securely in your local environment, verification only. Submissions are undeletable.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submissions.map((sub) => (
              <div 
                key={sub.id} 
                className="bg-nature-black/70 p-4 rounded-xl border border-white/5 space-y-2 text-xs font-hanken text-gray-400"
              >
                <div className="flex justify-between border-b border-white/5 pb-1.5 font-bold">
                  <span className="text-white">{sub.name}</span>
                  <span className="text-eco-green">{sub.subject}</span>
                </div>
                <p className="italic">"{sub.message}"</p>
                <div className="flex justify-between text-[10px] text-gray-600">
                  <span>{sub.email} | {sub.phone}</span>
                  <span>{sub.createdAt}</span>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      )}

    </div>
  );
}
