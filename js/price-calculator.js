class PriceCalculator {
    constructor() {
        this.form = document.getElementById('priceCalculatorForm');
        this.basePrice = document.getElementById('basePrice');
        this.workCharges = document.getElementById('workCharges');
        this.customizationCharges = document.getElementById('customizationCharges');
        this.totalPrice = document.getElementById('totalPrice');
        
        this.prices = {
            garmentType: {
                saree: 2500,
                blouse: 1500,
                lehenga: 5000
            },
            fabric: {
                silk: 3000,
                cotton: 1000,
                georgette: 1500,
                chiffon: 1800
            },
            workType: {
                embroidery: 2000,
                maggam: 2500,
                stonework: 1500
            }
        };

        this.initializeEvents();
    }

    initializeEvents() {
        // Listen to all form changes
        this.form.addEventListener('change', () => this.calculatePrice());

        // Garment type selection
        document.querySelectorAll('input[name="garmentType"]').forEach(input => {
            input.addEventListener('change', () => {
                this.updateFabricOptions(input.value);
                this.calculatePrice();
            });
        });

        // Customization level
        document.querySelector('input[name="customizationLevel"]').addEventListener('input', (e) => {
            this.updateCustomizationLabel(e.target.value);
            this.calculatePrice();
        });

        // Proceed to booking button
        document.getElementById('proceedToBooking').addEventListener('click', () => {
            this.proceedToBooking();
        });
    }

    calculatePrice() {
        const formData = new FormData(this.form);
        let base = 0;
        let work = 0;
        let customization = 0;

        // Calculate base price
        const garmentType = formData.get('garmentType');
        const fabricType = formData.get('fabricType');
        if (garmentType && fabricType) {
            base = this.prices.garmentType[garmentType] + this.prices.fabric[fabricType];
        }

        // Calculate work charges
        const workTypes = formData.getAll('workType');
        work = workTypes.reduce((total, type) => {
            return total + this.prices.workType[type];
        }, 0);

        // Calculate customization charges
        const level = parseInt(formData.get('customizationLevel'));
        customization = base * (level * 0.1);

        // Update display
        this.basePrice.textContent = `₹${base}`;
        this.workCharges.textContent = `₹${work}`;
        this.customizationCharges.textContent = `₹${Math.round(customization)}`;
        this.totalPrice.textContent = `₹${Math.round(base + work + customization)}`;
    }

    updateFabricOptions(garmentType) {
        const fabricSelect = this.form.querySelector('select[name="fabricType"]');
        fabricSelect.innerHTML = '<option value="">Select Fabric</option>';
        
        const fabrics = {
            saree: ['silk', 'cotton', 'georgette'],
            blouse: ['silk', 'cotton'],
            lehenga: ['silk', 'georgette', 'chiffon']
        };

        fabrics[garmentType].forEach(fabric => {
            const option = document.createElement('option');
            option.value = fabric;
            option.textContent = fabric.charAt(0).toUpperCase() + fabric.slice(1);
            fabricSelect.appendChild(option);
        });
    }

    updateCustomizationLabel(value) {
        const labels = ['Basic', 'Standard', 'Premium', 'Luxury', 'Elite'];
        document.querySelector('.range-labels span:first-child').textContent = labels[value - 1];
    }

    proceedToBooking() {
        const formData = new FormData(this.form);
        const orderDetails = {
            garmentType: formData.get('garmentType'),
            fabricType: formData.get('fabricType'),
            workTypes: formData.getAll('workType'),
            customizationLevel: formData.get('customizationLevel'),
            estimatedPrice: this.totalPrice.textContent
        };

        // Save order details to localStorage
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

        // Redirect to booking section
        window.location.href = '#appointment-booking';
    }
}

// Initialize Price Calculator
document.addEventListener('DOMContentLoaded', () => {
    const priceCalculator = new PriceCalculator();
}); 