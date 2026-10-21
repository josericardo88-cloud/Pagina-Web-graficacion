// previews.js - Miniaturas animadas de los 3 gráficos nuevos (canvas 2D nativo)
(function () {
    function circle(ctx, x, y, d) {
        ctx.beginPath();
        ctx.arc(x, y, d / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    var scenes = {
        sol: function (ctx) {
            var size = 30;
            return function () {
                ctx.fillStyle = 'rgb(82,222,240)'; ctx.fillRect(0, 0, 400, 400);
                ctx.fillStyle = 'rgb(255,204,0)'; circle(ctx, 200, 298, size);
                ctx.fillStyle = 'rgb(76,168,67)'; ctx.fillRect(0, 300, 400, 100);
                size += 1.5;
                if (size > 650) size = 30;
            };
        },
        nubes: function (ctx) {
            var l = 136, r = 266, sun = 100;
            function cloud(x, y) {
                ctx.beginPath(); ctx.ellipse(x, y, 63, 48.5, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 62, y, 35, 30, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x - 62, y, 35, 30, 0, 0, Math.PI * 2); ctx.fill();
            }
            return function () {
                ctx.fillStyle = 'rgb(184,236,255)'; ctx.fillRect(0, 0, 400, 400);
                ctx.fillStyle = 'rgb(255,170,0)'; circle(ctx, 200, 100, sun);
                ctx.fillStyle = '#fff';
                cloud(l, 150); cloud(r, 100);
                l -= 0.8; r += 0.8; sun += 1.6;
                if (l < -220) { l = 136; r = 266; sun = 100; }
            };
        },
        estrella: function (ctx) {
            var x = -40, y = 40, x2 = -40, y2 = 40;
            return function () {
                ctx.fillStyle = 'rgb(10,15,45)'; ctx.fillRect(0, 0, 400, 400);
                ctx.fillStyle = '#fff';
                [[70, 90, 3], [150, 40, 2], [280, 80, 4], [350, 150, 3], [90, 250, 4]].forEach(function (s) { circle(ctx, s[0], s[1], s[2] * 1.6); });
                ctx.fillStyle = 'rgba(255,100,0,0.4)'; circle(ctx, x - 30, y - 15, 12);
                ctx.fillStyle = 'rgb(255,100,0)'; circle(ctx, x - 18, y - 9, 14);
                ctx.fillStyle = 'rgb(255,220,50)'; circle(ctx, x - 8, y - 4, 16);
                ctx.fillStyle = '#fff'; circle(ctx, x, y, 16);
                x += 3; y += 2;
                if (x > 420) { x = -20; y = 50; }
                ctx.fillStyle = 'rgb(100,200,255)'; circle(ctx, x2, y2, 10);
                x2 -= 3; y2 += 3;
                if (x2 < -20) { x2 = 440; y2 = 20; }
            };
        }
    };

    document.querySelectorAll('canvas[data-preview]').forEach(function (cv) {
        var ctx = cv.getContext('2d');
        var step = scenes[cv.dataset.preview](ctx);
        (function loop() { step(); requestAnimationFrame(loop); })();
    });
})();