/**
 * UI - User Interface Helper
 * 
 * Global object containing methods for formatting data and rendering HTML components
 * Handles display logic, formatting, and DOM manipulation
 */



const UI = {
    /**
     * UTILITY METHODS
     */

    /**
     * Format a number with specified decimal places and thousand separators
     * @param {number} number - Number to format
     * @param {number} decimals - Number of decimal places (default: 2)
     * @returns {string} Formatted number string
     */

    formatNumber: function (number, decimals = 2) {
  if (number === undefined || number === null || isNaN(number)) {
    return '0';
  }

  return Number(number).toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
},







    /**
     * Format a value as Brazilian currency (Real)
     * @param {number} value - Value to format
     * @returns {string} Formatted currency string (R$ 1.234,56)
     */
    formatCurrency: function(value) {
        // Format as Brazilian Real with pt-BR locale
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Show a hidden element by removing the 'hidden' class
     * @param {string} elementId - ID of the element to show
     */
    showElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
        }
    },

    /**
     * Hide an element by adding the 'hidden' class
     * @param {string} elementId - ID of the element to hide
     */
    hideElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
        }
    },

    /**
     * Scroll to an element smoothly
     * @param {string} elementId - ID of the element to scroll to
     */
    scrollToElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    /**
     * RENDERING METHODS
     */

    /**
     * Render the main calculation results
     * @param {Object} data - Result data object
     * @param {string} data.origin - Origin city
     * @param {string} data.destination - Destination city
     * @param {number} data.distance - Distance in km
     * @param {number} data.emission - CO2 emission in kg
     * @param {string} data.mode - Transport mode key
     * @param {Object} data.savings - Savings object (optional)
     * @returns {string} HTML string for results display
     */
    renderResults: function(data) {
        // Get transport mode metadata from CONFIG
        const modeData = CONFIG.TRANSPORT_MODES[data.mode];

        const savingsKg = data.savings ? data.savings.savedKg : 0;
         const savingsPct = data.savings ? data.savings.percentage : 0;

        // Build HTML structure with cards for each piece of information
        let html = `
            <h2 class="section-title">Resultados da Emissão de CO2</h2>

            <div class="results__grid">
                <!-- Route Card -->
                <div class="results__card">
                    <div class="results__card-icon">🗺️</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Rota</h3>
                        <p class="results__card-value">${data.origin}</p>
                        <p class="results__card-arrow">→</p>
                        <p class="results__card-value">${data.destination}</p>
                    </div>
                </div>

                <!-- Distance Card -->
                <div class="results__card">
                    <div class="results__card-icon">📏</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Distância</h3>
                        <p class="results__card-value">${this.formatNumber(data.distance, 0)} km</p>
                    </div>
                </div>

                <!-- Emission Card -->
                <div class="results__card results__card--highlight">
                    <div class="results__card-icon">🍃</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Emissão de CO2</h3>
                        <p class="results__card-value results__card-value--large">${this.formatNumber(data.emission)} kg</p>
                    </div>
                </div>

                <!-- Transport Mode Card -->
                <div class="results__card">
                    <div class="results__card-icon">${modeData.icon}</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Meio de Transporte</h3>
                        <p class="results__card-value">${modeData.label}</p>
                    </div>
                </div>
            </div>
        `;

        // If savings data exists and mode is not car, show savings card
        if (data.savings && data.mode !== 'car') {
            html += `
                <div class="results__savings">
                    <div class="results__card results__card--success">
                        <div class="results__card-icon">💚</div>
                        <div class="results__card-content">
                            <h3 class="results__card-title">Economia vs. Carro</h3>
                            <p class="results__card-value">${this.formatNumber(data.savings.savedKg)} kg CO2 economizados</p>
                            <p class="results__card-subtitle">${this.formatNumber(data.savings.percentage)}% a menos</p>
                        </div>
                    </div>
                </div>
            `;
        }

        return html;
    },

    /**
     * Render comparison of all transport modes
     * @param {Array} modesArray - Array of mode objects from Calculator.calculateAllModes()
     * @param {string} selectedMode - Currently selected transport mode
     * @returns {string} HTML string for comparison display
     */
    renderComparison: function(modesArray, selectedMode) {
        // Find the maximum emission for scaling progress bars
        const maxEmission = Math.max(...modesArray.map(m => m.emission));

        let html = '<div class="comparison__grid"> <h2 class="section-title">Comparação de Meios de Transporte</h2>';


        // Iterate through each mode and create comparison item
        modesArray.forEach(modeObj => {
            const modeData = CONFIG.TRANSPORT_MODES[modeObj.mode];
            const isSelected = modeObj.mode === selectedMode;

            // Calculate progress bar width (0-100%)
            const barWidth = maxEmission === 0 ? 0 : (modeObj.emission / maxEmission) * 100;

            // Determine color based on percentage vs car
            let barColor = '#10b981'; // Green (0-25%)
            if (modeObj.percentageVsCar > 100) {
                barColor = '#ef4444'; // Red (>100%)
            } else if (modeObj.percentageVsCar > 75) {
                barColor = '#f59e0b'; // Orange (75-100%)
            } else if (modeObj.percentageVsCar > 25) {
                barColor = '#fbbf24'; // Yellow (25-75%)
            }

            html += `

                <div class="comparison__item ${isSelected ? 'comparison__item--selected' : ''}">
                    <!-- Header with mode info -->
                    <div class="comparison__header">
                        <div class="comparison__mode">
                            <span class="comparison__icon">${modeData.icon}</span>
                            <span class="comparison__label">${modeData.label}</span>
                        </div>
                        ${isSelected ? '<span class="comparison__badge">Selecionado</span>' : ''}
                    </div>

                    <!-- Emission stats -->
                    <div class="comparison__stats">
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">Emissão</span>
                            <span class="comparison__stat-value">${this.formatNumber(modeObj.emission)} kg CO2</span>
                        </div>
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">vs. Carro</span>
                            <span class="comparison__stat-value">${this.formatNumber(modeObj.percentageVsCar, 0)}%</span>
                        </div>
                    </div>

                    <!-- Progress bar -->
                    <div class="comparison__bar-container">
                        <div class="comparison__bar" style="width: ${barWidth}%; background-color: ${barColor};"></div>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // Add helpful tip box at the end
        html += `
            <div class="comparison__tip">
                <div class="comparison__tip-icon">💡</div>
                <div class="comparison__tip-content">
                    <strong>Dica:</strong> Escolher meios de transporte com menor emissão de CO2 
                    ajuda a reduzir o impacto ambiental e contribui para um planeta mais sustentável.
                </div>
            </div>
        `;

        return html;
    },

    /**
     * Render carbon credits information
     * @param {Object} creditsData - Credits data object
     * @param {number} creditsData.credits - Number of credits needed
     * @param {Object} creditsData.price - Price object with min, max, average
     * @returns {string} HTML string for carbon credits display
     */
    renderCarbonCredits: function(creditsData) {
        const html = `
            <h2 class="section-title">Compensação de Carbono</h2>
            
            <div class="carbon-credits__grid">
                <!-- Credits Card -->
                <div class="carbon-credits__card">
                    <div class="carbon-credits__icon">🌱</div>
                    <h3 class="carbon-credits__title">Créditos Necessários</h3>
                    <p class="carbon-credits__value">${this.formatNumber(creditsData.credits, 4)}</p>
                    <p class="carbon-credits__helper">1 crédito = 1.000 kg CO2</p>
                </div>

                <!-- Price Card -->
                <div class="carbon-credits__card">
                    <div class="carbon-credits__icon">💰</div>
                    <h3 class="carbon-credits__title">Custo Estimado</h3>
                    <p class="carbon-credits__value">${this.formatCurrency(creditsData.price.average)}</p>
                    <p class="carbon-credits__helper">
                        Faixa: ${this.formatCurrency(creditsData.price.min)} - ${this.formatCurrency(creditsData.price.max)}
                    </p>
                </div>
            </div>

            <!-- Info Box -->
            <div class="carbon-credits__info">
                <div class="carbon-credits__info-icon">ℹ️</div>
                <div class="carbon-credits__info-content">
                    <h4 class="carbon-credits__info-title">O que são Créditos de Carbono?</h4>
                    <p class="carbon-credits__info-text">
                        Créditos de carbono são certificados que representam a redução de 1 tonelada (1.000 kg) 
                        de CO2 da atmosfera. Ao comprar créditos, você compensa suas emissões financiando 
                        projetos de reflorestamento, energias renováveis e outras iniciativas sustentáveis.
                    </p>
                </div>
            </div>

            <!-- Action Button -->
            <div class="carbon-credits__action">
                <button class="carbon-credits__button" type="button">
                    🍃 Compensar Emissões
                </button>
                <p class="carbon-credits__disclaimer">
                    * Botão demonstrativo - funcionalidade de compra não implementada
                </p>
            </div>
        `;

        return html;
    },

    /**
     * Show loading state on a button
     * @param {HTMLElement} buttonElement - Button element to show loading on
     */
    showLoading: function(buttonElement) {
        // Save original button text in data attribute
        buttonElement.dataset.originalText = buttonElement.innerHTML;
        
        // Disable the button
        buttonElement.disabled = true;
        
        // Change button content to show spinner and loading text
        buttonElement.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Hide loading state and restore button
     * @param {HTMLElement} buttonElement - Button element to restore
     */
    hideLoading: function(buttonElement) {
        // Enable the button
        buttonElement.disabled = false;
        
        // Restore original text from data attribute
        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
        }
    }
};
