/**
 * Location Carousel Functionality
 * Handles navigation, indicators, and smooth transitions
 */

(function() {
    'use strict';

    const carousel = {
        container: null,
        slides: [],
        indicators: [],
        prevBtn: null,
        nextBtn: null,
        currentSlide: 0,
        totalSlides: 0,
        isTransitioning: false,

        init() {
            const carouselElement = document.querySelector('.location-carousel');
            if (!carouselElement) return;

            this.container = carouselElement.querySelector('.location-carousel__container');
            this.slides = Array.from(carouselElement.querySelectorAll('.location-carousel__slide'));
            this.indicators = Array.from(carouselElement.querySelectorAll('.location-carousel__indicator'));
            this.prevBtn = carouselElement.querySelector('.location-carousel__btn--prev');
            this.nextBtn = carouselElement.querySelector('.location-carousel__btn--next');
            this.totalSlides = this.slides.length;

            if (this.totalSlides === 0) return;

            // Initialize first slide
            this.showSlide(0);

            // Event listeners
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.goToPrevSlide());
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.goToNextSlide());
            }

            // Indicator clicks
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.goToPrevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.goToNextSlide();
                }
            });

            // Touch/swipe support for mobile
            this.initTouchEvents();
        },

        showSlide(index) {
            if (this.isTransitioning || index < 0 || index >= this.totalSlides) return;

            this.isTransitioning = true;
            this.currentSlide = index;

            // Update container transform
            const translateX = -index * 100;
            this.container.style.transform = `translateX(${translateX}%)`;

            // Update slide visibility
            this.slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            // Update indicators
            this.indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });

            // Reset transition flag after animation
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        goToSlide(index) {
            if (index === this.currentSlide || this.isTransitioning) return;
            this.showSlide(index);
        },

        goToPrevSlide() {
            const prevIndex = this.currentSlide === 0 
                ? this.totalSlides - 1 
                : this.currentSlide - 1;
            this.goToSlide(prevIndex);
        },

        goToNextSlide() {
            const nextIndex = this.currentSlide === this.totalSlides - 1 
                ? 0 
                : this.currentSlide + 1;
            this.goToSlide(nextIndex);
        },

        initTouchEvents() {
            let startX = 0;
            let currentX = 0;
            let isDragging = false;

            this.container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
            }, { passive: true });

            this.container.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
            }, { passive: true });

            this.container.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;

                const diffX = startX - currentX;
                const threshold = 50; // Minimum swipe distance

                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0) {
                        // Swipe left - next slide
                        this.goToNextSlide();
                    } else {
                        // Swipe right - previous slide
                        this.goToPrevSlide();
                    }
                }
            });
        }
    };

    // Initialize carousel when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => carousel.init());
    } else {
        carousel.init();
    }
})();

/**
 * Testimonials Carousel Functionality
 * Handles navigation, indicators, and smooth transitions
 */

(function() {
    'use strict';

    const testimonialsCarousel = {
        container: null,
        slides: [],
        indicators: [],
        currentSlide: 0,
        totalSlides: 0,
        isTransitioning: false,
        autoPlayInterval: null,

        init() {
            const carouselElement = document.querySelector('.testimonials-carousel');
            if (!carouselElement) return;

            this.container = carouselElement.querySelector('.testimonials-carousel__container');
            this.slides = Array.from(carouselElement.querySelectorAll('.testimonials-carousel__slide'));
            this.indicators = Array.from(carouselElement.querySelectorAll('.testimonials-section__indicator'));
            this.totalSlides = this.slides.length;

            if (this.totalSlides === 0) return;

            // Initialize first slide
            this.showSlide(0);

            // Indicator clicks
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    this.goToSlide(index);
                    // Pause auto-play on user interaction, resume after 10 seconds
                    this.pauseAndResumeAutoPlay();
                });
            });

            // Touch/swipe support for mobile
            this.initTouchEvents();

            // Start auto-play
            this.startAutoPlay();
        },

        showSlide(index) {
            if (this.isTransitioning || index < 0 || index >= this.totalSlides) return;

            this.isTransitioning = true;
            this.currentSlide = index;

            // Update slide visibility (fade transition only, no transform)
            this.slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            // Update indicators
            this.indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });

            // Reset transition flag after animation
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        goToSlide(index) {
            if (index === this.currentSlide || this.isTransitioning) return;
            this.showSlide(index);
        },

        goToPrevSlide() {
            const prevIndex = this.currentSlide === 0 
                ? this.totalSlides - 1 
                : this.currentSlide - 1;
            this.goToSlide(prevIndex);
        },

        goToNextSlide() {
            const nextIndex = this.currentSlide === this.totalSlides - 1 
                ? 0 
                : this.currentSlide + 1;
            this.goToSlide(nextIndex);
        },

        initTouchEvents() {
            let startX = 0;
            let currentX = 0;
            let isDragging = false;

            if (!this.container) return;

            this.container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
            }, { passive: true });

            this.container.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
            }, { passive: true });

            this.container.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;

                const diffX = startX - currentX;
                const threshold = 50; // Minimum swipe distance

                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0) {
                        // Swipe left - next slide
                        this.goToNextSlide();
                    } else {
                        // Swipe right - previous slide
                        this.goToPrevSlide();
                    }
                    // Pause auto-play on user interaction, resume after 10 seconds
                    this.pauseAndResumeAutoPlay();
                }
            });
        },

        startAutoPlay() {
            // Optional auto-play functionality
            this.autoPlayInterval = setInterval(() => {
                this.goToNextSlide();
            }, 3000); // Change slide every 5 seconds
        },

        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        },

        pauseAndResumeAutoPlay() {
            // Stop current auto-play
            this.stopAutoPlay();
            
            // Resume auto-play after 10 seconds of inactivity
            setTimeout(() => {
                this.startAutoPlay();
            }, 10000);
        }
    };

    // Initialize testimonials carousel when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => testimonialsCarousel.init());
    } else {
        testimonialsCarousel.init();
    }
})();

