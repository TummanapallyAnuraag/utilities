// Fetch current fuel price for Hyderabad, India
async function fetchFuelPrice() {
    const statusDiv = document.getElementById('status');
    try {
        // Using a free API to get fuel prices in India
        const response = await fetch('https://api.collectapi.com/gasoline/currentprices?countryCode=IN');

        if (!response.ok) {
            throw new Error('Failed to fetch fuel price');
        }

        const data = await response.json();

        // Look for Hyderabad data
        let hyderabadPrice = null;
        if (data.result) {
            const hyderabad = data.result.find(item =>
                item.name && item.name.toLowerCase().includes('hyderabad')
            );
            if (hyderabad && hyderabad.diesel) {
                hyderabadPrice = parseFloat(hyderabad.diesel);
            }
        }

        if (hyderabadPrice) {
            document.getElementById('fuelCost').value = hyderabadPrice.toFixed(2);
            statusDiv.textContent = `✓ Fuel price updated: ₹${hyderabadPrice.toFixed(2)}/liter (Hyderabad)`;
            statusDiv.style.color = '#2E7D32';
        } else {
            throw new Error('Hyderabad price not found');
        }
    } catch (error) {
        console.error('Error fetching fuel price:', error);
        // Fallback to a reasonable default if API fails
        const defaultPrice = 95.50; // Approximate price as fallback
        document.getElementById('fuelCost').value = defaultPrice.toFixed(2);
        statusDiv.textContent = `⚠ Using default price: ₹${defaultPrice.toFixed(2)}/liter (API unavailable)`;
        statusDiv.style.color = '#F57C00';
    }
}

// Calculate daily fuel cost
function calculateCost() {
    const distance = parseFloat(document.getElementById('distance').value);
    const fuelCost = parseFloat(document.getElementById('fuelCost').value);
    const mileage = parseFloat(document.getElementById('mileage').value);

    // Validation
    if (!distance || distance <= 0) {
        alert('Please enter a valid commute distance');
        return;
    }
    if (!fuelCost || fuelCost <= 0) {
        alert('Please enter a valid fuel cost');
        return;
    }
    if (!mileage || mileage <= 0) {
        alert('Please enter a valid mileage');
        return;
    }

    // Calculate: (distance / mileage) * fuelCost
    const dailyCost = (distance / mileage) * fuelCost;

    // Display result
    document.getElementById('costValue').textContent = `₹ ${dailyCost.toFixed(2)}`;
    document.getElementById('result').classList.add('show');
}

// Load fuel price when page loads
window.addEventListener('load', fetchFuelPrice);

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calculateCost();
            }
        });
    });
});
