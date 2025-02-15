import { Geist, Geist_Mono, Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

const fonts = [geistSans, inter]

export default fonts
