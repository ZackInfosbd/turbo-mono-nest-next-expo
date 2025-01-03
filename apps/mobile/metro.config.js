const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const { FileStore } = require('metro-cache');
const { withNativeWind } = require('nativewind/metro');
const { makeMetroConfig } = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

const defaultConfig = getDefaultConfig(__dirname, { isCSSEnabled: true });

const config = makeMetroConfig({
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    ...defaultConfig.resolver,
    resolveRequest: MetroSymlinksResolver(),
  },
});
const { transformer, resolver } = config;

const workspaceRoot = path.resolve(__dirname, '../..');

if (config.resolver) {
  // #1 - Watch all files in the monorepo
  config.watchFolders = [workspaceRoot];
  // #2 - Try resolving with project modules first, then workspace modules
  config.resolver.nodeModulesPaths = [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ];
  // #3 - Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
  config.resolver.disableHierarchicalLookup = true;
  // Use turborepo to restore the cache when possible
  config.cacheStores = [
    new FileStore({
      root: path.join(__dirname, 'node_modules', '.cache', 'metro'),
    }),
  ];
}

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = withNativeWind(config, {
  input: '../../global.css',
  configPath: path.resolve(__dirname, './tailwind.config.js'),
  // inlineRules: true,
});

// const { getDefaultConfig } = require('expo/metro-config');
// const { withNativeWind } = require('nativewind/metro');
// const { FileStore } = require('metro-cache');
// const path = require('path');

// const projectRoot = __dirname;
// const workspaceRoot = path.resolve(projectRoot, '../..');

// const config = getDefaultConfig(projectRoot, { isCSSEnabled: true });

// config.watchFolders = [workspaceRoot];

// config.resolver = {
//   ...config.resolver,
//   nodeModulesPaths: [
//     path.resolve(projectRoot, 'node_modules'),
//     path.resolve(workspaceRoot, 'node_modules'),
//     path.resolve(workspaceRoot, '.pnpm'),
//   ],
//   disableHierarchicalLookup: true,
//   assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
//   sourceExts: [...config.resolver.sourceExts, 'svg'],
// };

// config.transformer = {
//   ...config.transformer,
//   babelTransformerPath: require.resolve('react-native-svg-transformer'),
// };

// config.cacheStores = [
//   new FileStore({
//     root: path.join(projectRoot, 'node_modules', '.cache', 'metro'),
//   }),
// ];

// module.exports = withNativeWind(config, {
//   input: './src/global.css',
//   configPath: './tailwind.config.js',
//   inlineRules: true,
// });

// /* eslint-disable no-undef */
// // Learn more: https://docs.expo.dev/guides/monorepos/
// const { getDefaultConfig } = require('expo/metro-config');
// const { FileStore } = require('metro-cache');
// const { withNativeWind } = require('nativewind/metro');
// const path = require('path');

// const config = withTurborepoManagedCache(
//   withMonorepoPaths(
//     // Create the default Metro config using getDefaultConfig(__dirname)
//     withNativeWind(getDefaultConfig(__dirname), {
//       input: './global.css',
//       configPath: './tailwind.config.ts',
//     }),
//   ),
// );
// // XXX: Resolve our exports in workspace packages
// // https://github.com/expo/expo/issues/26926
// config.resolver.unstable_enablePackageExports = true;

// module.exports = config;

// /**
//  * Add the monorepo paths to the Metro config.
//  * This allows Metro to resolve modules from the monorepo.
//  *
//  * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
//  * @param {import('expo/metro-config').MetroConfig} config
//  * @returns {import('expo/metro-config').MetroConfig}
//  */
// function withMonorepoPaths(config) {
//   // Find the project and workspace directories
//   const projectRoot = __dirname;

//   // This can be replaced with `find-yarn-workspace-root`
//   const workspaceRoot = path.resolve(projectRoot, '../..');

//   // #1 - Watch all files in the monorepo
//   config.watchFolders = [workspaceRoot];

//   // #2. Let Metro know where to resolve packages and in what order
//   // #2 - Resolve modules within the project's `node_modules` first, then all monorepo modules
//   config.resolver.nodeModulesPaths = [
//     path.resolve(projectRoot, 'node_modules'),
//     path.resolve(workspaceRoot, 'node_modules'),
//   ];

//   return config;
// }

// /**
//  * Move the Metro cache to the `.cache/metro` folder.
//  * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
//  *
//  * @see https://turbo.build/repo/docs/reference/configuration#env
//  * @param {import('expo/metro-config').MetroConfig} config
//  * @returns {import('expo/metro-config').MetroConfig}
//  */
// function withTurborepoManagedCache(config) {
//   // 4. Use turborepo to restore the cache when possible
//   // Ensure the cache isn't shared between projects
//   // this ensures the transform-time environment variables are changed to reflect
//   // the current project.
//   config.cacheStores = [
//     new FileStore({
//       root: path.join(__dirname, 'node_modules', '.cache', 'metro'),
//     }),
//   ];
//   return config;
// }
