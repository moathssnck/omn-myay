"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, CheckCircle, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export function CartSidebar() {
  const { items, isOpen, updateQuantity, getTotalPrice, setCartOpen } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Overlay for mobile */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50" onClick={() => setCartOpen(false)} />

      {/* Cart content */}
      <Card className="fixed right-0 top-0 h-full w-full max-w-md lg:relative lg:h-auto shadow-xl border-0 lg:sticky lg:top-24 z-50">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center justify-between text-lg md:text-xl">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 ml-2" />
              سلة التسوق
            </div>
            <Button variant="ghost" size="sm" onClick={() => setCartOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">السلة فارغة</p>
              <p className="text-sm text-gray-400 mt-2">أضف بعض المنتجات لتبدأ التسوق</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6 max-h-64 md:max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 space-x-reverse border-b pb-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-lg shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.size}</p>
                      <p className="text-blue-600 font-bold text-sm">{item.price.toFixed(3)} ر.ع</p>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">المجموع:</span>
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {getTotalPrice().toFixed(3)} ر.ع
                  </span>
                </div>
                <Link href="/checkout">
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg"
                    size="lg"
                    onClick={() => setCartOpen(false)}
                  >
                    <CheckCircle className="w-5 h-5 ml-2" />
                    إتمام الطلب
                  </Button>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
