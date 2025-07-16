"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
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
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { CartButton } from "@/components/cart/cart-button"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"

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

// Update the products array with the new comprehensive product list
const products: Product[] = [
  // 200ml Products
  {
    id: 1,
    name: "عرض خاص ° 20 كرتون مياة واحصل على براد هدية",
    nameEn: "Natural Water 200ml",
    price: 20.00,
    originalPrice: 26.00,
    image: "https://i.ibb.co/gLjTPcx3/20.png",
    description:    "عرض خاص ° 20 كرتون مياة واحصل على براد هدية",

    detailedDescription:
      "عبوة مياه طبيعية نقية بحجم 200 مل، مثالية للأطفال والاستخدام اليومي. معبأة بأحدث التقنيات للحفاظ على النقاء والطعم الطبيعي.",
    rating: 4.8,
    reviews: 856,
    badge: "عرض خاص ",
    size: "200 مل",
    category: "عبوات صغيرة",
    inStock: 1000,
    features: ["حجم مناسب للأطفال", "سهل الحمل", "طبيعية 100%", "معتمدة صحياً"],
    nutritionFacts: { ph: "7.2", minerals: "120 mg/L", sodium: "< 3 mg/L", calcium: "35 mg/L" },
  },
  {
    id: 1,
    name: "عبوة مياه طبيعية 200 مل",
    nameEn: "Natural Water 200ml",
    price: 0.08,
    originalPrice: 0.1,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "عبوة صغيرة مثالية للأطفال والرحلات القصيرة",
    detailedDescription:
      "عبوة مياه طبيعية نقية بحجم 200 مل، مثالية للأطفال والاستخدام اليومي. معبأة بأحدث التقنيات للحفاظ على النقاء والطعم الطبيعي.",
    rating: 4.8,
    reviews: 856,
    badge: "مناسب للأطفال",
    size: "200 مل",
    category: "عبوات صغيرة",
    inStock: 1000,
    features: ["حجم مناسب للأطفال", "سهل الحمل", "طبيعية 100%", "معتمدة صحياً"],
    nutritionFacts: { ph: "7.2", minerals: "120 mg/L", sodium: "< 3 mg/L", calcium: "35 mg/L" },
  },
  {
    id: 2,
    name: "حزمة مياه طبيعية 30 × 200 مل",
    nameEn: "Natural Water Pack 30 × 200ml",
    price: 2.2,
    originalPrice: 2.8,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "حزمة اقتصادية تحتوي على 30 عبوة 200 مل",
    detailedDescription:
      "حزمة اقتصادية مثالية للعائلات والمكاتب، تحتوي على 30 عبوة من المياه الطبيعية النقية بحجم 200 مل لكل عبوة.",
    rating: 4.9,
    reviews: 432,
    badge: "اقتصادي",
    size: "30 × 200 مل",
    category: "حزم",
    inStock: 150,
    features: ["توفير اقتصادي", "مناسب للعائلات", "سهل التخزين", "جودة مضمونة"],
    nutritionFacts: { ph: "7.2", minerals: "120 mg/L", sodium: "< 3 mg/L", calcium: "35 mg/L" },
  },

  // 330ml Products
  {
    id: 3,
    name: "عبوة مياه طبيعية 330 مل",
    nameEn: "Natural Water 330ml",
    price: 0.12,
    originalPrice: 0.15,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "الحجم المثالي للاستخدام اليومي والوجبات",
    detailedDescription:
      "عبوة مياه طبيعية بحجم 330 مل، الحجم المثالي لمرافقة الوجبات والاستخدام اليومي في المكتب أو المدرسة.",
    rating: 4.7,
    reviews: 1243,
    badge: "الأكثر شعبية",
    size: "330 مل",
    category: "عبوات متوسطة",
    inStock: 800,
    features: ["حجم مثالي", "مناسب للوجبات", "تصميم عملي", "قابل للإعادة التدوير"],
    nutritionFacts: { ph: "7.2", minerals: "120 mg/L", sodium: "< 3 mg/L", calcium: "35 mg/L" },
  },
  {
    id: 4,
    name: "كرتون مياه طبيعية 24 × 330 مل",
    nameEn: "Natural Water Carton 24 × 330ml",
    price: 2.8,
    originalPrice: 3.5,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "كرتون كامل يحتوي على 24 عبوة 330 مل",
    detailedDescription:
      "كرتون كامل يحتوي على 24 عبوة من المياه الطبيعية بحجم 330 مل، مثالي للمكاتب والمناسبات والاستخدام المنزلي.",
    rating: 4.8,
    reviews: 567,
    badge: "توفير كبير",
    size: "24 × 330 مل",
    category: "كراتين",
    inStock: 200,
    features: ["توفير ممتاز", "مناسب للمكاتب", "تغليف محكم", "سهل النقل"],
    nutritionFacts: { ph: "7.2", minerals: "120 mg/L", sodium: "< 3 mg/L", calcium: "35 mg/L" },
  },
  {
    id: 5,
    name: "حزمة مياه طبيعية 12 × 330 مل",
    nameEn: "Natural Water Pack 12 × 330ml",
    price: 1.4,
    originalPrice: 1.8,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "حزمة متوسطة تحتوي على 12 عبوة 330 مل",
    detailedDescription:
      "حزمة متوسطة الحجم تحتوي على 12 عبوة من المياه الطبيعية بحجم 330 مل، مناسبة للعائلات الصغيرة والاستخدام الأسبوعي.",
    rating: 4.6,
    reviews: 789,
    size: "12 × 330 مل",
    category: "حزم",
    inStock: 300,
    features: ["حجم مناسب", "سعر معقول", "جودة عالية", "تغليف آمن"],
    nutritionFacts: { ph: "7.2", minerals: "120 mg/L", sodium: "< 3 mg/L", calcium: "35 mg/L" },
  },

  // 500ml Products
  {
    id: 6,
    name: "عبوة مياه طبيعية 500 مل",
    nameEn: "Natural Water 500ml",
    price: 0.15,
    originalPrice: 0.2,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "الحجم الكلاسيكي المناسب لجميع الأوقات",
    detailedDescription:
      "عبوة مياه طبيعية بحجم 500 مل، الحجم الكلاسيكي والأكثر شعبية، مناسب للرياضة والعمل والاستخدام اليومي.",
    rating: 4.9,
    reviews: 2156,
    badge: "الأكثر مبيعاً",
    size: "500 مل",
    category: "عبوات متوسطة",
    inStock: 1200,
    features: ["الحجم الأمثل", "مناسب للرياضة", "سهل الإمساك", "جودة ممتازة"],
    nutritionFacts: { ph: "7.2", minerals: "150 mg/L", sodium: "< 5 mg/L", calcium: "45 mg/L" },
  },
  {
    id: 7,
    name: "كرتون مياه طبيعية 24 × 500 مل",
    nameEn: "Natural Water Carton 24 × 500ml",
    price: 3.5,
    originalPrice: 4.2,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "كرتون كامل يحتوي على 24 عبوة 500 مل",
    detailedDescription:
      "كرتون كامل يحتوي على 24 عبوة من المياه الطبيعية بحجم 500 مل، الخيار الأمثل للمكاتب والمناسبات الكبيرة.",
    rating: 4.8,
    reviews: 892,
    badge: "خيار المكاتب",
    size: "24 × 500 مل",
    category: "كراتين",
    inStock: 180,
    features: ["كمية كبيرة", "سعر تنافسي", "تغليف قوي", "مناسب للمناسبات"],
    nutritionFacts: { ph: "7.2", minerals: "150 mg/L", sodium: "< 5 mg/L", calcium: "45 mg/L" },
  },
  {
    id: 8,
    name: "حزمة مياه طبيعية 12 × 500 مل",
    nameEn: "Natural Water Pack 12 × 500ml",
    price: 1.8,
    originalPrice: 2.2,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "حزمة عملية تحتوي على 12 عبوة 500 مل",
    detailedDescription:
      "حزمة عملية تحتوي على 12 عبوة من المياه الطبيعية بحجم 500 مل، مثالية للاستخدام المنزلي والرحلات القصيرة.",
    rating: 4.7,
    reviews: 654,
    size: "12 × 500 مل",
    category: "حزم",
    inStock: 250,
    features: ["حجم عملي", "سهل الحمل", "توفير جيد", "جودة مضمونة"],
    nutritionFacts: { ph: "7.2", minerals: "150 mg/L", sodium: "< 5 mg/L", calcium: "45 mg/L" },
  },

  // 1.5L Products
  {
    id: 9,
    name: "عبوة مياه طبيعية 1.5 لتر",
    nameEn: "Natural Water 1.5L",
    price: 0.35,
    originalPrice: 0.45,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "عبوة كبيرة مثالية للعائلات والاستخدام المنزلي",
    detailedDescription:
      "عبوة مياه طبيعية بحجم 1.5 لتر، مثالية للاستخدام المنزلي والعائلي، توفر كمية كافية لعدة أشخاص.",
    rating: 4.8,
    reviews: 1432,
    badge: "عائلي",
    size: "1.5 لتر",
    category: "عبوات كبيرة",
    inStock: 400,
    features: ["حجم عائلي", "توفير اقتصادي", "سهل الصب", "تصميم عملي"],
    nutritionFacts: { ph: "7.2", minerals: "150 mg/L", sodium: "< 5 mg/L", calcium: "45 mg/L" },
  },
  {
    id: 10,
    name: "كرتون مياه طبيعية 12 × 1.5 لتر",
    nameEn: "Natural Water Carton 12 × 1.5L",
    price: 4.0,
    originalPrice: 5.0,
    image: "https://omanoasis.com/wp-content/uploads/2025/01/30-Anniversary-product-line-up_2-Liter.png",
    description: "كرتون يحتوي على 12 عبوة 1.5 لتر",
    detailedDescription:
      "كرتون يحتوي على 12 عبوة من المياه الطبيعية بحجم 1.5 لتر لكل عبوة، مثالي للعائلات الكبيرة والاستخدام الشهري.",
    rating: 4.9,
    reviews: 567,
    badge: "توفير عائلي",
    size: "12 × 1.5 لتر",
    category: "كراتين",
    inStock: 120,
    features: ["توفير كبير", "مناسب للعائلات", "جودة عالية", "تغليف محكم"],
    nutritionFacts: { ph: "7.2", minerals: "150 mg/L", sodium: "< 5 mg/L", calcium: "45 mg/L" },
  },
]

