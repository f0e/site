<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let innerWidth = 0;
	let innerHeight = 0;

	const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;

	let lastQuadrant = -1;

	const circleSpeed = 1;
	const circleMaxAlpha = 0.4;

	class Circle {
		x = 0;
		y = 0;
		radius = 0;

		constructor() {
			this.reset();
		}

		reset() {
			let quadrant = -1;
			do {
				this.x = Math.random();
				this.y = Math.random();
				this.radius = 0;

				if (this.x <= 0.5 && this.y <= 0.5) quadrant = 0;
				else if (this.x > 0.5 && this.y <= 0.5) quadrant = 1;
				else if (this.x <= 0.5 && this.y > 0.5) quadrant = 2;
				else if (this.x > 0.5 && this.y > 0.5) quadrant = 3;
			} while (quadrant === lastQuadrant);

			lastQuadrant = quadrant;
		}

		animate(delta: number) {
			this.radius = lerp(this.radius, 1, circleSpeed * delta);
		}

		draw(ctx: CanvasRenderingContext2D) {
			const alpha = (1 - this.radius) * circleMaxAlpha;
			const isDark = document.documentElement.classList.contains('dark');
			ctx.strokeStyle = isDark ? '#fff' : '#000';
			ctx.globalAlpha = alpha;

			ctx.beginPath();
			ctx.arc(
				this.x * canvas.width,
				this.y * canvas.height,
				this.radius * canvas.height,
				0,
				2 * Math.PI
			);
			ctx.stroke();
		}

		dead() {
			return this.radius > 0.99;
		}
	}

	let circles = [new Circle()];

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let frame: number;
		let lastTime: number | undefined;

		function render(time: number) {
			const delta = lastTime ? (time - lastTime) / 1000 : 1 / 60;
			lastTime = time;
			frame = requestAnimationFrame(render);

			canvas.width = innerWidth;
			canvas.height = innerHeight;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (const circle of circles) {
				circle.animate(delta);
				circle.draw(ctx);

				if (circle.dead()) {
					circle.reset();
				}
			}
		}

		frame = requestAnimationFrame(render);

		return () => cancelAnimationFrame(frame);
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<canvas bind:this={canvas} class="fixed top-0 left-0 w-full h-full -z-10" />
