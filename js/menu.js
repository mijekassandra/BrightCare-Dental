// Simple burger menu toggle
const burgerBtn = document.querySelector('.burger-menu-btn');
const closeBtn = document.querySelector('.close-menu-btn');
const nav = document.querySelector('.header__nav');

burgerBtn.addEventListener('click', () => {
    nav.classList.add('active');
    burgerBtn.style.display = 'none';
    closeBtn.style.display = 'flex';
    // Trigger reflow for smooth transition
    void closeBtn.offsetWidth;
    closeBtn.style.opacity = '1';
    closeBtn.style.transform = 'rotate(0deg)';
});

closeBtn.addEventListener('click', () => {
    nav.classList.remove('active');
    closeBtn.style.opacity = '0';
    closeBtn.style.transform = 'rotate(-90deg)';
    // Wait for transition before hiding
    setTimeout(() => {
        closeBtn.style.display = 'none';
        burgerBtn.style.display = 'flex';
        void burgerBtn.offsetWidth;
        burgerBtn.style.opacity = '1';
    }, 300);
});

