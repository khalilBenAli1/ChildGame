const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('obj', 'mtl', 'mp3', 'JPG', 'vrx', 'hdr', 'gltf', 'glb', 'bin', 'arobject', 'gif', 'fbx');

module.exports = config;