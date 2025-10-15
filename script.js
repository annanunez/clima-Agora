// ClimaCell Weather App - JavaScript
class WeatherApp {
    constructor() {
        // API Configuration
        this.API_KEY = 'YOUR_API_KEY_HERE'; // Substitua pela sua chave da API
        this.BASE_URL = 'https://api.tomorrow.io/v4';
        
        // DOM Elements
        this.elements = {
            locationInput: document.getElementById('locationInput'),
            searchBtn: document.getElementById('searchBtn'),
            locationBtn: document.getElementById('locationBtn'),
            loadingSection: document.getElementById('loadingSection'),
            errorSection: document.getElementById('errorSection'),
            errorMessage: document.getElementById('errorMessage'),
            retryBtn: document.getElementById('retryBtn'),
            weatherContent: document.getElementById('weatherContent'),
            
            // Current weather elements
            currentLocation: document.getElementById('currentLocation'),
            currentDateTime: document.getElementById('currentDateTime'),
            currentWeatherIcon: document.getElementById('currentWeatherIcon'),
            currentTemp: document.getElementById('currentTemp'),
            currentCondition: document.getElementById('currentCondition'),
            feelsLike: document.getElementById('feelsLike'),
            humidity: document.getElementById('humidity'),
            windSpeed: document.getElementById('windSpeed'),
            pressure: document.getElementById('pressure'),
            visibility: document.getElementById('visibility'),
            
            // Forecast elements
            hourlyForecast: document.getElementById('hourlyForecast'),
            dailyForecast: document.getElementById('dailyForecast'),
            
            // Details elements
            uvIndex: document.getElementById('uvIndex'),
            dewPoint: document.getElementById('dewPoint'),
            cloudCover: document.getElementById('cloudCover'),
            precipitationProbability: document.getElementById('precipitationProbability')
        };
        
        // Weather code mappings
        this.weatherCodes = {
            0: { icon: '☀️', description: 'Céu limpo' },
            1000: { icon: '☀️', description: 'Céu limpo' },
            1001: { icon: '🌤️', description: 'Nublado' },
            1100: { icon: '🌤️', description: 'Parcialmente nublado' },
            1101: { icon: '⛅', description: 'Parcialmente nublado' },
            1102: { icon: '☁️', description: 'Nublado' },
            2000: { icon: '🌫️', description: 'Neblina' },
            2100: { icon: '🌫️', description: 'Neblina leve' },
            3000: { icon: '🌬️', description: 'Vento leve' },
            3001: { icon: '💨', description: 'Vento' },
            3002: { icon: '💨', description: 'Vento forte' },
            4000: { icon: '🌦️', description: 'Chuvisco' },
            4001: { icon: '🌧️', description: 'Chuva' },
            4200: { icon: '🌧️', description: 'Chuva leve' },
            4201: { icon: '🌧️', description: 'Chuva forte' },
            5000: { icon: '❄️', description: 'Neve' },
            5001: { icon: '🌨️', description: 'Nevasca' },
            5100: { icon: '🌨️', description: 'Neve leve' },
            5101: { icon: '❄️', description: 'Neve forte' },
            6000: { icon: '🌨️', description: 'Chuva congelante' },
            6001: { icon: '🧊', description: 'Chuva congelante forte' },
            6200: { icon: '🧊', description: 'Chuva congelante leve' },
            7000: { icon: '🧊', description: 'Granizo' },
            7101: { icon: '🧊', description: 'Granizo forte' },
            7102: { icon: '🧊', description: 'Granizo leve' },
            8000: { icon: '⛈️', description: 'Tempestade' }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadDefaultLocation();
    }
    
    bindEvents() {
        // Search functionality
        this.elements.searchBtn.addEventListener('click', () => this.handleSearch());
        this.elements.locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // Geolocation
        this.elements.locationBtn.addEventListener('click', () => this.getCurrentLocation());
        
        // Retry functionality
        this.elements.retryBtn.addEventListener('click', () => this.loadDefaultLocation());
        
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e.target));
        });
    }
    
    handleNavigation(button) {
        // Remove active class from all buttons
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Here you could implement different views (current, forecast, maps)
        const view = button.dataset.view;
        console.log(`Switching to ${view} view`);
    }
    
    async handleSearch() {
        const location = this.elements.locationInput.value.trim();
        if (!location) {
            this.showError('Por favor, digite uma localização válida.');
            return;
        }
        
        await this.fetchWeatherData(location);
    }
    
    getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocalização não é suportada pelo seu navegador.');
            return;
        }
        
        this.showLoading();
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const location = `${latitude},${longitude}`;
                await this.fetchWeatherData(location);
            },
            (error) => {
                console.error('Geolocation error:', error);
                this.showError('Não foi possível obter sua localização. Verifique as permissões do navegador.');
            }
        );
    }
    
    async loadDefaultLocation() {
        // Load weather for São Paulo as default
        await this.fetchWeatherData('São Paulo, Brazil');
    }
    
    async fetchWeatherData(location) {
        this.showLoading();
        
        try {
            // Since we can't make direct API calls due to CORS, we'll simulate the data
            // In a real application, you would need a backend proxy or use a CORS-enabled endpoint
            
            if (this.API_KEY === 'YOUR_API_KEY_HERE') {
                // Simulate API data for demonstration
                await this.simulateApiCall();
                this.displaySimulatedData(location);
                return;
            }
            
            // Real API call (would need backend proxy)
            const response = await fetch(`${this.BASE_URL}/weather/forecast?location=${encodeURIComponent(location)}&apikey=${this.API_KEY}`, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            this.displayWeatherData(data, location);
            
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.showError('Não foi possível carregar os dados meteorológicos. Verifique sua conexão e tente novamente.');
        }
    }
    
    async simulateApiCall() {
        // Simulate API delay
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    displaySimulatedData(location) {
        // Simulated weather data for demonstration
        const simulatedData = {
            location: {
                name: location.includes(',') ? location : `${location}, Brasil`,
                lat: -23.5505,
                lon: -46.6333
            },
            current: {
                temperature: 25,
                temperatureApparent: 27,
                humidity: 65,
                windSpeed: 12,
                pressure: 1013,
                visibility: 10,
                uvIndex: 5,
                dewPoint: 18,
                cloudCover: 25,
                precipitationProbability: 10,
                weatherCode: 1100,
                time: new Date()
            },
            hourly: this.generateHourlyForecast(),
            daily: this.generateDailyForecast()
        };
        
        this.displayWeatherData(simulatedData, location);
    }
    
    generateHourlyForecast() {
        const hourly = [];
        const now = new Date();
        const weatherCodes = [1000, 1100, 1101, 4200, 1102];
        
        for (let i = 0; i < 24; i++) {
            const time = new Date(now.getTime() + (i * 60 * 60 * 1000));
            const temp = 25 + Math.sin(i * Math.PI / 12) * 8 + (Math.random() - 0.5) * 4;
            
            hourly.push({
                time: time,
                temperature: Math.round(temp),
                weatherCode: weatherCodes[Math.floor(Math.random() * weatherCodes.length)]
            });
        }
        
        return hourly;
    }
    
    generateDailyForecast() {
        const daily = [];
        const today = new Date();
        const weatherCodes = [1000, 1100, 1101, 4200, 1102, 4000];
        const days = ['Hoje', 'Amanhã', 'Quinta', 'Sexta', 'Sábado'];
        
        for (let i = 0; i < 5; i++) {
            const date = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
            const baseTemp = 25 + (Math.random() - 0.5) * 10;
            
            daily.push({
                time: date,
                day: i < days.length ? days[i] : this.formatDate(date, { weekday: 'short' }),
                temperatureMax: Math.round(baseTemp + 5),
                temperatureMin: Math.round(baseTemp - 5),
                weatherCode: weatherCodes[Math.floor(Math.random() * weatherCodes.length)]
            });
        }
        
        return daily;
    }
    
    displayWeatherData(data, location) {
        try {
            // Update current weather
            this.elements.currentLocation.textContent = data.location.name || location;
            this.elements.currentDateTime.textContent = this.formatDateTime(data.current.time);
            
            const weatherInfo = this.getWeatherInfo(data.current.weatherCode);
            this.elements.currentWeatherIcon.textContent = weatherInfo.icon;
            this.elements.currentCondition.textContent = weatherInfo.description;
            
            this.elements.currentTemp.textContent = `${Math.round(data.current.temperature)}°`;
            this.elements.feelsLike.textContent = `${Math.round(data.current.temperatureApparent)}°`;
            
            // Update metrics
            this.elements.humidity.textContent = `${data.current.humidity}%`;
            this.elements.windSpeed.textContent = `${data.current.windSpeed} km/h`;
            this.elements.pressure.textContent = `${data.current.pressure} hPa`;
            this.elements.visibility.textContent = `${data.current.visibility} km`;
            
            // Update details
            this.elements.uvIndex.textContent = data.current.uvIndex;
            this.elements.dewPoint.textContent = `${data.current.dewPoint}°C`;
            this.elements.cloudCover.textContent = `${data.current.cloudCover}%`;
            this.elements.precipitationProbability.textContent = `${data.current.precipitationProbability}%`;
            
            // Update forecasts
            this.displayHourlyForecast(data.hourly);
            this.displayDailyForecast(data.daily);
            
            this.showWeatherContent();
            
        } catch (error) {
            console.error('Display error:', error);
            this.showError('Erro ao exibir os dados meteorológicos.');
        }
    }
    
    displayHourlyForecast(hourlyData) {
        this.elements.hourlyForecast.innerHTML = '';
        
        hourlyData.slice(0, 12).forEach(hour => {
            const hourElement = document.createElement('div');
            hourElement.className = 'hourly-item';
            
            const weatherInfo = this.getWeatherInfo(hour.weatherCode);
            
            hourElement.innerHTML = `
                <div class="hourly-time">${this.formatTime(hour.time)}</div>
                <div class="hourly-icon">${weatherInfo.icon}</div>
                <div class="hourly-temp">${Math.round(hour.temperature)}°</div>
            `;
            
            this.elements.hourlyForecast.appendChild(hourElement);
        });
    }
    
    displayDailyForecast(dailyData) {
        this.elements.dailyForecast.innerHTML = '';
        
        dailyData.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'daily-item';
            
            const weatherInfo = this.getWeatherInfo(day.weatherCode);
            
            dayElement.innerHTML = `
                <div class="daily-date">${day.day}</div>
                <div class="daily-weather">
                    <div class="daily-icon">${weatherInfo.icon}</div>
                    <div class="daily-condition">${weatherInfo.description}</div>
                </div>
                <div class="daily-temps">
                    <span class="daily-high">${day.temperatureMax}°</span>
                    <span class="daily-low">${day.temperatureMin}°</span>
                </div>
            `;
            
            this.elements.dailyForecast.appendChild(dayElement);
        });
    }
    
    getWeatherInfo(code) {
        return this.weatherCodes[code] || { icon: '🌤️', description: 'Condição desconhecida' };
    }
    
    formatDateTime(date) {
        const now = new Date(date);
        const options = {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
        };
        return now.toLocaleDateString('pt-BR', options);
    }
    
    formatTime(date) {
        return new Date(date).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    formatDate(date, options = {}) {
        return new Date(date).toLocaleDateString('pt-BR', options);
    }
    
    showLoading() {
        this.elements.loadingSection.classList.remove('hidden');
        this.elements.errorSection.classList.add('hidden');
        this.elements.weatherContent.classList.add('hidden');
    }
    
    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorSection.classList.remove('hidden');
        this.elements.loadingSection.classList.add('hidden');
        this.elements.weatherContent.classList.add('hidden');
    }
    
    showWeatherContent() {
        this.elements.weatherContent.classList.remove('hidden');
        this.elements.loadingSection.classList.add('hidden');
        this.elements.errorSection.classList.add('hidden');
    }
}

