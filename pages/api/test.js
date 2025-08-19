export default function handler(req, res) {
  res.status(200).json({
    googleId: process.env.GOOGLE_CLIENT_ID,
    nextAuthUrl: process.env.NEXTAUTH_URL
  })
}