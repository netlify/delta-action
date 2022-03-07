import { buildSync } from 'esbuild'

const jsBanner = `
import { createRequire as ___internalCreateRequire } from 'module';
import { fileURLToPath as ___internalFileURLToPath } from "url";
import { dirname as ___internalPathDirname} from "path";
let __filename =___internalFileURLToPath(import.meta.url);
let __dirname = ___internalPathDirname(___internalFileURLToPath(import.meta.url));
let require = ___internalCreateRequire(import.meta.url);
`

buildSync({
  banner: {
    js: jsBanner,
  },
  bundle: true,
  entryPoints: ['src/index.js'],
  platform: 'node',
  outdir: 'dist',
  sourcemap: true,
})
