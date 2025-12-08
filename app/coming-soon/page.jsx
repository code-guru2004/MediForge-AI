'use client';
import React, { useState, useEffect } from 'react';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        } else if (days > 0) {
          return { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return prevTime; // Timer has ended
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle email submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log(`Email submitted: ${email}`);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset submission status after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  // Social media icons
  const socialLinks = [
    { name: 'Facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
    { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
    { name: 'Instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z' },
    { name: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full mx-auto text-center">
        {/* Logo */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <span className="text-white text-2xl font-bold">CS</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">ComingSoon</h1>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Something{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Amazing
          </span>{' '}
          is Coming
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          We're working hard to bring you an incredible new experience. Our site is under construction, but we'll be launching soon! Stay tuned for updates.
        </p>

        {/* Countdown timer */}
        <div className="flex justify-center space-x-4 md:space-x-8 mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
                <span className="text-3xl md:text-5xl font-bold text-gray-900">{value.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-gray-500 mt-2 text-sm md:text-base capitalize">{unit}</span>
            </div>
          ))}
        </div>

        {/* Email subscription form */}
        <div className="max-w-lg mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Notified When We Launch</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter to receive updates and early access.</p>
          
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-md">
              <p className="font-medium">Thank you for subscribing! We'll notify you when we launch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>

        {/* Social media links */}
        <div className="mb-12">
          <h3 className="text-gray-700 mb-6">Follow us for updates</h3>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href="#"
                className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all"
                aria-label={social.name}
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} ComingSoon. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Made with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;