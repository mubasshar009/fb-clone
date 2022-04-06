/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images:{
    domains:[
      "links.papareact.com",
      "platform-lookside.fbsbx.com",
      "firebasestorage.googleapis.com",
    ]
  }
}
