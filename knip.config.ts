import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignoreExportsUsedInFile: true,
  workspaces: {
    'apps/*': {
      entry: ['eslint.config.js']
    },
    'configurations/eslint': {
      entry: ['base.js', 'node.js', 'next.js', 'react-internal.js', 'monk.js']
    },
    'packages/core': {
      // Only controllers are public. Entities and repositories are internal implementation
      // details — knip reaches them by following the import chain from controllers.
      entry: ['src/controllers/*/index.ts']
    },
    'packages/*': {
      entry: ['eslint.config.js', 'turbo/generators/config.ts']
    }
  }
};

export default config;
