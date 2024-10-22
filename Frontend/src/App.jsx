import { useState } from "react";

function App() {
  // Initialize form state
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    tenure: "",
    usage_frequency: "",
    support_call: "",
    payment_delay: "",
    contract_length: "",
    subscription_type: "",
    total_spend: "",
    last_interaction: "",
  });

  const [result, setResult] = useState(0);
  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cors: "no-cors",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        setResult(result.prediction);
        console.log(result);
        alert("Data sent successfully!");
      } else {
        alert("Failed to send data!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="h-screen w-screen bg-red-500 text-red-900 p-6">
      <div className="px-3 py-2 bg-red-400 min-w-screen-sm text-center">
        <h1 className="font-semibold font-sans text-4xl tracking-tighter text-white">
          Churn Predictor
        </h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Tenure:</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Usage Frequency:</label>
            <input
              type="number"
              name="usage_frequency"
              value={formData.usage_frequency}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Support Call:</label>
            <input
              type="number"
              name="support_call"
              value={formData.support_call}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Payment Delay:</label>
            <input
              type="number"
              name="payment_delay"
              value={formData.payment_delay}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Contract Length:</label>
            <select
              name="contract_length"
              value={formData.contract_length}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            >
              <option value="">Select Contract Length</option>
              <option value="Annual">Annual</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
          </div>

          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Subscription Type:</label>
            <select
              name="subscription_type"
              value={formData.subscription_type}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            >
              <option value="">Select Subscription Type</option>
              <option value="Standard">Standard</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Total Spend:</label>
            <input
              type="number"
              name="total_spend"
              value={formData.total_spend}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700">Last Interaction:</label>
            <input
              type="number"
              name="last_interaction"
              value={formData.last_interaction}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 shadow"
          >
            Submit
          </button>
        </form>
        {result == 1 ? <Negative /> : <Positive />}
      </div>
    </div>
  );
}

function Positive() {
  return (
    <div className="w-full bg-green-400 py-2 text-white text-xl tracking-wide font-semibold">
      The customer is likely to stay.
    </div>
  );
}
function Negative() {
  return (
    <div className="w-full bg-red-600 py-2 text-white text-xl tracking-wide font-semibold">
      The customer is likely to leave.
    </div>
  );
}

export default App;
