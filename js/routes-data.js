/**
 * RoutesDB - Brazilian Routes Database
 * 
 * Global object containing route information between Brazilian cities
 * Structure:
 * - routes: Array of route objects with origin, destination, and distanceKm
 * - getAllCities(): Returns unique sorted array of all cities
 * - findDistance(origin, destination): Finds distance between two cities
 */

const RoutesDB = {
    /**
     * Array of route objects representing connections between Brazilian cities
     * Each route contains:
     * - origin: City name with state (e.g., "São Paulo, SP")
     * - destination: City name with state
     * - distanceKm: Distance in kilometers
     */
    routes: [
        // Capital to Capital Routes
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "São Paulo, SP", destination: "Porto Alegre, RS", distanceKm: 1109 },
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1962 },
        { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2660 },
        { origin: "São Paulo, SP", destination: "Fortaleza, CE", distanceKm: 3127 },
        { origin: "São Paulo, SP", destination: "Manaus, AM", distanceKm: 3933 },
        { origin: "São Paulo, SP", destination: "Belém, PA", distanceKm: 3250 },
        
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
        { origin: "Rio de Janeiro, RJ", destination: "Salvador, BA", distanceKm: 1649 },
        { origin: "Rio de Janeiro, RJ", destination: "Curitiba, PR", distanceKm: 852 },
        { origin: "Rio de Janeiro, RJ", destination: "Porto Alegre, RS", distanceKm: 1553 },
        { origin: "Rio de Janeiro, RJ", destination: "Recife, PE", distanceKm: 2338 },
        { origin: "Rio de Janeiro, RJ", destination: "Fortaleza, CE", distanceKm: 2808 },
        
        { origin: "Brasília, DF", destination: "Belo Horizonte, MG", distanceKm: 716 },
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "Brasília, DF", destination: "Salvador, BA", distanceKm: 1446 },
        { origin: "Brasília, DF", destination: "Cuiabá, MT", distanceKm: 1133 },
        { origin: "Brasília, DF", destination: "Manaus, AM", distanceKm: 3490 },
        { origin: "Brasília, DF", destination: "Fortaleza, CE", distanceKm: 2200 },
        { origin: "Brasília, DF", destination: "Recife, PE", distanceKm: 2200 },
        
        { origin: "Belo Horizonte, MG", destination: "Salvador, BA", distanceKm: 1372 },
        { origin: "Belo Horizonte, MG", destination: "Vitória, ES", distanceKm: 524 },
        { origin: "Belo Horizonte, MG", destination: "Curitiba, PR", distanceKm: 1004 },
        { origin: "Belo Horizonte, MG", destination: "Goiânia, GO", distanceKm: 906 },
        
        { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 711 },
        { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
        { origin: "Curitiba, PR", destination: "Foz do Iguaçu, PR", distanceKm: 637 },
        
        { origin: "Porto Alegre, RS", destination: "Florianópolis, SC", distanceKm: 476 },
        { origin: "Porto Alegre, RS", destination: "Brasília, DF", distanceKm: 2027 },
        
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 839 },
        { origin: "Salvador, BA", destination: "Fortaleza, CE", distanceKm: 1389 },
        { origin: "Salvador, BA", destination: "Aracaju, SE", distanceKm: 356 },
        { origin: "Salvador, BA", destination: "Maceió, AL", distanceKm: 632 },
        
        { origin: "Recife, PE", destination: "Fortaleza, CE", distanceKm: 800 },
        { origin: "Recife, PE", destination: "Natal, RN", distanceKm: 297 },
        { origin: "Recife, PE", destination: "João Pessoa, PB", distanceKm: 120 },
        { origin: "Recife, PE", destination: "Maceió, AL", distanceKm: 285 },
        
        { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 537 },
        { origin: "Fortaleza, CE", destination: "Teresina, PI", distanceKm: 634 },
        { origin: "Fortaleza, CE", destination: "São Luís, MA", distanceKm: 1070 },
        
        { origin: "Manaus, AM", destination: "Belém, PA", distanceKm: 1294 },
        { origin: "Manaus, AM", destination: "Porto Velho, RO", distanceKm: 901 },
        { origin: "Manaus, AM", destination: "Boa Vista, RR", distanceKm: 785 },
        
        // São Paulo State Regional Routes
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "São Paulo, SP", destination: "São José dos Campos, SP", distanceKm: 94 },
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 313 },
        { origin: "São Paulo, SP", destination: "Sorocaba, SP", distanceKm: 87 },
        { origin: "São Paulo, SP", destination: "Guarulhos, SP", distanceKm: 17 },
        { origin: "São Paulo, SP", destination: "Osasco, SP", distanceKm: 16 },
        { origin: "São Paulo, SP", destination: "Bauru, SP", distanceKm: 345 },
        { origin: "São Paulo, SP", destination: "Piracicaba, SP", distanceKm: 164 },
        { origin: "São Paulo, SP", destination: "Jundiaí, SP", distanceKm: 57 },
        
        { origin: "Campinas, SP", destination: "Ribeirão Preto, SP", distanceKm: 235 },
        { origin: "Campinas, SP", destination: "Santos, SP", distanceKm: 150 },
        { origin: "Campinas, SP", destination: "Sorocaba, SP", distanceKm: 100 },
        { origin: "Campinas, SP", destination: "Piracicaba, SP", distanceKm: 75 },
        
        // Rio de Janeiro State Regional Routes
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Petrópolis, RJ", distanceKm: 68 },
        { origin: "Rio de Janeiro, RJ", destination: "Cabo Frio, RJ", distanceKm: 150 },
        { origin: "Rio de Janeiro, RJ", destination: "Campos dos Goytacazes, RJ", distanceKm: 278 },
        { origin: "Rio de Janeiro, RJ", destination: "Volta Redonda, RJ", distanceKm: 127 },
        { origin: "Rio de Janeiro, RJ", destination: "Nova Friburgo, RJ", distanceKm: 136 },
        { origin: "Rio de Janeiro, RJ", destination: "Angra dos Reis, RJ", distanceKm: 151 },
        
        // Minas Gerais Regional Routes
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Belo Horizonte, MG", destination: "Uberlândia, MG", distanceKm: 543 },
        { origin: "Belo Horizonte, MG", destination: "Juiz de Fora, MG", distanceKm: 283 },
        { origin: "Belo Horizonte, MG", destination: "Montes Claros, MG", distanceKm: 422 },
        { origin: "Belo Horizonte, MG", destination: "Contagem, MG", distanceKm: 21 },
        { origin: "Belo Horizonte, MG", destination: "Uberaba, MG", distanceKm: 475 },
        
        // Bahia Regional Routes
        { origin: "Salvador, BA", destination: "Feira de Santana, BA", distanceKm: 108 },
        { origin: "Salvador, BA", destination: "Vitória da Conquista, BA", distanceKm: 517 },
        { origin: "Salvador, BA", destination: "Ilhéus, BA", distanceKm: 462 },
        { origin: "Salvador, BA", destination: "Porto Seguro, BA", distanceKm: 707 },
        
        // Paraná Regional Routes
        { origin: "Curitiba, PR", destination: "Londrina, PR", distanceKm: 381 },
        { origin: "Curitiba, PR", destination: "Maringá, PR", distanceKm: 436 },
        { origin: "Curitiba, PR", destination: "Ponta Grossa, PR", distanceKm: 115 },
        { origin: "Curitiba, PR", destination: "Cascavel, PR", distanceKm: 491 },
        
        // Rio Grande do Sul Regional Routes
        { origin: "Porto Alegre, RS", destination: "Caxias do Sul, RS", distanceKm: 129 },
        { origin: "Porto Alegre, RS", destination: "Pelotas, RS", distanceKm: 261 },
        { origin: "Porto Alegre, RS", destination: "Santa Maria, RS", distanceKm: 286 },
        { origin: "Porto Alegre, RS", destination: "Canoas, RS", distanceKm: 13 },
        
        // Pernambuco Regional Routes
        { origin: "Recife, PE", destination: "Olinda, PE", distanceKm: 7 },
        { origin: "Recife, PE", destination: "Caruaru, PE", distanceKm: 130 },
        { origin: "Recife, PE", destination: "Petrolina, PE", distanceKm: 719 },
        
        // Ceará Regional Routes
        { origin: "Fortaleza, CE", destination: "Juazeiro do Norte, CE", distanceKm: 491 },
        { origin: "Fortaleza, CE", destination: "Sobral, CE", distanceKm: 238 },
        
        // Goiás Regional Routes
        { origin: "Goiânia, GO", destination: "Anápolis, GO", distanceKm: 55 },
        { origin: "Goiânia, GO", destination: "Aparecida de Goiânia, GO", distanceKm: 13 },
        
        // Espírito Santo Regional Routes
        { origin: "Vitória, ES", destination: "Vila Velha, ES", distanceKm: 8 },
        { origin: "Vitória, ES", destination: "Cachoeiro de Itapemirim, ES", distanceKm: 138 },
        
        // Additional Inter-regional Routes
        { origin: "Campinas, SP", destination: "Belo Horizonte, MG", distanceKm: 494 },
        { origin: "Santos, SP", destination: "Rio de Janeiro, RJ", distanceKm: 475 },
        { origin: "Florianópolis, SC", destination: "Cuiabá, MT", distanceKm: 2387 }
    ],

    /**
     * Get all unique city names from the routes database
     * @returns {Array<string>} Sorted array of unique city names
     */
    getAllCities: function() {
        // Create a Set to store unique city names
        const citiesSet = new Set();
        
        // Extract cities from both origin and destination
        this.routes.forEach(route => {
            citiesSet.add(route.origin);
            citiesSet.add(route.destination);
        });
        
        // Convert Set to Array and sort alphabetically
        return Array.from(citiesSet).sort();
    },

    /**
     * Find the distance between two cities
     * Searches bidirectionally (both origin->destination and destination->origin)
     * @param {string} origin - Origin city name
     * @param {string} destination - Destination city name
     * @returns {number|null} Distance in kilometers if found, null otherwise
     */
    findDistance: function(origin, destination) {
        // Normalize inputs: trim whitespace and convert to lowercase for comparison
        const normalizedOrigin = origin.trim().toLowerCase();
        const normalizedDestination = destination.trim().toLowerCase();
        
        // Search for the route in both directions
        const route = this.routes.find(r => {
            const routeOrigin = r.origin.toLowerCase();
            const routeDestination = r.destination.toLowerCase();
            
            // Check both directions: A->B or B->A
            return (
                (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) ||
                (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin)
            );
        });
        
        // Return distance if found, null otherwise
        return route ? route.distanceKm : null;
    }
};
