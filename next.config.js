/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  env: {
    APP_NAME: "SITEMAN-STP",
    APP_DESCRIPTION: "Sistem Tenant Mentoring dan Manajemen Solo Technopark",
    APP_URL: "http://localhost:3000",
    API_URL: "http://localhost:8000/api",
  },
};
 
module.exports = nextConfig