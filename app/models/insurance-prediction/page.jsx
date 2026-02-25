'use client';
import React, { useState } from "react";
import { 
  Calculator, 
  User, 
  Scale, 
  Users, 

  MapPin, 
  DollarSign,
  Loader2,
  TrendingUp,
  Shield
} from "lucide-react";

const App = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "1",
    bmi: "",
    children: "",
    smoker: "1",
    region: "0",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://insurance-fyp.onrender.com/predict";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(formData.age),
          sex: Number(formData.sex),
          bmi: Number(formData.bmi),
          children: Number(formData.children),
          smoker: Number(formData.smoker),
          region: Number(formData.region),
        }),
      });

      const data = await response.json();
      console.log(data);
      
      setPrediction(data.prediction);
    } catch (error) {
      alert("Something went wrong! Check API or Network.");
    }

    setLoading(false);
  };

  // Format currency display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Insurance Cost Predictor
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get an accurate estimate of your insurance costs using our advanced AI prediction model
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-7 h-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Input Details</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    <User className="w-4 h-4" />
                    Age
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 p-3 rounded-xl pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      placeholder="Enter age"
                      required
                      min="18"
                      max="100"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Sex */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    <Users className="w-4 h-4" />
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="sex"
                      onChange={handleChange}
                      value={formData.sex}
                      className="w-full border-2 border-gray-200 p-3 rounded-xl pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none appearance-none transition-all"
                    >
                      <option value="1">Female</option>
                      <option value="0">Male</option>
                    </select>
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      ▼
                    </div>
                  </div>
                </div>

                {/* BMI */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    <Scale className="w-4 h-4" />
                    BMI
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="bmi"
                      value={formData.bmi}
                      onChange={handleChange}
                      step="0.1"
                      className="w-full border-2 border-gray-200 p-3 rounded-xl pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      placeholder="Body Mass Index"
                      required
                      min="15"
                      max="50"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Scale className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Children */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    <Users className="w-4 h-4" />
                    Children
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 p-3 rounded-xl pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      placeholder="Number of children"
                      required
                      min="0"
                      max="10"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Smoker */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    {/* <Smoking className="w-4 h-4" /> */}
                    
                    Smoker
                  </label>
                  <div className="relative">
                    <select
                      name="smoker"
                      value={formData.smoker}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 p-3 rounded-xl pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none appearance-none transition-all"
                    >
                      <option value="0">Yes</option>
                      <option value="1">No</option>
                    </select>
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {/* <Smoking className="w-5 h-5" /> */}
                    </div>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    <MapPin className="w-4 h-4" />
                    Region
                  </label>
                  <div className="relative">
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 p-3 rounded-xl pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none appearance-none transition-all"
                    >
                      <option value="0">Southeast</option>
                      <option value="1">Southwest</option>
                      <option value="2">Northeast</option>
                      <option value="3">Northwest</option>
                    </select>
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    Calculate Insurance Cost
                  </>
                )}
              </button>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-gray-600 text-center">
                All data is processed securely. Our prediction model uses machine learning to provide accurate estimates.
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-7 h-7" />
              <h2 className="text-2xl font-bold">Prediction Results</h2>
            </div>

            <div className="h-64 flex flex-col items-center justify-center mb-8">
              {loading ? (
                <div className="text-center">
                  <div className="relative">
                    <div className="w-32 h-32 border-4 border-white/30 rounded-full"></div>
                    <div className="w-32 h-32 border-4 border-white border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  </div>
                  <p className="mt-4 text-lg">Analyzing your data...</p>
                </div>
              ) : prediction !== null ? (
                <div className="text-center">
                  <div className="mb-6">
                    <p className="text-blue-100 mb-2">Your Estimated Annual Cost</p>
                    <div className="text-6xl md:text-7xl font-bold mb-2 animate-pulse">
                      {formatCurrency(prediction)}
                    </div>
                    <p className="text-blue-200">Based on your provided information</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                      <p className="text-sm text-blue-200">Monthly Equivalent</p>
                      <p className="text-xl font-semibold">{formatCurrency(prediction / 12)}</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                      <p className="text-sm text-blue-200">Daily Equivalent</p>
                      <p className="text-xl font-semibold">{formatCurrency(prediction / 365)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-16 h-16 text-white/50" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Ready to Predict</h3>
                  <p className="text-blue-100">
                    Fill in your details on the left and click "Calculate" to see your personalized insurance cost prediction.
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Why Use Our Predictor?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <Shield className="w-5 h-5" />
                  <span>Accurate ML-based predictions</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="w-5 h-5" />
                  <span>Real-time cost calculations</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <Calculator className="w-5 h-5" />
                  <span>Multiple breakdown views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Note: This is a predictive estimate. Actual insurance costs may vary based on additional factors.</p>
        </div>
      </div>
    </div>
  );
};

export default App;