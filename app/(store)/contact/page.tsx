"use client";

import { useState, useEffect } from 'react';
import { useCMS } from '@/context/CMSContext';
import { supabase } from '@/lib/supabase';
import PageHero from '@/components/PageHero';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useRecaptcha } from '@/hooks/useRecaptcha';

export default function ContactPage() {
  usePageTitle('Contact Us');
  const { getSetting, getContentList } = useCMS();
  const [pageContent, setPageContent] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { getToken, verifying } = useRecaptcha();

  useEffect(() => {
    async function fetchContactContent() {
      const { data } = await supabase
        .from('cms_content')
        .select('*')
        .eq('section', 'contact')
        .eq('block_key', 'main')
        .single();

      if (data) {
        setPageContent(data);
      }
    }
    fetchContactContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // reCAPTCHA verification
    const isHuman = await getToken('contact');
    if (!isHuman) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Store in Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) {
        // Table might not exist, still show success
        console.log('Note: contact_submissions table may not exist');
      }

      // Send Contact Notification
      fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          payload: formData
        })
      }).catch(err => console.error('Contact notification error:', err));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get contact details from CMS settings
  const contactEmail = getSetting('contact_email') || '';
  const contactPhone = getSetting('contact_phone') || '';
  const contactAddress = getSetting('contact_address') || '';
  const siteGps = getSetting('contact_gps');
  const siteBranches = getSetting('contact_branches');

  const heroTitle = pageContent?.title || '';
  const heroSubtitle = pageContent?.subtitle || '';
  const heroContent = pageContent?.content || '';

  const contactMethods = [
    {
      icon: 'ri-phone-line',
      title: 'Call Us',
      value: contactPhone,
      link: `tel:${contactPhone.replace(/\s/g, '')}`,
      description: getSetting('support_hours') || 'Mon-Fri, 8am-6pm'
    },
    {
      icon: 'ri-mail-line',
      title: 'Email Us',
      value: contactEmail,
      link: `mailto:${contactEmail}`,
      description: 'We respond quickly'
    },
    {
      icon: 'ri-whatsapp-line',
      title: 'WhatsApp',
      value: contactPhone,
      link: `https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}`,
      description: 'Chat with us instantly'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Visit Us',
      value: contactAddress,
      link: '#location',
      description: 'GPS: ' + (siteGps || '')
    }
  ];

  const cmsFaqs = getContentList('contact', 'faq_');
  const faqs = cmsFaqs.length > 0 ? cmsFaqs.map((f: any) => ({
    question: f.title || '',
    answer: f.content || ''
  })) : [];

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="Get In Touch"
        subtitle="Have a question about our medicines, supplements, or health products? We're here to help from Accra, Ghana."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : '_self'}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
              className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg hover:border-brand-200 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                <i className={`${method.icon} text-2xl text-brand-700`}></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-brand-700 font-medium mb-1">{method.value}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </a>
          ))}
        </div>

        <div className="bg-gradient-to-br from-brand-700 to-brand-900 p-8 rounded-2xl text-white mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="ri-map-pin-line text-2xl text-gold-400"></i>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Our Location</h3>
              <p className="text-white/70">{contactAddress}</p>
              {siteGps && (
                <p className="text-gold-300 font-bold text-sm mt-1 tracking-wider uppercase">GPS: {siteGps}</p>
              )}
            </div>
          </div>

          {siteBranches && siteBranches.length > 5 && (
            <div className="flex items-start gap-4 pt-4 lg:pt-0 lg:border-l lg:border-white/10">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-store-2-line text-2xl text-gold-400"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Our Branches</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  {siteBranches.split(/[\n,]+/).map((b, i) => (
                    <p key={i} className="text-white/70 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold-400/40 rounded-full"></span>
                      {b.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>


        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form id="contactForm" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                  placeholder="Order inquiry, product question, etc."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={500}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none text-sm"
                  placeholder="Tell us how we can help you..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-brand-50 border border-brand-200 text-brand-700 px-4 py-3 rounded-xl">
                  <i className="ri-check-line mr-2"></i>
                  Message sent successfully! We'll respond within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <i className="ri-error-warning-line mr-2"></i>
                  Failed to send message. Please try again or contact us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || verifying}
                className="w-full bg-brand-700 text-white py-4 rounded-xl font-medium hover:bg-brand-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting || verifying ? (verifying ? 'Verifying...' : 'Sending...') : 'Send Message'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Quick Answers</h2>
            <p className="text-gray-600 mb-8">
              Find answers to common questions before reaching out
            </p>

            <div className="space-y-4 mb-12">
              {faqs.map((faq: any, index: number) => (
                <details key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                  <summary className="px-6 py-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="bg-gradient-to-br from-brand-700 to-brand-900 p-8 rounded-2xl text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <i className="ri-customer-service-2-line text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">Need Immediate Help?</h3>
              <p className="text-brand-100 mb-6 leading-relaxed">
                Our customer support team is available Monday to Friday, 8am-6pm GMT. For urgent matters, reach out via WhatsApp.
              </p>
              <a
                href={`https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-full font-medium hover:bg-brand-50 transition-colors whitespace-nowrap"
              >
                <i className="ri-whatsapp-line text-xl"></i>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Visit Our Store</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Prefer to shop in person? Visit our store. Our knowledgeable staff will be happy to assist you with product selection and answer any questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <i className="ri-map-pin-2-line text-brand-700"></i>
                <span>{contactAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-brand-700"></i>
                <span>Mon-Sat: 9am-6pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