// Additional utility functions
class WeatherUtils {
    static celsiusToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }
    
    static fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5/9;
    }
    
    static kmhToMph(kmh) {
        return kmh * 0.621371;
    }
    
    static mphToKmh(mph) {
        return mph * 1.60934;
    }
    
    static getUVIndexDescription(uvIndex) {
        if (uvIndex <= 2) return 'Baixo';
        if (uvIndex <= 5) return 'Moderado';
        if (uvIndex <= 7) return 'Alto';
        if (uvIndex <= 10) return 'Muito Alto';
        return 'Extremo';
    }
    
    static getWindDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    }
}

// Enhanced features
class WeatherEnhancements {
    constructor(app) {
        this.app = app;
        this.init();
    }
    
    init() {
        this.addKeyboardShortcuts();
        this.addThemeToggle();
        this.addAnimations();
        this.addLocalStorage();
    }
    
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.app.elements.locationInput.focus();
            }
            
            // Ctrl/Cmd + L for current location
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                this.app.getCurrentLocation();
            }
        });
    }
    
    addThemeToggle() {
        // Add theme toggle button to header
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('aria-label', 'Alternar tema');
        
        const headerContent = document.querySelector('.header-content');
        headerContent.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        
        // Load saved theme
        const savedTheme = localStorage.getItem('weather-app-theme');
        if (savedTheme === 'dark') {
            this.enableDarkTheme();
        }
    }
    
    toggleTheme() {
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
            this.enableLightTheme();
        } else {
            this.enableDarkTheme();
        }
    }
    
    enableDarkTheme() {
        document.body.classList.add('dark-theme');
        localStorage.setItem('weather-app-theme', 'dark');
        document.querySelector('.theme-toggle').innerHTML = '☀️';
    }
    
    enableLightTheme() {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('weather-app-theme', 'light');
        document.querySelector('.theme-toggle').innerHTML = '🌙';
    }
    
    addAnimations() {
        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);
        
        // Observe weather cards
        document.querySelectorAll('.weather-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    addLocalStorage() {
        // Save last searched location
        const originalHandleSearch = this.app.handleSearch.bind(this.app);
        this.app.handleSearch = async function() {
            const location = this.elements.locationInput.value.trim();
            if (location) {
                localStorage.setItem('weather-app-last-location', location);
            }
            return originalHandleSearch();
        };
        
        // Load last searched location
        const lastLocation = localStorage.getItem('weather-app-last-location');
        if (lastLocation) {
            this.app.elements.locationInput.value = lastLocation;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new WeatherApp();
    new WeatherEnhancements(app);
    
    // Add some CSS for dark theme
    const darkThemeStyles = `
        <style>
        .dark-theme {
            --gradient-sky: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
        }
        
        .dark-theme .weather-card {
            background: rgba(30, 41, 59, 0.95);
            color: var(--white);
        }
        
        .dark-theme .search-input {
            background: rgba(30, 41, 59, 0.95);
            color: var(--white);
            border-color: rgba(96, 165, 250, 0.3);
        }
        
        .dark-theme .header,
        .dark-theme .footer {
            background: rgba(30, 41, 59, 0.95);
            color: var(--white);
        }
        
        .theme-toggle {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            background: rgba(59, 130, 246, 0.1);
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', darkThemeStyles);
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
