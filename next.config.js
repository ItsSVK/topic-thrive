/** @type {import('next').NextConfig} */
import webpack from 'webpack';
import dotenv from 'dotenv';
const { parsed: myEnv } = dotenv.config();
const nextConfig = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
};

module.exports = nextConfig;
