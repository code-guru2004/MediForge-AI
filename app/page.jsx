'use client'
import Link from 'next/link';
import { useState } from 'react';
import { 
  FaHeartbeat, 
  FaBrain, 
  FaUserMd, 
  FaChartLine, 
  FaShieldAlt, 
  FaMobileAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowRight,
  FaCheck
} from 'react-icons/fa';

export default function HealthcareMLHome() {
  const [email, setEmail] = useState('');
  
  const teamMembers = [
    {
      name: "Nayan Das",
      role: "Full Stack Developer",
      bio: "PhD in Medical AI with 8+ years experience in healthcare predictive models",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Souvik Majhi",
      role: "ML Engineer",
      bio: "Specialized in healthcare applications and data visualization",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Arnab Ghorui",
      role: "ML Researcher",
      bio: "Cardiologist with focus on integrating AI into clinical practice",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Niloy Ghorui",
      role: "ML Specialist",
      bio: "Expert in medical imaging analysis and predictive analytics",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const features = [
    {
      icon: <FaBrain className="text-3xl text-blue-600" />,
      title: "Predictive Diagnostics",
      description: "ML algorithms analyze symptoms and medical history to predict potential health issues before they become critical."
    },
    {
      icon: <FaChartLine className="text-3xl text-green-600" />,
      title: "Personalized Health Insights",
      description: "Get tailored health recommendations based on your unique medical data and lifestyle factors."
    },
    {
      icon: <FaUserMd className="text-3xl text-purple-600" />,
      title: "Virtual Health Assistant",
      description: "24/7 AI-powered assistant to answer health queries and guide you to appropriate care."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-red-600" />,
      title: "Data Security & Privacy",
      description: "Bank-level encryption and compliance with healthcare data protection regulations (HIPAA)."
    },
    {
      icon: <FaHeartbeat className="text-3xl text-pink-600" />,
      title: "Real-time Monitoring",
      description: "Connect wearable devices for continuous health monitoring and anomaly detection."
    },
    {
      icon: <FaMobileAlt className="text-3xl text-indigo-600" />,
      title: "Accessible Anywhere",
      description: "Mobile-first design with offline capabilities for remote and underserved areas."
    }
  ];

  const techStack = [
    { name: "Next.js", color: "bg-black text-white" },
    { name: "React.js", color: "bg-orange-500 text-white" },
    { name: "Tailwind CSS", color: "bg-teal-500 text-white" },
    { name: "FastAPI", color: "bg-green-600 text-white" },
    { name: "Python", color: "bg-blue-700 text-white" },
   
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaHeartbeat className="text-3xl text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">HealthAI</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
            <a href="#team" className="text-gray-700 hover:text-blue-600 font-medium">Team</a>
            <a href="#vision" className="text-gray-700 hover:text-blue-600 font-medium">Vision</a>
            <a href="#future" className="text-gray-700 hover:text-blue-600 font-medium">Future Scope</a>
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
            Try Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-18">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Revolutionizing Healthcare with 
              <span className="text-blue-600"> Machine Learning</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 mb-10">
              A predictive healthcare platform that uses advanced ML algorithms to provide personalized health insights, early disease detection, and intelligent treatment recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/features" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                Get Started <FaArrowRight className="ml-2" />
              </Link>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-50 transition duration-300">
                View Documentation
              </button>
            </div>
            
            <div className="mt-12">
              <h3 className="font-medium text-gray-700 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <span key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${tech.color}`}>
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl w-80 h-80 md:w-96 md:h-96 shadow-2xl flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <FaHeartbeat className="text-8xl mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold mb-4">AI-Powered Healthcare</h3>
                  <p className="opacity-90">Predictive analytics for better health outcomes</p>
                </div>
              </div>
              <div className="absolute -bottom-9 -left-6 bg-white p-6 rounded-xl shadow-xl w-64">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <FaCheck className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">95% Accuracy</h4>
                    <p className="text-gray-600 text-sm">in early disease prediction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge machine learning with healthcare expertise to deliver powerful tools for patients and providers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Vision</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <p className="text-lg text-gray-700 mb-6">
                  We envision a world where AI-powered healthcare is accessible to everyone, regardless of location or socioeconomic status. A future where predictive medicine prevents diseases before they manifest, and personalized treatment plans are the standard of care.
                </p>
                <p className="text-lg text-gray-700">
                  By 2030, we aim to reduce diagnostic errors by 40% and improve early detection of chronic diseases by 60% through our AI-driven platform.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl">
                <p className="text-lg text-gray-700 mb-6">
                  To develop and deploy ethical, accurate, and accessible machine learning solutions that empower healthcare providers and patients with data-driven insights for better health outcomes.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FaCheck className="text-green-600 mt-1 mr-3" />
                    <span className='text-gray-500'>Democratize access to AI-powered diagnostic tools</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-600 mt-1 mr-3" />
                    <span className='text-gray-500'>Ensure data privacy and security as a fundamental right</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-600 mt-1 mr-3" />
                    <span className='text-gray-500'>Collaborate with medical institutions for clinical validation</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-600 mt-1 mr-3" />
                    <span className='text-gray-500'>Continuously improve algorithm accuracy with real-world data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A multidisciplinary team of ML engineers, healthcare professionals, and software developers dedicated to revolutionizing healthcare.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <div className="p-6 -mt-12">
                  <div className="flex justify-center">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mt-4 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-center mb-4">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.bio}</p>
                  <div className="flex justify-center space-x-4 mt-6">
                    <a href="#" className="text-gray-400 hover:text-blue-600">
                      <FaLinkedin className="text-xl" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-900">
                      <FaGithub className="text-xl" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-400">
                      <FaTwitter className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section id="future" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Future Scope</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our roadmap includes innovative features and expansions to further transform healthcare delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-2xl">
              <div className="text-5xl font-bold mb-4">2025</div>
              
              <h3 className="text-xl font-bold mb-4">Genomic Integration</h3>
              <p>Incorporating genetic data for personalized disease risk assessment and treatment plans.</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-8 rounded-2xl">
              <div className="text-5xl font-bold mb-4">2025</div>
              <h3 className="text-xl font-bold mb-4">IoT Device Ecosystem</h3>
              <p>Expanding integration with medical IoT devices for continuous remote patient monitoring.</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 rounded-2xl">
              <div className="text-5xl font-bold mb-4">2026+</div>
              <h3 className="text-xl font-bold mb-4">Global Health Network</h3>
              <p>Creating a federated learning network across hospitals worldwide while maintaining data privacy.</p>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Stay Updated</h3>
            <p className="text-gray-700 mb-8 max-w-2xl">
              Subscribe to our newsletter to receive updates on our research, new features, and healthcare AI insights.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <FaHeartbeat className="text-3xl text-blue-400" />
              <span className="text-2xl font-bold">HealthAI</span>
            </div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="#" className="hover:text-blue-400 transition duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition duration-300">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition duration-300">Contact</a>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition duration-300">
                <FaGithub />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition duration-300">
                <FaLinkedin />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition duration-300">
                <FaTwitter />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} HealthAI - Final Year Project. This is a demonstration of a healthcare ML application.</p>
            <p className="mt-2">Built with Next.js, Tailwind CSS, and TensorFlow.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
}