// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add additional configuration for web platform
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Blacklist specific native modules that cause issues on web
config.resolver.blacklistRE = [
  // Exclude react-native-maps native modules on web platform
  /.*\/node_modules\/react-native-maps\/lib\/.*\/MapMarkerNativeComponent.js/,
  /.*\/node_modules\/react-native-maps\/lib\/.*\/codegenNativeCommands.js/,
  /.*\/node_modules\/react-native-maps\/lib\/.*\/NativeCommands.js/,
];

// Configure the Metro bundler to properly resolve platform-specific extensions
config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [...process.env.RN_SRC_EXT.split(',').concat(config.resolver.sourceExts), 'web.tsx', 'web.ts', 'web.jsx', 'web.js', 'native.tsx', 'native.ts', 'native.jsx', 'native.js']
  : [...config.resolver.sourceExts, 'web.tsx', 'web.ts', 'web.jsx', 'web.js', 'native.tsx', 'native.ts', 'native.jsx', 'native.js'];

// Ensure .web.js files are processed before .js files
config.resolver.platforms = ['web', 'ios', 'android'];

module.exports = config; 