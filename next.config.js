module.exports = {
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    if (!isServer) config.resolve.fallback.fs = false;
    return config;
  }
};