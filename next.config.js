/**
 * @type {import('next').NextConfig}
 */
const packageJSON = require("./package.json");

const nextConfig = {
  env: {
    APP_NAME: "SITEMAN-STP",
    APP_DESCRIPTION: "Sistem Tenant Mentoring dan Manajemen Solo Technopark",
    APP_URL: "http://localhost:3000",
    API_URL: "http://localhost:8000/api",
    API_TINYMCE: "o4l95gui4izt7wza5inl45ilj7fle6abfwt08h5hwn6ffx5x",
    pdfjsVersion: packageJSON.dependencies["pdfjs-dist"],
  },
  images: {
    domains: ["img.freepik.com", "veterinaire-tour-hassan.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
