const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let valid = true;

        [name, email, message].forEach(field => field.classList.remove('error'));

        if (!name.value.trim()) { name.classList.add('error'); valid = false; }
        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('error'); valid = false;
        }
        if (!message.value.trim()) { message.classList.add('error'); valid = false; }

        if (!valid) return;

        const btn = contactForm.querySelector('.btn-send');
        btn.disabled = true;
        btn.textContent = 'Sending…';

        // TODO: replace with real submission (Formspree / backend API)
        setTimeout(() => {
            contactForm.innerHTML = '<p class="form-success">Thanks! I\'ll get back to you soon.</p>';
        }, 800);
    });
}
