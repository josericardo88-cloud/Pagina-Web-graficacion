// main.js - Comportamiento compartido del sitio
document.addEventListener('DOMContentLoaded', () => {

    // 1) Marca automáticamente el enlace activo del menú
    const file = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(a => {
        if (a.getAttribute('href') === file) a.classList.add('active');
    });

    // 2) Tarjetas: inclinación 3D + brillo que sigue al cursor
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            card.style.setProperty('--mx', (x * 100) + '%');
            card.style.setProperty('--my', (y * 100) + '%');
            card.style.transform =
                'perspective(800px) rotateX(' + ((0.5 - y) * 8) + 'deg) rotateY(' + ((x - 0.5) * 10) + 'deg) translateY(-4px)';
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    // 3) Filtros de la galería
    const chips = document.querySelectorAll('.chip[data-filter]');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('on'));
            chip.classList.add('on');
            const f = chip.dataset.filter;
            document.querySelectorAll('.card').forEach(card => {
                card.classList.toggle('hide', f !== 'todos' && card.dataset.cat !== f);
            });
        });
    });

    // 4) Botón "Sorpréndeme"
    const rnd = document.getElementById('random-btn');
    if (rnd) {
        rnd.addEventListener('click', () => {
            const cards = Array.from(document.querySelectorAll('.card:not(.hide)'));
            if (cards.length) location.href = cards[Math.floor(Math.random() * cards.length)].getAttribute('href');
        });
    }

    // 5) Controles de los sketches de p5.js (pausar / reiniciar)
    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const toggle = document.querySelector('[data-action="toggle"]');
            if (btn.dataset.action === 'toggle' && typeof isLooping === 'function') {
                if (isLooping()) { noLoop(); btn.textContent = '▶ Reanudar'; }
                else { loop(); btn.textContent = '⏸ Pausar'; }
            }
            if (btn.dataset.action === 'reset' && typeof reiniciar === 'function') {
                reiniciar();
                if (toggle) toggle.textContent = '⏸ Pausar';
            }
        });
    });
});