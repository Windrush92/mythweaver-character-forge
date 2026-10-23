const packagerModule = require('@electron/packager');
const packager = typeof packagerModule === 'function' ? packagerModule : (packagerModule.packager || packagerModule.default);
const path = require('path');

async function build() {
  console.log('Packaging MythWeaver for Windows (lean production build)...');
  const rootDir = path.resolve(__dirname, '..');
  const appPaths = await packager({
    dir: rootDir,
    name: 'MythWeaver-5e',
    platform: 'win32',
    arch: 'x64',
    out: path.resolve(rootDir, 'dist-app'),
    overwrite: true,
    asar: true,
    prune: true,
    ignore: [
      /^\/src($|\/)/,
      /^\/node_modules($|\/)/,
      /^\/\.git($|\/)/,
      /^\/public($|\/)/,
      /^\/\.github($|\/)/,
      /^\/release($|\/)/,
      /^\/--win32-x64($|\/)/,
      /^\/dist-app($|\/)/,
      /^\/scripts($|\/)/,
      /\.zip$/
    ]
  });
  console.log('Successfully packaged app to:', appPaths);
}

build().catch(err => {
  console.error('Packaging failed:', err);
  process.exit(1);
});
