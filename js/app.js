 /**
 * Carbon Calculator Application
 * Main initialization and event handling
 */

// Initialize application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // INITIALIZATION
    // ========================================
    
    // Populate city autocomplete options
    CONFIG.populateDataList();
    
    // Enable automatic distance calculation between cities
    CONFIG.setupDistanceAutofill();
    
    // Get the main calculator form element
    const form = document.getElementById('calculator-form');
    
    // Add form submission handler
    form.addEventListener('submit', handleFormSubmit);
    
    // Log successful initialization
    console.log('✓ Calculadora inicializada!');
});

/**
 * Handle form submission
 * @param {Event} event - Form submit event
 */
function handleFormSubmit(event) {
    // ========================================
    // PREVENT DEFAULT FORM SUBMISSION
    // ========================================
    event.preventDefault();
    
    // ========================================
    // GET FORM VALUES
    // ========================================
    
    // Get origin city (trim whitespace)
    const origin = document.getElementById('origin').value.trim();
    
    // Get destination city (trim whitespace)
    const destination = document.getElementById('destination').value.trim();
    
    // Get distance value
    const distance = parseFloat(document.getElementById('distance').value);
    
    // Get selected transport mode (checked radio button)
    const transportMode = document.querySelector('input[name="transport"]:checked').value;
    
    // ========================================
    // VALIDATE INPUTS
    // ========================================
    
    // Check if all required fields are filled
    if (!origin || !destination || !distance) {
        alert('Por favor, preencha origem, destino e distância.');
        return;
    }
    
    // Check if distance is valid (greater than 0)
    if (distance <= 0) {
        alert('A distância deve ser maior que zero.');
        return;
    }
    
    // ========================================
    // PREPARE UI FOR PROCESSING
    // ========================================
    
    // Get submit button element
    const submitButton = event.target.querySelector('button[type="submit"]');
    
    // Show loading state on button
    UI.showLoading(submitButton);
    
    // Hide previous results sections
    UI.hideElement('results-section');
    UI.hideElement('comparison-section');
    UI.hideElement('carbon-credits-section');
    
    // ========================================
    // SIMULATE PROCESSING WITH DELAY
    // ========================================
    
    // Use timeout to simulate API call or processing time
    setTimeout(function() {
        try {
            // ========================================
            // CALCULATE EMISSIONS
            // ========================================
            
            // Calculate emission for the selected transport mode
            const selectedModeEmission = Calculator.calculateEmission(distance, transportMode);
            
            // Calculate car emission as baseline for comparison
            const carEmission = Calculator.calculateEmission(distance, 'car');
            
            // Calculate savings compared to car (if applicable)
            const savings = Calculator.calculateSavings(selectedModeEmission, carEmission);
            
            // Calculate emissions for all transport modes for comparison
            const allModesComparison = Calculator.calculateAllModes(distance);
            
            // ========================================
            // CALCULATE CARBON CREDITS
            // ========================================
            
            // Calculate carbon credits based on savings
            const carbonCredits = Calculator.calculateCarbonCredits(savings.savedKg);            
            // Estimate market price for carbon credits
            const priceEstimate = Calculator.estimateCarbonPrice(carbonCredits);
            
            // ========================================
            // BUILD DATA OBJECTS FOR RENDERING
            // ========================================
            
            // Main result data object
            const resultData = {
                origin: origin,
                destination: destination,
                distance: distance,
                mode: transportMode,
                emission: selectedModeEmission,
                carEmission: carEmission,
                savings: savings
            };
            
            // Carbon credits data object
            const creditsData = {
                credits: carbonCredits,
                price: priceEstimate,
                savings: savings
            };
            
            // ========================================
            // RENDER RESULTS
            // ========================================
            
            // Render main result section
            const resultsHTML = UI.renderResults(resultData, allModesComparison);
            document.getElementById('results-content').innerHTML = resultsHTML;
            
            // Render comparison section
            const comparisonHTML = UI.renderComparison(allModesComparison, transportMode);
            document.getElementById('comparison-content').innerHTML = comparisonHTML;

            // Render carbon credits section
            const creditsHTML = UI.renderCarbonCredits(creditsData);
            document.getElementById('carbon-credits-content').innerHTML = creditsHTML;
            
            // ========================================
            // SHOW RESULTS SECTIONS
            // ========================================
            
            // Display main result section
            UI.showElement('results-section');
            
            // Display comparison section
            UI.showElement('comparison-section');
            
            // Display carbon credits section
            UI.showElement('carbon-credits-section');
            
            // ========================================
            // SCROLL TO RESULTS
            // ========================================
            
            // Smooth scroll to results section for better UX
            UI.scrollToElement('main-result');
            
            // Hide loading state on button
            UI.hideLoading(submitButton);
            
        } catch (error) {
            // ========================================
            // ERROR HANDLING
            // ========================================
            
            // Log error details to console for debugging
            console.error('Erro ao calcular emissões:', error);
            
            // Show user-friendly error message
            alert('Ocorreu um erro ao calcular as emissões. Por favor, tente novamente.');
            
            // Hide loading state on button
            UI.hideLoading(submitButton);
        }
    }, 1500); // 1500ms delay to simulate processing
}