// Update categories to include new ones
const categories = [
  "الكل",
  "عبوات صغيرة",
  "عبوات متوسطة",
  "عبوات كبيرة",
  "حزم",
  "كراتين",
  "جالونات",
  "مياه صفر",
  "قلوية",
  "معدات",
]
const visitorId = `zain-app-${Math.random().toString(36).substring(2, 15)}`;

export default function ProfessionalWaterStore() {
  const { addItem } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const getLocationAndLog = useCallback(async () => {
    if (!visitorId) return;

    // This API key is public and might be rate-limited or disabled.
    // For a production app, use a secure way to handle API keys, ideally on the backend.
    const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb" 
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        country: country,
        action: "page_load",
        currentPage: "الرئيسية ",
      })
      localStorage.setItem("country", country) // Consider privacy implications
      setupOnlineStatus(visitorId)
    } catch (error) {
      console.error("Error fetching location:", error)
      // Log error with visitor ID for debugging
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        error: `Location fetch failed: ${error instanceof Error ? error.message : String(error)}`,
        action: "location_error"
      });
    }
  }, [visitorId]);

  useEffect(() => {
    if (visitorId) {
      getLocationAndLog();
    }
  }, [visitorId, getLocationAndLog]);
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
         
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="hidden sm:flex items-center space-x-2 space-x-reverse">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString("ar-OM")}</span>
              </div>
              <span className="text-xs sm:text-sm">توصيل مجاني للطلبات أكثر من 5 ر.ع</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-3 space-x-reverse md:space-x-4">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <Droplets className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                <img src="https://omanoasis.com/wp-content/uploads/2024/11/Asset-2.png" alt="" width={65}/>
                  <p className="text-xs md:text-sm text-gray-600 font-medium hidden sm:block">Oman Premium Waters</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse md:space-x-6">
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

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

              <CartButton />
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Phone className="w-4 h-4 ml-2" />
                  اتصل بنا
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Mail className="w-4 h-4 ml-2" />
                  راسلنا
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MapPin className="w-4 h-4 ml-2" />
                  مواقعنا
                </Button>
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
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-48 md:h-64 object-contain group-hover:scale-105 transition-transform duration-300"
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
