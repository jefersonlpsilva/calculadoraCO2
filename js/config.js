/**
 * CONFIG - Global Configuration Object
 * 
 * Contains emission factors, transport mode metadata, carbon credit information,
 * and utility methods for the CO2 calculator
 */

const CONFIG = {
    /**
     * CO2 Emission Factors
     * Represents kg of CO2 emitted per kilometer for each transport mode
     */
    EMISSION_FACTORS: {
        bicycle: 0,      // No CO2 emissions
        car: 0.12,       // kg CO2/km
        bus: 0.089,      // kg CO2/km
        truck: 0.96      // kg CO2/km
    },

    /**
     * Transport Mode Metadata
     * Contains display information for each transport mode
     */
    TRANSPORT_MODES: {
        bicycle: {
            label: 'Bicicleta',
            icon: '🚲',
            color: '#10b981'  // Green
        },
        car: {
            label: 'Carro',
            icon: '🚗',
            color: '#3b82f6'  // Blue
        },
        bus: {
            label: 'Ônibus',
            icon: '🚌',
            color: '#f59e0b'  // Orange
        },
        truck: {
            label: 'Caminhão',
            icon: '🚚',
            color: '#ef4444'  // Red
        }
    },

    /**
     * Carbon Credit Information
     * Constants for carbon credit calculations and pricing
     */
    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,     // 1 carbon credit = 1000 kg CO2
        PRICE_MIN_BRL: 50,       // Minimum price in Brazilian Reais
        PRICE_MAX_BRL: 150       // Maximum price in Brazilian Reais
    },

    /**
     * Populate the cities datalist with all available cities from RoutesDB
     * This method should be called on page load to enable city autocomplete
     */
    populateDataList: function() {
        // Get the list of all cities from the routes database
        const cities = RoutesDB.getAllCities();
        
        // Get the datalist element
        const datalist = document.getElementById('cities-list');
        
        // Clear any existing options
        datalist.innerHTML = '';
        
        // Create and append an option element for each city
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    },


    setupDistanceAutofill: function() {   // <-- Make sure this exists!
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        const distanceInput = document.getElementById('distance');
        const manualCheckbox = document.getElementById('manual-distance');
        const helperText = distanceInput.nextElementSibling;

        function updateDistance() {
            const origin = originInput.value.trim();
            const destination = destinationInput.value.trim();
            if (origin && destination) {
                const distance = RoutesDB.findDistance(origin, destination);
                if (distance !== null) {
                    distanceInput.value = distance;
                    distanceInput.readOnly = true;
                    helperText.textContent = 'Distância preenchida automaticamente';
                    helperText.style.color = 'green';
                } else {
                    distanceInput.value = '';
                    distanceInput.readOnly = true;
                    helperText.textContent = 'Distância não encontrada, você pode inserir manualmente';
                    helperText.style.color = 'red';
                }
            }
        }

        originInput.addEventListener('change', updateDistance);
        destinationInput.addEventListener('change', updateDistance);
        manualCheckbox.addEventListener('change', function() {
            distanceInput.readOnly = !manualCheckbox.checked;
            if (!manualCheckbox.checked) updateDistance();
        });
    }
};
