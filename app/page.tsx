"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Plus,
  Star,
  Truck,
  Shield,
  Award,
  Search,
  Filter,
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Droplets,
  Leaf,
  Zap,
} from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { CartSidebar } from "@/components/cart/cart-sidebar"

interface Product {
  id: number
  name: string
  nameEn: string
  price: number
  originalPrice?: number
  image: string
  description: string
  detailedDescription: string
  rating: number
  reviews: number
  badge?: string
  size: string
  category: string
  inStock: number
  features: string[]
  nutritionFacts?: {
    ph: string
    minerals: string
    sodium: string
    calcium: string
  }
}

const products: Product[] = [
  {
    id: 1,
    name: "مياه الشرب الطبيعية الفاخرة",
    nameEn: "Premium Natural Drinking Water",
    price: 0.15,
    originalPrice: 0.2,
    image: "/placeholder.svg?height=400&width=400",
    description: "مياه طبيعية نقية 100% من أجود المصادر العمانية الجبلية",
    detailedDescription:
      "مياه طبيعية فاخرة مستخرجة من أعماق الجبال العمانية، تمر بعمليات تنقية طبيعية لمدة تزيد عن 50 عاماً تحت الأرض. غنية بالمعادن الطبيعية المفيدة للجسم ومعتمدة من وزارة الصحة العمانية.",
    rating: 4.9,
    reviews: 1247,
    badge: "الأكثر مبيعاً",
    size: "500 مل",
    category: "طبيعية",
    inStock: 500,
    features: ["100% طبيعية", "خالية من الكلور", "غنية بالمعادن", "معتمدة صحياً"],
    nutritionFacts: {
      ph: "7.2",
      minerals: "150 mg/L",
      sodium: "< 5 mg/L",
      calcium: "45 mg/L",
    },
  },
  {
    id: 2,
    name: "مياه معدنية إمبريال",
    nameEn: "Imperial Mineral Water",
    price: 0.35,
    originalPrice: 0.45,
    image: "/placeholder.svg?height=400&width=400",
    description: "مياه معدنية فاخرة غنية بالمعادن الطبيعية النادرة",
    detailedDescription:
      "مياه معدنية فاخرة من مصادر طبيعية نادرة، معبأة في زجاجات فاخرة. تحتوي على تركيبة متوازنة من المعادن الأساسية التي يحتاجها الجسم يومياً. مثالية للمناسبات الخاصة والضيافة الراقية.",
    rating: 4.8,
    reviews: 892,
    badge: "فاخر",
    size: "750 مل",
    category: "معدنية",
    inStock: 200,
    features: ["زجاجة فاخرة", "معادن نادرة", "تصميم أنيق", "مناسبة للهدايا"],
    nutritionFacts: {
      ph: "7.4",
      minerals: "320 mg/L",
      sodium: "12 mg/L",
      calcium: "78 mg/L",
    },
  },
  {
    id: 3,
    name: "مياه قلوية صحية بلس",
    nameEn: "Alkaline Health Water Plus",
    price: 0.48,
    image: "/placeholder.svg?height=400&width=400",
    description: "مياه قلوية متوازنة الحموضة مع إضافات صحية طبيعية",
    detailedDescription:
      "مياه قلوية متطورة بتقنية التأيين الطبيعي، مدعمة بالإلكتروليت والمعادن الأساسية. تساعد في توازن حموضة الجسم وتعزز الهضم والطاقة الطبيعية. مثالية للرياضيين وأسلوب الحياة الصحي.",
    rating: 4.7,
    reviews: 654,
    badge: "صحي",
    size: "1 لتر",
    category: "قلوية",
    inStock: 300,
    features: ["pH متوازن", "إلكتروليت طبيعي", "مضادات أكسدة", "طاقة طبيعية"],
    nutritionFacts: {
      ph: "8.5",
      minerals: "180 mg/L",
      sodium: "8 mg/L",
      calcium: "52 mg/L",
    },
  },
  {
    id: 4,
    name: "مياه الأطفال الآمنة بيبي بيور",
    nameEn: "Baby Pure Safe Water",
    price: 0.28,
    image: "/placeholder.svg?height=400&width=400",
    description: "مياه مخصصة للأطفال والرضع مع تعقيم متقدم",
    detailedDescription:
      "مياه مصممة خصيصاً للأطفال والرضع، تمر بعمليات تعقيم وتنقية متقدمة وفقاً لأعلى المعايير الدولية. خالية تماماً من البكتيريا والملوثات، مع تركيبة معدنية مناسبة للأطفال.",
    rating: 4.9,
    reviews: 1156,
    badge: "موصى به طبياً",
    size: "330 مل",
    category: "أطفال",
    inStock: 400,
    features: ["آمنة للرضع", "تعقيم متقدم", "تصميم آمن", "معتمدة من أطباء الأطفال"],
    nutritionFacts: {
      ph: "7.0",
      minerals: "50 mg/L",
      sodium: "< 2 mg/L",
      calcium: "15 mg/L",
    },
  },
  {
    id: 5,
    name: "مياه رياضية إنرجي بوست",
    nameEn: "Energy Boost Sports Water",
    price: 0.42,
    image: "/placeholder.svg?height=400&width=400",
    description: "مياه رياضية مدعمة بالإلكتروليت والفيتامينات",
    detailedDescription:
      "مياه رياضية متطورة مدعمة بالإلكتروليت الطبيعي وفيتامينات B المركبة. مصممة خصيصاً للرياضيين والأشخاص النشطين لتعويض السوائل والأملاح المفقودة أثناء التمرين.",
    rating: 4.6,
    reviews: 743,
    badge: "رياضي",
    size: "600 مل",
    category: "رياضية",
    inStock: 250,
    features: ["إلكتروليت متوازن", "فيتامينات B", "طاقة فورية", "استرداد سريع"],
    nutritionFacts: {
      ph: "7.1",
      minerals: "220 mg/L",
      sodium: "25 mg/L",
      calcium: "35 mg/L",
    },
  },
  {
    id: 6,
    name: "مياه فوارة طبيعية سبارك",
    nameEn: "Natural Sparkling Water Spark",
    price: 0.38,
    image: "/placeholder.svg?height=400&width=400",
    description: "مياه فوارة طبيعية منعشة مع نكهات طبيعية",
    detailedDescription:
      "مياه فوارة طبيعية بفقاعات طبيعية من مصادر جبلية، متوفرة بنكهات طبيعية متنوعة. مثالية للمناسبات والوجبات، تضفي لمسة من الأناقة والانتعاش.",
    rating: 4.5,
    reviews: 567,
    badge: "منعش",
    size: "500 مل",
    category: "فوارة",
    inStock: 180,
    features: ["فقاعات طبيعية", "نكهات طبيعية", "منعشة", "خالية من السكر"],
    nutritionFacts: {
      ph: "6.8",
      minerals: "280 mg/L",
      sodium: "15 mg/L",
      calcium: "65 mg/L",
    },
  },
]

