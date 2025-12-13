// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
	outDir: "dist",
	entry: ['src/index.ts'],
	format: ['esm'],
	dts: true,
	sourcemap: true,
	clean: true,
	minify: true,
});
