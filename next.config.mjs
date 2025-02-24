/** @type {import('next').NextConfig} */
export default {
    productionBrowserSourceMaps: false,
    source: "/api/:path*",
    headers: [
        { key: "Access-Control-Allow-Origin", value: "https://eventara-user.vercel.app" },
    ],
};
