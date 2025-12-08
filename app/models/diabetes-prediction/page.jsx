'use client'
import React, { useState } from 'react';
import Link from 'next/link';

import { 
  FaHeartbeat, 
  FaArrowLeft,
  FaUpload,
  FaChartLine,
  FaThermometerHalf,
  FaWeight,
  FaDna,
  FaUser,
  FaVial,
  FaSyringe,
  FaHeart,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaSpinner
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DiabetesPrediction() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Pregnancies: 2,
    Glucose: 85,
    BloodPressure: 62,
    SkinThickness: 20,
    Insulin: 66,
    BMI: 26.6,
    DiabetesPedigreeFunction: 0.351,
    Age: 29
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
  
    const startTime = performance.now(); // ⏱️ Start timing
  
    try {
      const resp = await axios.post(
        "https://diabetes-prediction-svm-gkt7.onrender.com/predict",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      const endTime = performance.now(); // ⏱️ End timing
      const timeTaken = (endTime - startTime).toFixed(2); // convert ms → readable number
  
      console.log(`Response Time: ${timeTaken} ms`);
  
      // Attach timeTaken into prediction object
      setPrediction({
        ...resp.data,
        response_time: timeTaken,
      });
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleReset = () => {
    setFormData({
      Pregnancies: 2,
      Glucose: 85,
      BloodPressure: 62,
      SkinThickness: 20,
      Insulin: 66,
      BMI: 26.6,
      DiabetesPedigreeFunction: 0.351,
      Age: 29
    });
    setPrediction(null);
    setError(null);
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Not Diabetic': return 'bg-green-100 text-green-800 border-green-300';
      case 'Diabetic': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRiskIcon = (risk) => {
    switch(risk) {
      case 'Low': return <FaCheckCircle className="text-green-600" />;
      case 'Medium': return <FaExclamationTriangle className="text-yellow-600" />;
      case 'High': return <FaHeart className="text-red-600" />;
      default: return <FaInfoCircle className="text-blue-600" />;
    }
  };

  const ranges = {
    Glucose: { min: 50, max: 200, normal: "70-140 mg/dL" },
    BloodPressure: { min: 60, max: 120, normal: "<120/80 mmHg" },
    BMI: { min: 15, max: 50, normal: "18.5-24.9" },
    Age: { min: 1, max: 120, normal: "N/A" },
    Pregnancies: { min: 0, max: 20, normal: "N/A" },
    SkinThickness: { min: 0, max: 100, normal: "7-35 mm" },
    Insulin: { min: 0, max: 200, normal: "16-166 pmol/L" },
    DiabetesPedigreeFunction: { min: 0.08, max: 2.5, normal: "N/A" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <FaArrowLeft className="text-gray-600 text-lg sm:text-xl" />
                <FaHeartbeat className="text-2xl sm:text-3xl text-blue-600" />
                <span className="text-lg sm:text-2xl font-bold text-gray-800 hidden sm:block">HealthAI</span>
              </Link>
              <div className="hidden sm:block ml-2 pl-2 border-l border-gray-300">
                <span className="text-sm text-gray-600">Diabetes Prediction Model</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/features" className="text-sm sm:text-base text-gray-700 hover:text-blue-600 font-medium">
                All Models
              </Link>
              <button 
                onClick={() => router.push('/features')}
                className="bg-blue-600 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
              >
                Back to Models
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Left Panel - Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaChartLine className="text-3xl sm:text-4xl text-green-600 mr-3 sm:mr-4" />
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Diabetes Risk Prediction</h1>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      Enter patient health metrics to assess diabetes risk using our ML model
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                  <span className="bg-green-100 text-green-800 text-xs sm:text-sm px-3 py-1 rounded-full flex items-center">
                    <FaCheckCircle className="mr-2" /> 80% Accuracy
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-3 py-1 rounded-full flex items-center">
                    <FaVial className="mr-2" /> Clinical Validation
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs sm:text-sm px-3 py-1 rounded-full flex items-center">
                    <FaDna className="mr-2" /> ML-Powered
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {/* Glucose */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <FaThermometerHalf className="mr-2 text-blue-600" />
                        Glucose (mg/dL)
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="Glucose"
                        value={formData.Glucose}
                        onChange={handleInputChange}
                        min={ranges.Glucose.min}
                        max={ranges.Glucose.max}
                        step="0.1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                        required
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Normal: {ranges.Glucose.normal}
                      </div>
                    </div>
                  </div>

                  {/* Blood Pressure */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <FaHeart className="mr-2 text-red-600" />
                        Blood Pressure (mmHg)
                      </div>
                    </label>
                    <input
                      type="number"
                      name="BloodPressure"
                      value={formData.BloodPressure}
                      onChange={handleInputChange}
                      min={ranges.BloodPressure.min}
                      max={ranges.BloodPressure.max}
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                      required
                    />
                    <div className="text-xs text-gray-500">
                      Normal: {ranges.BloodPressure.normal}
                    </div>
                  </div>

                  {/* BMI */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <FaWeight className="mr-2 text-green-600" />
                        BMI
                      </div>
                    </label>
                    <input
                      type="number"
                      name="BMI"
                      value={formData.BMI}
                      onChange={handleInputChange}
                      min={ranges.BMI.min}
                      max={ranges.BMI.max}
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                      required
                    />
                    <div className="text-xs text-gray-500">
                      Normal: {ranges.BMI.normal}
                    </div>
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <FaUser className="mr-2 text-purple-600" />
                        Age
                      </div>
                    </label>
                    <input
                      type="number"
                      name="Age"
                      value={formData.Age}
                      onChange={handleInputChange}
                      min={ranges.Age.min}
                      max={ranges.Age.max}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                      required
                    />
                  </div>

                  {/* Pregnancies */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Pregnancies
                    </label>
                    <input
                      type="number"
                      name="Pregnancies"
                      value={formData.Pregnancies}
                      onChange={handleInputChange}
                      min={ranges.Pregnancies.min}
                      max={ranges.Pregnancies.max}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                      required
                    />
                  </div>

                  {/* Skin Thickness */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Skin Thickness (mm)
                    </label>
                    <input
                      type="number"
                      name="SkinThickness"
                      value={formData.SkinThickness}
                      onChange={handleInputChange}
                      min={ranges.SkinThickness.min}
                      max={ranges.SkinThickness.max}
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                      required
                    />
                    <div className="text-xs text-gray-500">
                      Normal: {ranges.SkinThickness.normal}
                    </div>
                  </div>

                  {/* Insulin */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <FaSyringe className="mr-2 text-blue-600" />
                        Insulin (μU/ml)
                      </div>
                    </label>
                    <input
                      type="number"
                      name="Insulin"
                      value={formData.Insulin}
                      onChange={handleInputChange}
                      min={ranges.Insulin.min}
                      max={ranges.Insulin.max}
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                      required
                    />
                    <div className="text-xs text-gray-500">
                      Normal: {ranges.Insulin.normal}
                    </div>
                  </div>

                  {/* Diabetes Pedigree Function */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Diabetes Pedigree Function
                    </label>
                    <input
                      type="number"
                      name="DiabetesPedigreeFunction"
                      value={formData.DiabetesPedigreeFunction}
                      onChange={handleInputChange}
                      min={ranges.DiabetesPedigreeFunction.min}
                      max={ranges.DiabetesPedigreeFunction.max}
                      step="0.001"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-600"
                      required
                    />
                    <div className="text-xs text-gray-500">
                      Genetic influence score
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 sm:py-4 px-6 rounded-lg font-medium hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-3" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FaChartLine className="mr-3" />
                        Predict Diabetes Risk
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 sm:py-4 px-6 rounded-lg font-medium hover:bg-gray-200 transition duration-300 border border-gray-300"
                  >
                    Reset Form
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex-1 bg-blue-50 text-blue-700 py-3 sm:py-4 px-6 rounded-lg font-medium hover:bg-blue-100 transition duration-300 border border-blue-200 flex items-center justify-center"
                  >
                    <FaInfoCircle className="mr-3" />
                    {showDetails ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
              </form>

              {/* Details Panel */}
              {showDetails && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Model</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Model Information</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Algorithm: Support Vector Machine (SVM)</li>
                        <li>• Training Data: Pima Indians Diabetes Dataset</li>
                        <li>• Features: 8 clinical parameters</li>
                        <li>• Validation Accuracy: 77.2%</li>
                        <li>• Last Updated: Dec 2025</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Clinical Guidelines</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Results should be interpreted by healthcare professionals</li>
                        <li>• Model is a screening tool, not a diagnostic tool</li>
                        <li>• Regular screening recommended for high-risk individuals</li>
                        <li>• Consult physician for abnormal results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 sticky top-24">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Prediction Results</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center text-red-700">
                    <FaExclamationTriangle className="mr-3" />
                    <span className="font-medium">Error: {error}</span>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
                  <p className="text-gray-600">Analyzing patient data...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                </div>
              ) : prediction ? (
                <div className="space-y-6">
                  {/* Risk Level */}
                  <div className={`p-4 sm:p-6 rounded-xl border-2 ${getRiskColor(prediction.prediction)}`}>
                    <div className="flex flex-col gap-3  items-center justify-center mb-4">
                      <div className="flex items-start">
                        {getRiskIcon(prediction.prediction)}
                        <h3 className="text-lg sm:text-xl font-bold ml-3">Risk Assessment</h3>
                      </div>
                      <span className="text-2xl sm:text-3xl font-bold text-center">
                        {prediction.prediction}
                      </span>
                    </div>
                    
                    {/* <div className="text-center py-4">
                      <div className="text-5xl sm:text-6xl font-bold mb-2">
                        {prediction.risk_level}
                      </div>
                      <p className="text-gray-600">
                        {prediction.risk_level === 'High' 
                          ? 'High probability of diabetes detected'
                          : prediction.risk_level === 'Medium'
                          ? 'Moderate risk - further evaluation recommended'
                          : 'Low probability of diabetes'
                        }
                      </p>
                    </div> */}
                  </div>

                  {/* Probability & Confidence */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-blue-700 mb-1">Time Taken</div>
                      <div className="text-xl font-bold text-blue-900">
                        {(prediction.response_time)} <span className='text-sm'>ms</span>
                      </div>
                      <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${prediction.probability * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-700 mb-1">Confidence</div>
                      <div className="text-3xl font-bold text-green-900">
                        {prediction.confidence}%
                      </div>
                      <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                    </div> */}
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-3">Recommendations</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {prediction.prediction === 'Diabetic' && (
                        <>
                          <li className="flex items-start">
                            <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                            <span>Consult a healthcare provider immediately for confirmatory testing</span>
                          </li>
                          <li className="flex items-start">
                            <FaHeart className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                            <span>Schedule HbA1c and fasting glucose tests</span>
                          </li>
                        </>
                      )}
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Maintain regular physical activity (30 mins/day)</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Follow a balanced diet low in processed sugars</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Monitor blood glucose levels regularly</span>
                      </li>
                    </ul>
                  </div>

                  {/* Timestamp */}
                  <div className="text-xs text-gray-500 text-center pt-4 border-t">
                    Prediction generated: {new Date(prediction.timestamp).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaChartLine className="text-3xl sm:text-4xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Prediction Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Enter patient data and click "Predict Diabetes Risk" to get results
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>All predictions are confidential</p>
                    <p className="mt-1">Results are for screening purposes only</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <FaInfoCircle className="mr-2 text-blue-600" />
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Fasting glucose should be measured after 8 hours of no food</li>
                <li>• BMI calculation: weight(kg) / height(m)²</li>
                <li>• Normal blood pressure is below 120/80 mmHg</li>
                <li>• Regular screening recommended for ages 45+</li>
                <li>• Family history increases diabetes risk</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Info Section */}
        <div className="mt-8 sm:mt-12 bg-gray-900 text-white rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">API Access Available</h3>
              <p className="text-gray-300">
                Integrate this prediction model into your healthcare applications
              </p>
            </div>
            {/* <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 whitespace-nowrap">
              View API Documentation
            </button> */}
          </div>
          <div className="mt-6 p-4 bg-gray-800 rounded-lg overflow-x-auto">
            <code className="text-sm text-green-300">
              POST --- https://diabetes-prediction-svm-gkt7.onrender.com/predict<br/>
              Content-Type: application/json<br/>
              {JSON.stringify(formData, null, 2)}
            </code>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <FaHeartbeat className="text-2xl sm:text-3xl text-blue-400" />
              <div>
                <span className="text-xl sm:text-2xl font-bold">HealthAI</span>
                <p className="text-gray-400 text-sm mt-1">Diabetes Prediction Model</p>
              </div>
            </div>
            
            <div className="flex space-x-4 sm:space-x-6 mb-6 md:mb-0">
              <Link href="/features" className="hover:text-blue-400 transition duration-300 text-sm sm:text-base">
                All Models
              </Link>
              <Link href="/privacy" className="hover:text-blue-400 transition duration-300 text-sm sm:text-base">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:text-blue-400 transition duration-300 text-sm sm:text-base">
                Contact
              </Link>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} HealthAI - For Educational Purposes
              </p>
              <p className="text-gray-500 text-xs mt-1">
                This tool assists healthcare professionals and is not a diagnostic device
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}