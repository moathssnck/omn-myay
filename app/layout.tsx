import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"


export const metadata: Metadata = {
  title: "مياه عمان الفاخرة - Oman Premium Waters",
  description: "أنقى مياه في سلطنة عمان - Premium natural water from the heart of Oman",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
