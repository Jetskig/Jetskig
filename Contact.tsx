import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, SOCIAL_LINKS } from '../constants';
import { ContactFormState, SubmitStatus } from '../types';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot check
    if (formState.honeypot) return;

    setStatus('submitting');

    try {
      if (formRef.current) {
        await emailjs.sendForm(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          formRef.current,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '', honeypot: '' });
        
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h2>
          <p className="text-gray-400">Projeleriniz veya sorularınız için bize ulaşın.</p>
        </motion.div>

        <div className="bg-dark-gray border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Contact Info (Only Email as requested) */}
            <div className="md:w-1/3 flex flex-col justify-center items-start space-y-6">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 w-full">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-white text-black p-3 rounded-lg">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">Email</h4>
                      <p className="text-xs text-gray-400">Her zaman ulaşılabilir</p>
                    </div>
                  </div>
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-sm hover:underline block mt-2 break-all">
                    {SOCIAL_LINKS.email}
                  </a>
               </div>
               
               <p className="text-sm text-gray-500 leading-relaxed">
                 Telefon ve adres bilgileri yerine, dijital dünyada bize en hızlı ulaşabileceğiniz yöntem e-postadır. Genellikle 24 saat içinde dönüş yapıyoruz.
               </p>
            </div>

            {/* Form */}
            <div className="md:w-2/3">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">İsim</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      placeholder="Adınız"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">Konu</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Mesaj</label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none"
                    placeholder="Bize ne söylemek istersiniz?"
                  ></textarea>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: 'none' }}
                  value={formState.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    status === 'success' 
                      ? 'bg-green-600 text-white' 
                      : status === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {status === 'submitting' && (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {status === 'idle' && (
                    <>
                      <span>Gönder</span>
                      <Send size={18} />
                    </>
                  )}
                  {status === 'submitting' && <span>Gönderiliyor...</span>}
                  {status === 'success' && (
                    <>
                      <span>Mesaj Gönderildi</span>
                      <CheckCircle size={18} />
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      <span>Hata Oluştu</span>
                      <AlertCircle size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
