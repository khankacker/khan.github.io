$(function () {
    const canvas = $("#canvas")[0];
    const ctx = canvas.getContext("2d");

    // Set canvas size
    function resizeCanvas() {
        canvas.width = $(window).width();
        canvas.height = $(window).height();
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    resizeCanvas();

    // Resize canvas on window resize
    $(window).on("resize", resizeCanvas);

    // Initialize objects
    const listFire = [];
    const listFirework = [];
    const fireNumber = 10;
    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    const range = 100;

    // Create initial fires
    for (let i = 0; i < fireNumber; i++) {
        const fire = {
            x: Math.random() * range - range / 2 + center.x,
            y: Math.random() * range * 2 + canvas.height,
            size: Math.random() + 0.5,
            fill: "#fd1",
            vx: Math.random() - 0.5,
            vy: -(Math.random() + 4),
            ax: Math.random() * 0.02 - 0.01,
            far: Math.random() * range + (center.y - range),
            base: null
        };
        fire.base = { x: fire.x, y: fire.y, vx: fire.vx };
        listFire.push(fire);
    }

    // Generate random color
    function randColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Update animation frames
    function update() {
        // Update fires
        listFire.forEach((fire) => {
            if (fire.y <= fire.far) {
                // Create fireworks
                const color = randColor();
                for (let i = 0; i < fireNumber * 5; i++) {
                    const firework = {
                        x: fire.x,
                        y: fire.y,
                        size: Math.random() + 1.5,
                        fill: color,
                        vx: Math.random() * 5 - 2.5,
                        vy: Math.random() * -5 + 1.5,
                        ay: 0.05,
                        alpha: 1,
                        life: Math.round(Math.random() * range / 2) + range / 2,
                        base: null
                    };
                    firework.base = { life: firework.life, size: firework.size };
                    listFirework.push(firework);
                }

                // Reset fire properties
                fire.y = fire.base.y;
                fire.x = fire.base.x;
                fire.vx = fire.base.vx;
                fire.ax = Math.random() * 0.02 - 0.01;
            }

            fire.x += fire.vx;
            fire.y += fire.vy;
            fire.vx += fire.ax;
        });

        // Update fireworks
        for (let i = listFirework.length - 1; i >= 0; i--) {
            const firework = listFirework[i];
            firework.x += firework.vx;
            firework.y += firework.vy;
            firework.vy += firework.ay;
            firework.alpha = firework.life / firework.base.life;
            firework.size = firework.alpha * firework.base.size;
            firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
            firework.life--;

            // Remove expired fireworks
            if (firework.life <= 0) {
                listFirework.splice(i, 1);
            }
        }
    }

    // Draw objects on canvas
    function draw() {
        // Clear canvas
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw fires
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = 1;
        listFire.forEach((fire) => {
            ctx.beginPath();
            ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = fire.fill;
            ctx.fill();
        });

        // Draw fireworks
        listFirework.forEach((firework) => {
            ctx.globalAlpha = firework.alpha;
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = firework.fill;
            ctx.fill();
        });
    }

    // Main animation loop
    (function loop() {
        requestAnimationFrame(loop);
        update();
        draw();
    })();
});
