"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ShoppingCart, Plus, Minus, Trash2, Gift, Percent, CheckCircle, Truck, Shield, Droplets, Heart, Star } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])

  const subtotal = getTotalPrice()
  const deliveryFee = subtotal >= 5 ? 0 : 1.5
  const discount = (subtotal * promoDiscount) / 100
  const tax = (subtotal - discount) * 0.05 // 5% VAT
  const total = subtotal + deliveryFee - discount + tax

  const applyPromoCode = () => {
    const validCodes = {
      WELCOME10: 10,
      SUMMER20: 20,
      FAMILY15: 15,
    }

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setPromoDiscount(validCodes[promoCode as keyof typeof validCodes])
    } else {
      alert("كود الخصم غير صحيح")
    }
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const suggestedProducts = [
    {
      id: 101,
      name: "عبوة مياه طبيعية 500 مل",
      price: 0.15,
      originalPrice: 0.2,
      image: "/placeholder.svg?height=200&width=200&text=500ml+Bottle",
      rating: 4.9,
      reviews: 2156,
      badge: "الأكثر مبيعاً",
    },
    {
      id: 102,
      name: "حزمة مياه طبيعية 12 × 330 مل",
      price: 1.4,
      originalPrice: 1.8,
      image: "/placeholder.svg?height=200&width=200&text=12x330ml+Pack",
      rating: 4.6,
      reviews: 789,
      badge: "توفير",
    },
    {
      id: 103,
      name: "عبوة مياه طبيعية 1.5 لتر",
      price: 0.35,
      originalPrice: 0.45,
      image: "/placeholder.svg?height=200&width=200&text=1.5L+Bottle",
      rating: 4.8,
      reviews: 1432,
      badge: "عائلي",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link
              href="/"
              className="flex items-center space-x-3 space-x-reverse md:space-x-4 hover:opacity-80 transition-opacity"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              <span className="text-base md:text-lg font-medium text-gray-700">العودة للمتجر</span>
            </Link>

            <div className="flex items-center space-x-3 space-x-reverse md:space-x-4">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                <Droplets className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  مياه عمان الفاخرة
                </h1>
                <p className="text-xs md:text-sm text-gray-600">سلة التسوق</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {items.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">سلة التسوق فارغة</h2>
            <p className="text-xl text-gray-600 mb-8">ابدأ بإضافة بعض المنتجات الرائعة إلى سلتك</p>
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
              >
                تصفح المنتجات
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  سلة التسوق ({items.reduce((sum, item) => sum + item.quantity, 0)} منتج)
                </h2>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4 ml-2" />
                  إفراغ السلة
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="shadow-lg border-0 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={150}
                            height={150}
                            className="rounded-lg shadow-sm object-cover w-full md:w-[150px] h-[150px]"
                          />
                          <Button
                            size="sm"
                            variant="secondary"
                            className="absolute top-2 left-2 h-8 w-8 rounded-full p-0 bg-white/90 hover:bg-white shadow-lg"
                            onClick={() => toggleFavorite(item.id)}
                          >
                            <Heart
                              className={`w-4 h-4 ${favorites.includes(item.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                            />
                          </Button>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {item.nameEn} • {item.size} • {item.category}
                              </p>
                              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {item.rating} ({item.reviews} تقييم)
                                </span>
                              </div>
                              {item.badge && (
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center space-x-4 space-x-reverse">
                              <div className="flex items-center space-x-2 space-x-reverse bg-gray-50 rounded-lg p-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="h-8 w-8 p-0 hover:bg-gray-200"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0 hover:bg-gray-200"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>السعر للوحدة: {item.price.toFixed(3)} ر.ع</p>
                                {item.originalPrice && (
                                  <p className="line-through text-gray-400">
                                    كان: {item.originalPrice.toFixed(3)} ر.ع
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {(item.price * item.quantity).toFixed(3)} ر.ع
                              </p>
                              <p className="text-sm text-gray-600">المجموع الفرعي</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-xl border-0 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center text-xl">
                    <ShoppingCart className="w-6 h-6 ml-3 text-blue-600" />
                    ملخص الطلب
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Promo Code */}
                  <div className="space-y-3">
                    <Label htmlFor="promoCode" className="flex items-center text-sm">
                      <Gift className="w-4 h-4 ml-2 text-orange-500" />
                      كود الخصم
                    </Label>
                    <div className="flex space-x-2 space-x-reverse">
                      <Input
                        id="promoCode"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="أدخل كود الخصم"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={applyPromoCode}
                        className="px-4 bg-transparent"
                      >
                        تطبيق
                      </Button>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex items-center space-x-2 space-x-reverse text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>تم تطبيق خصم {promoDiscount}%</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span>المجموع الفرعي:</span>
                      <span>{subtotal.toFixed(3)} ر.ع</span>
                    </div>

                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center">
                          <Percent className="w-4 h-4 ml-1" />
                          الخصم ({promoDiscount}%):
                        </span>
                        <span>-{discount.toFixed(3)} ر.ع</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <Truck className="w-4 h-4 ml-1" />
                        رسوم التوصيل:
                      </span>
                      <span>{deliveryFee === 0 ? "مجاني" : `${deliveryFee.toFixed(3)} ر.ع`}</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>ضريبة القيمة المضافة (5%):</span>
                      <span>{tax.toFixed(3)} ر.ع</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-2xl font-bold">
                      <span>المجموع الكلي:</span>
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {total.toFixed(3)} ر.ع
                      </span>
                    </div>

                    {subtotal < 5 && (
                      <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                        أضف {(5 - subtotal).toFixed(3)} ر.ع للحصول على توصيل مجاني
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 rounded-xl shadow-lg text-lg"
                      size="lg"
                    >
                      <CheckCircle className="w-5 h-5 ml-2" />
                      إتمام الطلب
                    </Button>
                  </Link>

                  {/* Security Info */}
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>دفع آمن ومشفر</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>ضمان استرداد 100%</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>توصيل مجاني للطلبات أكثر من 5 ر.ع</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Suggested Products */}
        {items.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">منتجات قد تعجبك</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        {product.badge}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center space-x-2 space-x-reverse mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-xl font-bold text-blue-600">{product.price.toFixed(3)} ر.ع</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice.toFixed(3)} ر.ع
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      >
                        <Plus className="w-4 h-4 ml-1" />
                        إضافة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
