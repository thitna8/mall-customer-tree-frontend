const form = document.getElementById("form");
const resultDiv = document.getElementById("result");
const predictionText = document.getElementById("prediction-text");

// Auto-switch between local & deployed backend
const API_URL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000/predict"
    : "https://mall-customer-tree-api.onrender.com/predict";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const income = document.getElementById("income").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gender: Number(gender),
        age: Number(age),
        income: Number(income),
      }),
    });

    const data = await response.json();

    predictionText.innerText =
      data.prediction === 1 ? "High Spender" : "Low Spender";

    resultDiv.classList.remove("hidden");

  } catch (error) {
    predictionText.innerText = "Error connecting to server.";
    resultDiv.classList.remove("hidden");
  }
});
