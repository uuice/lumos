import fs from 'fs/promises';

import autoprefixer from 'autoprefixer';
import { type BunPlugin } from 'bun';
import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

const tailwindcssPlugin = (): BunPlugin => ({
  name: 'bun-plugin-tailwindcss',
  setup: (build) => {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      console.log('Processing CSS file:', args.path);
      const css = await fs.readFile(args.path, 'utf-8');
      const processor = postcss([autoprefixer(), tailwindcss(), cssnano()]);
      const result = await processor.process(css, { from: args.path });
      
      // Create a direct JavaScript module that injects the styles
      const outfile = `
        /// <reference lib="dom.iterable" />
        
        const injectStyles = () => {
          const style = document.createElement('style');
          style.textContent = ${JSON.stringify(result.css)};
          document.head.appendChild(style);
        };
        
        injectStyles();
      `;
      return {
        contents: outfile,
        loader: 'ts'
      };
    });
  }
});

export default tailwindcssPlugin;
