import React, { useState } from 'react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Yup-style validation function
  const validateForm = (data) => {
    const errors = {};
    
    // Name validation
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (data.name.length > 50) {
      errors.name = 'Name must be less than 50 characters';
    }

    // Email validation
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }

    // Subject validation
    if (!data.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (data.subject.length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    } else if (data.subject.length > 100) {
      errors.subject = 'Subject must be less than 100 characters';
    }

    // Message validation
    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (data.message.length > 500) {
      errors.message = 'Message must be less than 500 characters';
    }

    return errors;
  };

  // Simulated API call (replace with real axios call)
  const submitToAPI = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate API call
        console.log('Submitting form data:', data);
        
        // Simulate success (90% chance) or error (10% chance)
        if (Math.random() > 0.1) {
          resolve({ success: true, message: 'Message sent successfully!' });
        } else {
          reject(new Error('API Error: Unable to send message'));
        }
      }, 1500);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate form data
      const validationErrors = validateForm(formData);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});

      // Send data to API (replace with real axios.post('/api/contact', formData))
      await submitToAPI(formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Message sent successfully! We'll get back to you soon.
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Something went wrong. Please try again later.
            </div>
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="What's this about?"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tell us more about your inquiry..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
              } text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;