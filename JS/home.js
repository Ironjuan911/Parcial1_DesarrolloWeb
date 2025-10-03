// Gestión de la página de inicio
class HomePage {
    constructor() {
        this.init();
    }

    init() {
        // Configurar observador de scroll y mouse para la sección de estadísticas
        this.setupScrollObserver();
        this.setupMouseObserver();
        
        // Actualizar la estadística con números aleatorios para simular actividad
        this.updateVisitorStats();
    }

    animateStats() {
        const statNumber = document.querySelector('.stat-number');
        if (statNumber) {
            // Animación de contador
            let count = 0;
            const target = 100;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    statNumber.textContent = '100+';
                    clearInterval(timer);
                } else {
                    statNumber.textContent = Math.floor(count) + '+';
                }
            }, 30);
        }
    }

    setupScrollObserver() {
        const statsSection = document.querySelector('.stats-section');
        
        if (!statsSection) return;

        // Crear observador de intersección
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añadir clase visible cuando la sección entra en vista
                    statsSection.classList.add('visible');
                    
                    // Iniciar animación de contador después de que aparezca
                    setTimeout(() => {
                        this.animateStats();
                    }, 300);
                    
                    // Dejar de observar una vez que se ha activado
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2, // Activar cuando el 20% de la sección sea visible
            rootMargin: '0px 0px -50px 0px' // Activar un poco antes de que llegue al viewport
        });

        observer.observe(statsSection);
    }

    setupMouseObserver() {
        const footer = document.querySelector('#footer');
        const statsSection = document.querySelector('.stats-section');
        
        if (!footer || !statsSection) return;

        let isAnimated = false;

        // Detectar cuando el mouse se acerca al área del footer
        const handleMouseMove = (e) => {
            if (isAnimated) return;

            const footerRect = footer.getBoundingClientRect();
            const mouseY = e.clientY;
            const windowHeight = window.innerHeight;
            
            // Si el mouse está en el 20% inferior de la pantalla o cerca del footer
            if (mouseY > windowHeight * 0.8 || footerRect.top < windowHeight) {
                statsSection.classList.add('visible');
                
                setTimeout(() => {
                    this.animateStats();
                }, 300);
                
                isAnimated = true;
                // Remover el listener una vez activado
                document.removeEventListener('mousemove', handleMouseMove);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
    }

    updateVisitorStats() {
        // Simular variación en el número de visitantes (entre 100-150)
        const baseVisitors = 100;
        const variation = Math.floor(Math.random() * 51); // 0-50
        const totalVisitors = baseVisitors + variation;
        
        // Actualizar después de la animación inicial
        setTimeout(() => {
            const statNumber = document.querySelector('.stat-number');
            if (statNumber) {
                statNumber.textContent = totalVisitors + '+';
            }
        }, 2000);
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
});