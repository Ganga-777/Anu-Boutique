class DesignCustomizer {
    constructor() {
        this.canvas = document.getElementById('designCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.history = [];
        this.currentStep = -1;
        this.selectedFabric = null;
        this.selectedPattern = null;
        
        this.initializeCanvas();
        this.loadFabrics();
        this.loadPatterns();
        this.initializeEvents();
    }

    initializeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.ctx.fillStyle = 'transparent';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    async loadFabrics() {
        const fabricSwatches = document.querySelector('.fabric-swatches');
        const fabrics = [
            { id: 1, name: 'Silk', image: 'silk-texture.jpg' },
            { id: 2, name: 'Cotton', image: 'cotton-texture.jpg' },
            { id: 3, name: 'Chiffon', image: 'chiffon-texture.jpg' },
            // Add more fabrics
        ];

        fabrics.forEach(fabric => {
            const swatch = document.createElement('div');
            swatch.className = 'fabric-swatch';
            swatch.style.backgroundImage = `url(assets/images/fabrics/${fabric.image})`;
            swatch.setAttribute('data-fabric-id', fabric.id);
            swatch.addEventListener('click', () => this.selectFabric(fabric));
            fabricSwatches.appendChild(swatch);
        });
    }

    async loadPatterns() {
        const patternGrid = document.querySelector('.pattern-grid');
        const patterns = [
            { id: 1, name: 'Floral', image: 'floral-pattern.png' },
            { id: 2, name: 'Geometric', image: 'geometric-pattern.png' },
            // Add more patterns
        ];

        patterns.forEach(pattern => {
            const item = document.createElement('div');
            item.className = 'pattern-item';
            item.innerHTML = `
                <img src="assets/images/patterns/${pattern.image}" alt="${pattern.name}">
                <span>${pattern.name}</span>
            `;
            item.addEventListener('click', () => this.selectPattern(pattern));
            patternGrid.appendChild(item);
        });
    }

    initializeEvents() {
        // Color picker events
        document.getElementById('primaryColor').addEventListener('change', (e) => {
            this.updateColor('primary', e.target.value);
        });

        document.getElementById('secondaryColor').addEventListener('change', (e) => {
            this.updateColor('secondary', e.target.value);
        });

        // Control button events
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        document.getElementById('saveDesignBtn').addEventListener('click', () => this.saveDesign());

        // Custom options events
        document.querySelectorAll('.custom-options input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.updateCustomOption(e.target.name, e.target.checked);
            });
        });
    }

    selectFabric(fabric) {
        this.selectedFabric = fabric;
        this.updatePreview();
    }

    selectPattern(pattern) {
        this.selectedPattern = pattern;
        this.updatePreview();
    }

    updateColor(type, color) {
        this[`${type}Color`] = color;
        this.updatePreview();
    }

    updateCustomOption(option, value) {
        this[option] = value;
        this.updatePreview();
    }

    updatePreview() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Apply fabric texture
        if (this.selectedFabric) {
            // Apply fabric texture logic
        }

        // Apply pattern
        if (this.selectedPattern) {
            // Apply pattern logic
        }

        // Apply colors
        // Apply custom options

        this.saveToHistory();
    }

    undo() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.loadFromHistory();
        }
    }

    redo() {
        if (this.currentStep < this.history.length - 1) {
            this.currentStep++;
            this.loadFromHistory();
        }
    }

    saveToHistory() {
        this.currentStep++;
        this.history.splice(this.currentStep);
        this.history.push(this.canvas.toDataURL());
    }

    loadFromHistory() {
        const img = new Image();
        img.src = this.history[this.currentStep];
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0);
        };
    }

    saveDesign() {
        const design = {
            fabric: this.selectedFabric,
            pattern: this.selectedPattern,
            primaryColor: this.primaryColor,
            secondaryColor: this.secondaryColor,
            customOptions: {
                sleeveStyle: this['sleeve-style'],
                neckDesign: this['neck-design'],
                borderWork: this['border-work']
            },
            preview: this.canvas.toDataURL()
        };

        // Save to localStorage or send to server
        localStorage.setItem('savedDesign', JSON.stringify(design));
        this.showNotification('Design saved successfully!');
    }

    showNotification(message) {
        // Implementation similar to size customizer notification
    }
}

// Initialize Design Customizer
document.addEventListener('DOMContentLoaded', () => {
    const designCustomizer = new DesignCustomizer();
}); 