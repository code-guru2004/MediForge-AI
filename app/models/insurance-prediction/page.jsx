'use client';
import React, { useState } from "react";

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
  // 🔥 Replace with your actual Render API URL

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
      setPrediction(data.prediction);
    } catch (error) {
      alert("Something went wrong! Check API or Network.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Insurance Cost Predictor
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Age */}
          <div>
            <label className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block mb-1 font-medium">Sex</label>
            <select
              name="sex"
              onChange={handleChange}
              value={formData.sex}
              className="w-full border p-2 rounded"
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
          </div>

          {/* BMI */}
          <div>
            <label className="block mb-1 font-medium">BMI</label>
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              step="0.1"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Children */}
          <div>
            <label className="block mb-1 font-medium">Children</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Smoker */}
          <div>
            <label className="block mb-1 font-medium">Smoker</label>
            <select
              name="smoker"
              value={formData.smoker}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="0">Yes</option>
              <option value="1">No</option>
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="block mb-1 font-medium">Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="0">Southeast</option>
              <option value="1">Southwest</option>
              <option value="2">Northeast</option>
              <option value="3">Northwest</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Predicting..." : "Predict Insurance Cost"}
          </button>
        </form>

        {/* Prediction Box */}
        {prediction !== null && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg text-center">
            <h2 className="text-xl font-semibold">Predicted Cost:</h2>
            <p className="text-2xl font-bold text-green-700">
              ${prediction.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
