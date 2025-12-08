'use client'
import React from 'react';
import Link from 'next/link';
import { 
  FaHeartbeat, 
  FaDna, 
  FaPills, 
  FaBrain, 
  FaLungs, 
  FaEye,
  FaStethoscope,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
  FaMobileAlt,
  FaUserMd
} from 'react-icons/fa';
import { GiKidneys } from 'react-icons/gi';

export default function FeaturesPage() {
  const mlModels = [
    {
      id: 'diabetes-prediction',
      title: 'Diabetes Prediction',
      description: 'Predict the likelihood of developing diabetes based on health metrics, lifestyle factors, and genetic markers.',
      icon: <FaChartLine className="text-3xl text-green-600" />,
      color: 'from-green-500 to-emerald-600',
      accuracy: '94%',
      inputs: ['Glucose Level', 'BMI', 'Age', 'Family History', 'Blood Pressure'],
      status: 'Production Ready',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'heart-attack-prediction',
      title: 'Heart Attack Risk Assessment',
      description: 'Assess heart attack risk using ECG data, cholesterol levels, blood pressure, and other cardiovascular indicators.',
      icon: <FaHeartbeat className="text-3xl text-red-600" />,
      color: 'from-red-500 to-pink-600',
      accuracy: '96%',
      inputs: ['ECG Data', 'Cholesterol', 'Blood Pressure', 'Age', 'Smoking Status'],
      status: 'Production Ready',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'insurance-cost-prediction',
      title: 'Insurance Cost Prediction',
      description: 'Predict healthcare insurance costs using demographic data, medical history, and lifestyle factors.',
      icon: <FaShieldAlt className="text-3xl text-blue-600" />,
      color: 'from-blue-500 to-indigo-600',
      accuracy: '89%',
      inputs: ['Age', 'BMI', 'Smoking Status', 'Region', 'Children'],
      status: 'Production Ready',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'parkinsons-detection',
      title: 'Parkinson\'s Disease Detection',
      description: 'Early detection of Parkinson\'s disease using voice recordings and motor function assessments.',
      icon: <FaBrain className="text-3xl text-purple-600" />,
      color: 'from-purple-500 to-violet-600',
      accuracy: '92%',
      inputs: ['Voice Features', 'Motor UPDRS', 'Tremor Data', 'Age', 'Family History'],
      status: 'Clinical Trial',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'cancer-risk-assessment',
      title: 'Cancer Risk Assessment',
      description: 'Assess risk for various cancers using genetic markers, lifestyle factors, and screening results.',
      icon: <FaDna className="text-3xl text-pink-600" />,
      color: 'from-pink-500 to-rose-600',
      accuracy: '91%',
      inputs: ['Genetic Markers', 'Family History', 'Lifestyle', 'Age', 'Previous Screenings'],
      status: 'Research Phase',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'kidney-disease-prediction',
      title: 'Kidney Disease Prediction',
      description: 'Predict chronic kidney disease using blood test results, urine analysis, and medical history.',
      icon: <GiKidneys className="text-3xl text-orange-600" />,
      color: 'from-orange-500 to-amber-600',
      accuracy: '95%',
      inputs: ['Blood Pressure', 'Albumin', 'Serum Creatinine', 'Age', 'Diabetes Status'],
      status: 'Production Ready',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'lung-disease-detection',
      title: 'Lung Disease Detection',
      description: 'Detect respiratory conditions using X-ray images, spirometry results, and symptom analysis.',
      icon: <FaLungs className="text-3xl text-cyan-600" />,
      color: 'from-cyan-500 to-teal-600',
      accuracy: '93%',
      inputs: ['X-ray Images', 'Spirometry', 'Smoking History', 'Symptoms', 'Age'],
      status: 'Clinical Trial',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'retinopathy-detection',
      title: 'Diabetic Retinopathy Detection',
      description: 'Early detection of diabetic retinopathy using retinal scan images and ML image classification.',
      icon: <FaEye className="text-3xl text-indigo-600" />,
      color: 'from-indigo-500 to-blue-600',
      accuracy: '97%',
      inputs: ['Retinal Images', 'Diabetes Duration', 'Blood Sugar Levels', 'Age'],
      status: 'Production Ready',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'medication-recommendation',
      title: 'Personalized Medication',
      description: 'AI-powered medication recommendations based on patient profile, genetics, and drug interactions.',
      icon: <FaPills className="text-3xl text-emerald-600" />,
      color: 'from-emerald-500 to-green-600',
      accuracy: '88%',
      inputs: ['Medical History', 'Genetics', 'Current Meds', 'Age', 'Allergies'],
      status: 'Research Phase',
      statusColor: 'bg-blue-100 text-blue-800'
    }
  ];

  const categories = [
    { name: 'All Models', count: mlModels.length },
    { name: 'Production Ready', count: 5 },
    { name: 'Clinical Trial', count: 2 },
    { name: 'Research Phase', count: 2 },
    { name: 'Cardiovascular', count: 2 },
    { name: 'Chronic Diseases', count: 4 },
  ];

  const stats = [
    { label: 'Total Models', value: mlModels.length },
    { label: 'Average Accuracy', value: '93%' },
    { label: 'Active Users', value: '10K+' },
    { label: 'Clinical Partners', value: '15+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaHeartbeat className="text-3xl text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">HealthAI</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link href="/features" className="text-blue-600 font-medium border-b-2 border-blue-600">Features</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
            <Link href="/documentation" className="text-gray-700 hover:text-blue-600 font-medium">Documentation</Link>
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
            Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Machine Learning Models</h1>
            <p className="text-xl opacity-90 mb-8">
              Explore our comprehensive suite of healthcare prediction models, each designed to address specific medical challenges using state-of-the-art machine learning algorithms.
            </p>
            <div className="flex items-center space-x-4">
              <FaUserMd className="text-2xl opacity-80" />
              <span>Trusted by healthcare professionals worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Filter Models</h3>
              
              <div className="space-y-4 mb-8">
                <h4 className="font-medium text-gray-700">By Status</h4>
                {categories.slice(1, 4).map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input type="checkbox" id={category.name} className="mr-3" />
                      <label htmlFor={category.name} className="text-gray-600">{category.name}</label>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">By Category</h4>
                {categories.slice(4).map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input type="checkbox" id={category.name} className="mr-3" />
                      <label htmlFor={category.name} className="text-gray-600">{category.name}</label>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Need a Custom Model?</h4>
                <p className="text-blue-800 text-sm mb-4">
                  Contact us to develop a custom ML model for your specific healthcare needs.
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
                  Contact Team
                </button>
              </div>
            </div>
          </div>

          {/* Models Grid */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Available Prediction Models</h2>
                <p className="text-gray-600">Click on any model to start making predictions</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sort by: Accuracy (High to Low)</option>
                  <option>Sort by: Name (A-Z)</option>
                  <option>Sort by: Status</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mlModels.map((model) => (
                <Link 
                  href={`/models/${model.id}`} 
                  key={model.id}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border border-gray-200 hover:border-blue-300">
                    {/* Model Header */}
                    <div className={`bg-gradient-to-r ${model.color} p-6 text-white`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${model.statusColor}`}>
                            {model.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{model.accuracy}</div>
                          <div className="text-sm opacity-90">Accuracy</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-6">
                        <div className="mr-4">
                          {model.icon}
                        </div>
                        <h3 className="text-xl font-bold">{model.title}</h3>
                      </div>
                    </div>

                    {/* Model Body */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-6">{model.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">Required Inputs:</h4>
                        <div className="flex flex-wrap gap-2">
                          {model.inputs.slice(0, 4).map((input, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {input}
                            </span>
                          ))}
                          {model.inputs.length > 4 && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              +{model.inputs.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                          Try this model
                          <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        {/* <div className="text-sm text-gray-500">
                          ID: {model.id}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Upcoming Models */}
            <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Upcoming Models</h3>
              <p className="text-gray-300 mb-6">We're continuously expanding our model portfolio. Here's what's coming next:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <FaBrain className="mr-3 text-blue-400" />
                    <h4 className="font-bold">Alzheimer's Early Detection</h4>
                  </div>
                  <p className="text-sm text-gray-300">Using cognitive test results and MRI data</p>
                  <div className="mt-3 text-xs text-blue-300">Expected Q3 2024</div>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <FaMobileAlt className="mr-3 text-green-400" />
                    <h4 className="font-bold">Mental Health Assessment</h4>
                  </div>
                  <p className="text-sm text-gray-300">Based on speech patterns and mobile usage</p>
                  <div className="mt-3 text-xs text-green-300">Expected Q4 2024</div>
                </div>
              </div>
            </div>

            {/* API Access Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">API Access for Developers</h3>
              <p className="text-gray-600 mb-6">
                Integrate our ML models directly into your healthcare applications using our REST API.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition duration-300">
                  View API Documentation
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition duration-300">
                  Request API Key
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <FaHeartbeat className="text-3xl text-blue-400" />
              <span className="text-2xl font-bold">HealthAI</span>
            </div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              <Link href="/" className="hover:text-blue-400 transition duration-300">Home</Link>
              <Link href="/features" className="text-blue-400">Features</Link>
              <Link href="/about" className="hover:text-blue-400 transition duration-300">About</Link>
              <Link href="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>© {new Date().getFullYear()} HealthAI - Healthcare ML Platform</p>
              <p className="mt-1 text-sm">For academic and research purposes</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}