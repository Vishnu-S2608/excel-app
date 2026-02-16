const wasteType = document.getElementById("wasteType");
const resultBox = document.getElementById("resultBox");

// 🔹 Toggle Parameter Sections
wasteType.addEventListener("change", function () {
    document.getElementById("greyParams").classList.add("hidden");
    document.getElementById("industrialParams").classList.add("hidden");
    document.getElementById("municipalParams").classList.add("hidden");

    if (this.value === "Laundry")
        document.getElementById("greyParams").classList.remove("hidden");

    if (this.value === "Industrial")
        document.getElementById("industrialParams").classList.remove("hidden");

    if (this.value === "Treated Municipal")
        document.getElementById("municipalParams").classList.remove("hidden");
});


// 🔹 Add Heavy Metal
function addMetal() {
    const container = document.getElementById("heavyMetalsContainer");
    const row = document.createElement("div");
    row.classList.add("dynamic-row");

    row.innerHTML = `
        <input type="text" placeholder="Metal Name" class="metal-name">
        <input type="number" step="0.01" placeholder="Value (mg/L)" class="metal-value">
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">X</button>
    `;
    container.appendChild(row);
}


// 🔹 Add Nutrient
function addNutrient() {
    const container = document.getElementById("nutrientsContainer");
    const row = document.createElement("div");
    row.classList.add("dynamic-row");

    row.innerHTML = `
        <input type="text" placeholder="Nutrient Name" class="nutrient-name">
        <input type="number" placeholder="Value (mg/L)" class="nutrient-value">
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">X</button>
    `;
    container.appendChild(row);
}


// 🔥 FORM SUBMIT → SEND TO LLM BACKEND
document.getElementById("wastewaterForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    resultBox.innerHTML = "⏳ Analyzing water quality using AI...";

    let parameters = {};
    let climate_environment = {
        temperature: parseFloat(document.getElementById("temperature").value),
        humidity: parseFloat(document.getElementById("humidity").value),
        rainfall: parseFloat(document.getElementById("rainfall").value),
        soil_type: document.getElementById("soil").value
    };

    // 🔹 Laundry
    if (wasteType.value === "Laundry") {
        parameters = {
            pH: parseFloat(document.getElementById("ph_grey").value),
            EC: parseFloat(document.getElementById("ec_grey").value),
            TDS: parseFloat(document.getElementById("tds_grey").value),
            detergent_concentration: parseFloat(document.getElementById("detergent").value),
            turbidity: parseFloat(document.getElementById("turbidity").value)
        };
    }

    // 🔹 Industrial
    if (wasteType.value === "Industrial") {
        let metals = {};
        document.querySelectorAll(".metal-name").forEach((el, index) => {
            const name = el.value;
            const value = document.querySelectorAll(".metal-value")[index].value;
            if (name && value)
                metals[name.toLowerCase()] = parseFloat(value);
        });

        parameters = {
            pH: parseFloat(document.getElementById("ph_ind").value),
            COD: parseFloat(document.getElementById("cod").value),
            BOD: parseFloat(document.getElementById("bod").value),
            TDS: parseFloat(document.getElementById("tds_ind").value),
            heavy_metals: metals
        };
    }

    // 🔹 Municipal
    if (wasteType.value === "Treated Municipal") {
        let nutrients = {};
        document.querySelectorAll(".nutrient-name").forEach((el, index) => {
            const name = el.value;
            const value = document.querySelectorAll(".nutrient-value")[index].value;
            if (name && value)
                nutrients[name.toLowerCase()] = parseFloat(value);
        });

        parameters = {
            pH: parseFloat(document.getElementById("ph_mun").value),
            EC: parseFloat(document.getElementById("ec_mun").value),
            TDS: parseFloat(document.getElementById("tds_mun").value),
            residual_chlorine: parseFloat(document.getElementById("chlorine").value),
            coliform_count: parseFloat(document.getElementById("coliform").value),
            nutrients: nutrients
        };
    }

    const requestBody = {
        wastewater_type: wasteType.value,
        parameters: parameters,
        climate_environment: climate_environment
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();

        if (result.error) {
            resultBox.innerHTML = "❌ Error: " + result.error;
            return;
        }

        // 🔥 DISPLAY FULL AI OUTPUT
        resultBox.innerHTML = `
            <h2>🔬 Water Reuse Suitability</h2>
            <p><strong>Status:</strong> ${result.suitability_status}</p>
            <p><strong>Reason:</strong> ${result.suitability_reason}</p>

            <h2>🌱 Recommended Crops</h2>
            ${result.recommended_crops.map(crop => `
                <div class="crop-card">
                    <strong>${crop.crop}</strong> - ${crop.risk}<br>
                    <em>${crop.reason}</em>
                </div>
            `).join("")}

            <h2>🚫 Unsafe Crops</h2>
            ${result.unsafe_crops.map(crop => `
                <div>
                    <strong>${crop.crop}</strong><br>
                    <em>${crop.reason}</em>
                </div>
            `).join("")}

            <h2>⚠ Health & Environmental Risk</h2>
            <p><strong>${result.health_environmental_risk}</strong></p>
            <p>${result.health_risk_reason}</p>

            <h2>🦠 Disease Indicators</h2>
            ${result.disease_indicators.map(d => `
                <div>
                    <strong>${d.disease}</strong><br>
                    <em>${d.reason}</em>
                </div>
            `).join("")}

            <h2>🛠 Precautions</h2>
            ${result.precautions.map(p => `
                <div>
                    <strong>${p.measure}</strong><br>
                    <em>${p.reason}</em>
                </div>
            `).join("")}

            <h2>🔧 Maintenance Suggestions</h2>
            ${result.maintenance_suggestions.map(m => `
                <div>
                    <strong>${m.suggestion}</strong><br>
                    <em>${m.reason}</em>
                </div>
            `).join("")}

            <h2>📊 Sustainability Score</h2>
            <p><strong>${result.sustainability_score}/100</strong></p>
            <p>${result.sustainability_reason}</p>
        `;

    } catch (error) {
        resultBox.innerHTML = "❌ Backend connection failed.";
        console.error(error);
    }
});
