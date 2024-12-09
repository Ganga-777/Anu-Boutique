class SizeCustomizer {
    constructor() {
        this.form = document.getElementById('measurementForm');
        this.tabs = document.querySelectorAll('.tab-btn');
        this.currentCategory = 'blouse';
        this.measurements = {};
        
        this.initializeEvents();
    }

    initializeEvents() {
        // Tab switching
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchCategory(tab.dataset.category);
            });
        });

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveMeasurements();
        });

        // Interactive guide points
        this.initializeGuidePoints();
    }

    switchCategory(category) {
        this.currentCategory = category;
        
        // Update active tab
        this.tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });

        // Update form fields based on category
        this.updateFormFields();
    }

    updateFormFields() {
        const fields = {
            blouse: ['shoulder', 'bust', 'waist', 'arm-length', 'neck'],
            dress: ['shoulder', 'bust', 'waist', 'hip', 'length'],
            saree: ['blouse-size', 'saree-length', 'petticoat-length']
        };

        const measurementFields = document.querySelector('.measurement-fields');
        measurementFields.innerHTML = '';

        fields[this.currentCategory].forEach(field => {
            measurementFields.appendChild(this.createField(field));
        });
    }

    createField(name) {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
            <label>${name.replace('-', ' ').toUpperCase()}</label>
            <div class="input-group">
                <input type="number" class="form-control" name="${name}" step="0.1"
                       value="${this.measurements[name] || ''}" required>
                <span class="input-group-text">inches</span>
            </div>
        `;
        return div;
    }

    saveMeasurements() {
        const formData = new FormData(this.form);
        this.measurements = {
            ...this.measurements,
            [this.currentCategory]: Object.fromEntries(formData)
        };

        // Save to localStorage
        localStorage.setItem('userMeasurements', JSON.stringify(this.measurements));

        // Show success message
        this.showNotification('Measurements saved successfully!');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'measurement-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    initializeGuidePoints() {
        const guidePoints = document.querySelector('.guide-points');
        const points = [
            { top: '20%', left: '50%', label: 'Shoulder' },
            { top: '30%', left: '50%', label: 'Bust' },
            { top: '40%', left: '50%', label: 'Waist' }
            // Add more points as needed
        ];

        points.forEach(point => {
            const dot = document.createElement('div');
            dot.className = 'guide-point';
            dot.style.top = point.top;
            dot.style.left = point.left;
            dot.setAttribute('data-tooltip', point.label);
            guidePoints.appendChild(dot);
        });
    }
}

// Initialize Size Customizer
document.addEventListener('DOMContentLoaded', () => {
    const sizeCustomizer = new SizeCustomizer();
}); 