
        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('waveCanvas');
            const ctx = canvas.getContext('2d');
            
            // Paramètres initiaux
            let params = {
                frequency: 2,
                amplitude: 50,
                wavelength: 120,
                speed: 3,
                resolution: 2,
                thickness: 3,
                phase: 0
            };
            
            // Éléments de contrôle
            const frequencySlider = document.getElementById('frequency');
            const amplitudeSlider = document.getElementById('amplitude');
            const wavelengthSlider = document.getElementById('wavelength');
            const speedSlider = document.getElementById('speed');
            const resolutionSlider = document.getElementById('resolution');
            const thicknessSlider = document.getElementById('thickness');
            
            // Affichage des valeurs
            const freqValue = document.getElementById('freqValue');
            const ampValue = document.getElementById('ampValue');
            const waveValue = document.getElementById('waveValue');
            const speedValue = document.getElementById('speedValue');
            const resValue = document.getElementById('resValue');
            const thickValue = document.getElementById('thickValue');
            
            // Mise à jour des valeurs affichées
            function updateDisplay() {
                freqValue.textContent = params.frequency.toFixed(1) + ' Hz';
                ampValue.textContent = params.amplitude + '%';
                waveValue.textContent = params.wavelength + 'px';
                thickValue.textContent = params.thickness + 'px';
                
                // Valeurs qualitatives
                const speedLabels = ['Très lente', 'Lente', 'Moyenne', 'Rapide', 'Très rapide'];
                speedValue.textContent = speedLabels[params.speed - 1];
                
                const resLabels = ['Basse', 'Moyenne', 'Élevée'];
                resValue.textContent = resLabels[params.resolution - 1];
            }
            
            // Écouteurs pour les sliders
            frequencySlider.addEventListener('input', () => {
                params.frequency = parseFloat(frequencySlider.value);
                updateDisplay();
            });
            
            amplitudeSlider.addEventListener('input', () => {
                params.amplitude = parseInt(amplitudeSlider.value);
                updateDisplay();
            });
            
            wavelengthSlider.addEventListener('input', () => {
                params.wavelength = parseInt(wavelengthSlider.value);
                updateDisplay();
            });
            
            speedSlider.addEventListener('input', () => {
                params.speed = parseInt(speedSlider.value);
                updateDisplay();
            });
            
            resolutionSlider.addEventListener('input', () => {
                params.resolution = parseInt(resolutionSlider.value);
                updateDisplay();
            });
            
            thicknessSlider.addEventListener('input', () => {
                params.thickness = parseInt(thicknessSlider.value);
                updateDisplay();
            });
            
            // Ajustement de la taille du canvas
            function resizeCanvas() {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
            
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            
            // Fonction de dessin de l'onde
            function drawWave() {
                const width = canvas.width;
                const height = canvas.height;
                const centerY = height / 2;
                
                // Effacer le canvas
                ctx.clearRect(0 0 width height);
                
                // Calculer le pas en fonction de la résolution
                const step = Math.max(1 10 - (params.resolution * 2));
                
                // Définir le style de la vague
                ctx.beginPath();
                ctx.lineWidth = params.thickness;
                ctx.strokeStyle = '#2c6bed';
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                
                // Calculer l'amplitude réelle (pourcentage de la hauteur du canvas)
                const amplitudePx = (params.amplitude / 100) * (height / 2);
                
                // Dessiner la vague
                for (let x = 0; x <= width; x += step) {
                    // Équation d'onde : y = A * sin(2π(x/λ - ft) + φ)
                    const y = centerY + amplitudePx * Math.sin(
                        (2 * Math.PI * x) / params.wavelength - 
                        (params.phase * params.frequency * 0.1)
                    );
                    
                    if (x === 0) {
                        ctx.moveTo(x y);
                    } else {
                        ctx.lineTo(x y);
                    }
                }
                
                ctx.stroke();
                
                // Mettre à jour la phase pour l'animation
                params.phase += params.speed * 0.02;
                
                // Prochaine frame
                requestAnimationFrame(drawWave);
            }
            
            // Initialiser l'affichage et démarrer l'animation
            updateDisplay();
            drawWave();
        });
    