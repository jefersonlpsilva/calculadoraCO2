/**
 * Calculator - CO2 Emission Calculator
 * 
 * Global object containing methods for calculating CO2 emissions,
 * comparing transport modes, and estimating carbon credit costs
 */

const Calculator = {
    /**
     * Calculate CO2 emission for a specific distance and transport mode
     * @param {number} distanceKm - Distance in kilometers
     * @param {string} transportMode - Transport mode key (bicycle, car, bus, truck)
     * @returns {number} CO2 emission in kg, rounded to 2 decimal places
     */
    calculateEmission: function(distanceKm, transportMode) {
        // Get the emission factor for the specified transport mode
        const emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];
        
        // Calculate total emission: distance × emission factor
        const emission = distanceKm * emissionFactor;
        
        // Return result rounded to 2 decimal places
        return Math.round(emission * 100) / 100;
    },

    /**
     * Calculate emissions for all transport modes and compare to car baseline
     * @param {number} distanceKm - Distance in kilometers
     * @returns {Array} Array of objects with mode, emission, and percentageVsCar, sorted by emission
     */
    calculateAllModes: function(distanceKm) {
        // Array to store calculation results
        const results = [];
        
        // Calculate car emission as baseline for comparison
        const carEmission = this.calculateEmission(distanceKm, 'car');
        
        // Iterate through each transport mode
        for (const mode in CONFIG.EMISSION_FACTORS) {
            // Calculate emission for current mode
            const emission = this.calculateEmission(distanceKm, mode);
            
            // Calculate percentage compared to car (car = 100%)
            // Handle division by zero if car emission is 0
            const percentageVsCar = carEmission === 0 ? 0 : Math.round((emission / carEmission) * 100 * 100) / 100;
            
            // Add result object to array
            results.push({
                mode: mode,
                emission: emission,
                percentageVsCar: percentageVsCar
            });
        }
        
        // Sort results by emission (lowest first)
        results.sort((a, b) => a.emission - b.emission);
        
        return results;
    },

    /**
     * Calculate savings compared to a baseline emission
     * @param {number} emission - Current mode emission in kg CO2
     * @param {number} baselineEmission - Baseline emission to compare against in kg CO2
     * @returns {Object} Object with savedKg and percentage saved
     */
    calculateSavings: function(emission, baselineEmission) {
        // Calculate amount of CO2 saved in kg
        const savedKg = baselineEmission - emission;
        
        // Calculate percentage saved relative to baseline
        // Handle division by zero if baseline is 0
        const percentage = baselineEmission === 0 ? 0 : (savedKg / baselineEmission) * 100;
        
        // Return object with rounded values
        return {
            savedKg: Math.round(savedKg * 100) / 100,
            percentage: Math.round(percentage * 100) / 100
        };
    },

    /**
     * Calculate carbon credits needed to offset emission
     * @param {number} emissionKg - CO2 emission in kg
     * @returns {number} Number of carbon credits needed, rounded to 4 decimal places
     */
    calculateCarbonCredits: function(emissionKg) {
        // Divide emission by kg per credit (1 credit = 1000 kg CO2)
        const credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
        
        // Return rounded to 4 decimal places
        return Math.round(credits * 10000) / 10000;
    },

    /**
     * Estimate the price range for purchasing carbon credits
     * @param {number} credits - Number of carbon credits
     * @returns {Object} Object with min, max, and average price in BRL
     */
    estimateCarbonPrice: function(credits) {
        // Calculate minimum price (credits × minimum price per credit)
        const min = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
        
        // Calculate maximum price (credits × maximum price per credit)
        const max = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
        
        // Calculate average price (midpoint between min and max)
        const average = (min + max) / 2;
        
        // Return object with all prices rounded to 2 decimal places
        return {
            min: Math.round(min * 100) / 100,
            max: Math.round(max * 100) / 100,
            average: Math.round(average * 100) / 100
        };
    }
};
