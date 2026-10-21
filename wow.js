// wow.js - Portal orbital con viaje a velocidad luz (solo index.html)
(function () {
    var portal = document.getElementById('portal');
    if (!portal) return;

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cv = document.getElementById('warp');
    var ctx = cv.getContext('2d');
    var sys = document.getElementById('system');
    var info = document.getElementById('info');

    // ---------- Título letra por letra ----------
    var title = document.querySelector('.wow-title');
    if (title) {
        var text = title.textContent.trim();
        title.setAttribute('aria-label', text);
        title.textContent = '';
        var idx = 0;
        text.split(' ').forEach(function (w, wi) {
            var word = document.createElement('span');
            word.className = 'word';
            word.setAttribute('aria-hidden', 'true');
            w.split('').forEach(function (c) {
                var s = document.createElement('span');
                s.className = 'ch';
                s.style.setProperty('--i', idx++);
                s.textContent = c;
                word.appendChild(s);
            });
            if (wi) title.appendChild(document.createTextNode(' '));
            title.appendChild(word);
        });
    }

    // ---------- Campo de estrellas (viaje a velocidad luz) ----------
    var W, H, dpr, Z = 1000;
    var COLORS = ['#ffffff', '#ffffff', '#a5f3fc', '#fbcfe8', '#fde68a'];
    var N = window.innerWidth < 600 ? 260 : 520;
    var stars = [];
    var speed = reduce ? 1.5 : 70;   // arranca en "warp" y frena
    var target = reduce ? 1.5 : 2.4; // velocidad de crucero
    var mx = 0, my = 0, cx = 0, cy = 0, visible = true;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = portal.clientWidth;
        H = portal.clientHeight;
        cv.width = W * dpr;
        cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (!cx) { cx = W / 2; cy = H / 2; }
    }

    function make(first) {
        return {
            x: (Math.random() * 2 - 1) * W,
            y: (Math.random() * 2 - 1) * H,
            z: first ? Math.random() * Z : Z,
            pz: Z,
            c: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
    }

    resize();
    for (var i = 0; i < N; i++) stars.push(make(true));
    window.addEventListener('resize', resize);

    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(portal);

    function frame() {
        requestAnimationFrame(frame);
        if (!visible) return;

        speed += (target - speed) * 0.035;
        cx += (W / 2 + mx * 40 - cx) * 0.05;
        cy += (H / 2 + my * 30 - cy) * 0.05;

        ctx.clearRect(0, 0, W, H);
        ctx.lineCap = 'round';
        var f = Math.max(W, H) * 0.5;

        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            s.pz = s.z;
            s.z -= speed;
            var sx = cx + (s.x / s.z) * f;
            var sy = cy + (s.y / s.z) * f;
            if (s.z <= 1 || sx < -50 || sx > W + 50 || sy < -50 || sy > H + 50) {
                stars[i] = make(false);
                continue;
            }
            var px = cx + (s.x / s.pz) * f;
            var py = cy + (s.y / s.pz) * f;
            var depth = 1 - s.z / Z;
            ctx.globalAlpha = Math.min(1, depth + 0.15);
            ctx.strokeStyle = s.c;
            ctx.lineWidth = depth * 2.2 + 0.4;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(sx, sy);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }
    frame();

    // ---------- Parallax con el mouse ----------
    if (!reduce) {
        portal.addEventListener('mousemove', function (e) {
            mx = (e.clientX / W - 0.5) * 2;
            my = (e.clientY / H - 0.5) * 2;
            sys.style.transform = 'perspective(1100px) rotateX(' + (-my * 6) + 'deg) rotateY(' + (mx * 8) + 'deg)';
        });
        portal.addEventListener('mouseleave', function () {
            mx = my = 0;
            sys.style.transform = '';
        });
    }

    // ---------- Panel de información ----------
    var iTag = info.querySelector('.tag');
    var iTitle = info.querySelector('h3');
    var iDesc = info.querySelector('p');
    var DEFAULT = {
        tag: 'Observatorio',
        title: 'Elige un planeta',
        desc: 'Pasa el cursor sobre un mundo para descubrirlo y haz clic para viajar hasta él.',
        glow: 'rgba(251,191,36,.75)'
    };

    function show(d) {
        iTag.textContent = d.tag;
        iTitle.textContent = d.title;
        iDesc.textContent = d.desc;
        sys.style.setProperty('--glow', d.glow);
        info.classList.remove('pulse');
        void info.offsetWidth;
        info.classList.add('pulse');
    }

    var planets = document.querySelectorAll('.planet');
    planets.forEach(function (p) {
        function enter() {
            show({ tag: p.dataset.tag, title: p.dataset.title, desc: p.dataset.desc, glow: p.dataset.glow });
        }
        p.addEventListener('mouseenter', enter);
        p.addEventListener('focus', enter);
        p.addEventListener('blur', function () { show(DEFAULT); });

        // Clic: salto al hiperespacio y luego navega
        p.addEventListener('click', function (e) {
            if (p.dataset.warp === 'no' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            var href = p.getAttribute('href');
            target = 140;
            document.body.classList.add('leaving');
            setTimeout(function () { window.location.href = href; }, reduce ? 0 : 650);
        });
    });
    sys.addEventListener('mouseleave', function () { show(DEFAULT); });

    // Al volver con el botón "atrás", se restablece la portada
    window.addEventListener('pageshow', function () {
        document.body.classList.remove('leaving');
        target = reduce ? 1.5 : 2.4;
    });

    // ---------- La cabecera aparece al bajar ----------
    function onScroll() {
        document.body.classList.toggle('show-head', window.scrollY > window.innerHeight * 0.5);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();