const categories = ["الكل", "طبيعية", "معدنية", "قلوية", "أطفال", "رياضية", "فوارة"]

export default function ProfessionalWaterStore() {
  const { addItem, toggleCart, getTotalItems, isOpen } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge,
      size: product.size,
      category: product.category,
    })
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "الكل" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50" dir="rtl">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-4 h-4" />
                <span>+968 2444 5555</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-4 h-4" />
                <span>info@omanwaters.om</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString("ar-OM")}</span>
              </div>
              <span>توصيل مجاني للطلبات أكثر من 5 ر.ع</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-3 space-x-reverse md:space-x-4">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <Droplets className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    مياه عمان الفاخرة
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600 font-medium hidden sm:block">Oman Premium Waters</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse md:space-x-6">
              {/* Mobile Search Toggle */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="w-5 h-5" />
              </Button>

              {/* Desktop Search */}
              <div className="relative hidden md:block">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="ابحث عن المنتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-64 border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleCart}
                className="relative border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 px-2 md:px-4 bg-transparent"
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
                <span className="hidden sm:inline">السلة</span>
                <span className="sm:hidden">({getTotalItems()})</span>
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 md:h-6 md:w-6 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-orange-500 to-red-500">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="ابحث عن المنتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 text-white py-12 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-16 h-16 md:w-32 md:h-32 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-12 h-12 md:w-24 md:h-24 bg-cyan-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 md:w-40 md:h-40 bg-blue-300 rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            أنقى مياه في
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              سلطنة عمان
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed px-4">
            من أعماق الجبال العمانية إلى منزلك، نقدم لك أجود أنواع المياه الطبيعية المعتمدة من وزارة الصحة والمطابقة
            للمعايير الدولية
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
            <div className="flex flex-col items-center p-3 md:p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <Shield className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 text-cyan-300" />
              <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">معتمد رسمياً</h3>
              <p className="text-xs md:text-sm opacity-80 text-center">من وزارة الصحة العمانية</p>
            </div>
            <div className="flex flex-col items-center p-3 md:p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <Truck className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 text-cyan-300" />
              <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">توصيل سريع</h3>
              <p className="text-xs md:text-sm opacity-80 text-center">خلال 24 ساعة مجاناً</p>
            </div>
            <div className="flex flex-col items-center p-3 md:p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <Award className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 text-cyan-300" />
              <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">جودة مضمونة</h3>
              <p className="text-xs md:text-sm opacity-80 text-center">ضمان استرداد 100%</p>
            </div>
            <div className="flex flex-col items-center p-3 md:p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <Users className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 text-cyan-300" />
              <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">+50,000 عميل</h3>
              <p className="text-xs md:text-sm opacity-80 text-center">يثقون بجودتنا</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg w-full sm:w-auto"
            >
              تسوق الآن
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl bg-transparent w-full sm:w-auto"
            >
              اعرف المزيد
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full mb-4 border-2 border-blue-200"
            >
              <Filter className="w-4 h-4 ml-2" />
              تصفية المنتجات
            </Button>
          </div>

          {/* Filters Sidebar */}
          <div className={`w-full lg:w-80 space-y-6 ${isFiltersOpen ? "block" : "hidden lg:block"}`}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <Filter className="w-5 h-5 ml-2" />
                  تصفية المنتجات
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">الفئات</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "ghost"}
                          className={`w-full justify-start text-sm ${
                            selectedCategory === category
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                              : "hover:bg-blue-50"
                          }`}
                          onClick={() => {
                            setSelectedCategory(category)
                            setIsFiltersOpen(false) // Close filters on mobile after selection
                          }}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Sidebar */}
            <CartSidebar />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">منتجاتنا المميزة</h3>
              <p className="text-gray-600 text-sm md:text-base">{filteredProducts.length} منتج متاح</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 flex space-x-2 space-x-reverse">
                      {product.badge && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-2 md:px-3 py-1 text-xs">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 md:top-4 left-2 md:left-4 flex space-x-2 space-x-reverse">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full p-0 bg-white/90 hover:bg-white shadow-lg"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart
                          className={`w-3 h-3 md:w-4 md:h-4 ${favorites.includes(product.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                        />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                        متوفر: {product.inStock}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-xs md:text-sm text-gray-600 font-medium">
                          {product.nameEn} • {product.size}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 md:w-4 md:h-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs md:text-sm text-gray-600 font-medium">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 p-4 md:p-6">
                    <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {product.price.toFixed(3)} ر.ع
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs md:text-sm text-gray-500 line-through">
                            {product.originalPrice.toFixed(3)} ر.ع
                          </span>
                        )}
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-4 md:px-6 py-2 rounded-lg shadow-lg w-full sm:w-auto"
                        size="sm"
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
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار مياه عمان؟</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نحن نقدم أكثر من مجرد مياه، نقدم تجربة صحية متكاملة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">100% طبيعية</h4>
              <p className="text-gray-600">مياه طبيعية نقية من أعماق الجبال العمانية، بدون أي إضافات كيميائية</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">معتمدة رسمياً</h4>
              <p className="text-gray-600">حاصلة على جميع الشهادات والتراخيص من وزارة الصحة العمانية</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">تقنية متقدمة</h4>
              <p className="text-gray-600">نستخدم أحدث تقنيات التنقية والتعبئة للحفاظ على جودة المياه</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">مياه عمان الفاخرة</h3>
                  <p className="text-sm text-gray-300">Oman Premium Waters</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                رائدون في تقديم أجود أنواع المياه الطبيعية في سلطنة عمان منذ عام 2010
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <span className="text-sm">📘</span>
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-300 transition-colors">
                  <span className="text-sm">🐦</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-500 transition-colors">
                  <span className="text-sm">📷</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">خدماتنا</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-white cursor-pointer transition-colors">توصيل مجاني</li>
                <li className="hover:text-white cursor-pointer transition-colors">ضمان الجودة</li>
                <li className="hover:text-white cursor-pointer transition-colors">خدمة العملاء 24/7</li>
                <li className="hover:text-white cursor-pointer transition-colors">استشارات غذائية</li>
                <li className="hover:text-white cursor-pointer transition-colors">برامج الولاء</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">معلومات مهمة</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-white cursor-pointer transition-colors">عن الشركة</li>
                <li className="hover:text-white cursor-pointer transition-colors">سياسة الإرجاع</li>
                <li className="hover:text-white cursor-pointer transition-colors">الشروط والأحكام</li>
                <li className="hover:text-white cursor-pointer transition-colors">سياسة الخصوصية</li>
                <li className="hover:text-white cursor-pointer transition-colors">الأسئلة الشائعة</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">تواصل معنا</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span>+968 2444 5555</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span>info@omanwaters.om</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>الخوير، مسقط، سلطنة عمان</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span>السبت - الخميس: 8:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 مياه عمان الفاخرة. جميع الحقوق محفوظة.</p>
              <div className="flex items-center space-x-6 space-x-reverse text-gray-400">
                <span>مدعوم بتقنية</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded"></div>
                  <span className="font-semibold">OmanTech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
