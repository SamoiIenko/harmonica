/* craco.config.js */
const path = require(`path`);

// Single source of truth for the FSD layer aliases. Webpack wants them as
// absolute paths and Jest wants them as pattern -> <rootDir> mappings, so both
// are derived from this one list. Declaring them twice by hand is how you end up
// with imports that build fine but blow up in tests.
// Note: jsconfig.json carries the same list again for the IDE - JSON cannot
// import from here, so that copy still has to be kept in step manually.
const ALIASES = {
  "@assets": "src/assets",
  "@app": "src/app",
  "@pages": "src/pages",
  "@widgets": "src/widgets",
  "@features": "src/features",
  "@entities": "src/entities",
  "@shared": "src/shared",
};

const webpackAliases = Object.fromEntries(
  Object.entries(ALIASES).map(([alias, target]) => [
    alias,
    path.resolve(__dirname, target),
  ])
);

// Webpack resolves both `from '@pages'` and `from '@pages/create'` off a single
// alias, but Jest matches patterns literally, so each alias needs both shapes.
const jestModuleNameMapper = Object.fromEntries(
  Object.entries(ALIASES).flatMap(([alias, target]) => [
    // Bare layer root, e.g. `from '@pages'`.
    [`^${alias}$`, `<rootDir>/${target}`],
    // Slice inside a layer, e.g. `from '@features/audio'`.
    [`^${alias}/(.*)$`, `<rootDir>/${target}/$1`],
  ])
);

module.exports = {
  webpack: {
    // eslint-disable-next-line no-unused-vars
    configure: (webpackConfig, { env }) => {
      if (env === "development") {
        // Adjust webpack settings for "dev build"
        webpackConfig.devtool = "source-map";

        // Potentially remove minifiers or other dev-friendly tweaks
      }

      return webpackConfig;
    },
    alias: webpackAliases,
  },

  jest: {
    // Merged explicitly rather than replaced: CRA's own mappings handle CSS
    // modules and static assets, and dropping them would break every test.
    configure: (jestConfig) => ({
      ...jestConfig,
      moduleNameMapper: {
        ...jestConfig.moduleNameMapper,
        ...jestModuleNameMapper,
      },
    }),
  },
};
