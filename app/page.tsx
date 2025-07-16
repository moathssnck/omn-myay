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
  weight: string
  category: string
  inStock: number
  features: string[]
  nutritionFacts?: {
    protein: string
    fat: string
    calories: string
    cholesterol: string
  }
}

// Comprehensive meat products list
const products: Product[] = [
  // Beef Products
  {
    id: 1,
    name: "عرض خاص - لحم بقري مفروم 5 كيلو + هدية مجانية",
    nameEn: "Special Offer - Ground Beef 5kg + Free Gift",
    price: 45.0,
    originalPrice: 55.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "عرض خاص - لحم بقري مفروم طازج 5 كيلو مع هدية مجانية",
    detailedDescription:
      "لحم بقري مفروم طازج عالي الجودة، مثالي لتحضير الكفتة والبرغر والأطباق المختلفة. معبأ بأحدث التقنيات للحفاظ على النضارة والطعم الأصيل.",
    rating: 4.8,
    reviews: 856,
    badge: "عرض خاص",
    weight: "5 كيلو",
    category: "لحم بقري",
    inStock: 50,
    features: ["طازج يومياً", "خالي من الهرمونات", "معتمد صحياً", "تغليف محكم"],
    nutritionFacts: { protein: "26g", fat: "15g", calories: "250", cholesterol: "78mg" },
  },
  {
    id: 2,
    name: "لحم بقري مفروم طازج 500 جرام",
    nameEn: "Fresh Ground Beef 500g",
    price: 6.5,
    originalPrice: 7.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "لحم بقري مفروم طازج عالي الجودة",
    detailedDescription: "لحم بقري مفروم طازج من أجود أنواع اللحوم، مثالي لتحضير الوجبات اليومية والأطباق الشعبية.",
    rating: 4.9,
    reviews: 1243,
    badge: "الأكثر شعبية",
    weight: "500 جرام",
    category: "لحم بقري",
    inStock: 200,
    features: ["طازج يومياً", "جودة ممتازة", "خالي من المواد الحافظة", "سعر مناسب"],
    nutritionFacts: { protein: "26g", fat: "15g", calories: "250", cholesterol: "78mg" },
  },
  {
    id: 3,
    name: "ستيك لحم بقري 300 جرام",
    nameEn: "Beef Steak 300g",
    price: 12.0,
    originalPrice: 14.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "قطع ستيك لحم بقري طرية ولذيذة",
    detailedDescription:
      "قطع ستيك لحم بقري من أفضل الأجزاء، مقطعة بسماكة مثالية للشوي والقلي، طرية ومليئة بالنكهة الأصيلة.",
    rating: 4.8,
    reviews: 567,
    badge: "فاخر",
    weight: "300 جرام",
    category: "لحم بقري",
    inStock: 80,
    features: ["قطع مختارة", "طرية جداً", "مثالية للشوي", "نكهة غنية"],
    nutritionFacts: { protein: "28g", fat: "12g", calories: "220", cholesterol: "85mg" },
  },
  {
    id: 4,
    name: "لحم بقري مقطع مكعبات كيلو",
    nameEn: "Beef Cubes 1kg",
    price: 18.0,
    originalPrice: 20.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "لحم بقري مقطع مكعبات مثالي للطبخ",
    detailedDescription: "لحم بقري طازج مقطع مكعبات متساوية، مثالي لتحضير اليخنات والكاري والأطباق المطبوخة.",
    rating: 4.7,
    reviews: 432,
    weight: "1 كيلو",
    category: "لحم بقري",
    inStock: 120,
    features: ["مقطع بانتظام", "سهل الطبخ", "طري ولذيذ", "متعدد الاستخدامات"],
    nutritionFacts: { protein: "25g", fat: "18g", calories: "280", cholesterol: "82mg" },
  },

  // Chicken Products
  {
    id: 5,
    name: "دجاج كامل طازج 1.5 كيلو",
    nameEn: "Whole Fresh Chicken 1.5kg",
    price: 8.5,
    originalPrice: 9.5,
    image: "/placeholder.svg?height=300&width=300",
    description: "دجاج كامل طازج عالي الجودة",
    detailedDescription: "دجاج كامل طازج من المزارع المحلية، مربى بطريقة طبيعية وصحية، مثالي للشوي والحشو والطبخ.",
    rating: 4.9,
    reviews: 1156,
    badge: "طازج يومياً",
    weight: "1.5 كيلو",
    category: "دجاج",
    inStock: 150,
    features: ["طازج يومياً", "مربى طبيعياً", "خالي من الهرمونات", "جودة ممتازة"],
    nutritionFacts: { protein: "31g", fat: "3.6g", calories: "165", cholesterol: "85mg" },
  },
  {
    id: 6,
    name: "صدور دجاج منزوعة العظم 500 جرام",
    nameEn: "Boneless Chicken Breast 500g",
    price: 7.0,
    originalPrice: 8.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "صدور دجاج طازجة منزوعة العظم",
    detailedDescription:
      "صدور دجاج طازجة منزوعة العظم والجلد، قليلة الدهون وغنية بالبروتين، مثالية للحمية الصحية والرياضيين.",
    rating: 4.8,
    reviews: 892,
    badge: "صحي",
    weight: "500 جرام",
    category: "دجاج",
    inStock: 180,
    features: ["قليل الدهون", "غني بالبروتين", "سهل التحضير", "مناسب للحمية"],
    nutritionFacts: { protein: "31g", fat: "3.6g", calories: "165", cholesterol: "85mg" },
  },
  {
    id: 7,
    name: "أفخاذ دجاج طازجة كيلو",
    nameEn: "Fresh Chicken Thighs 1kg",
    price: 6.0,
    originalPrice: 7.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "أفخاذ دجاج طازجة طرية ولذيذة",
    detailedDescription: "أفخاذ دجاج طازجة مع العظم، طرية ومليئة بالنكهة، مثالية للشوي والطبخ والتتبيل.",
    rating: 4.7,
    reviews: 654,
    weight: "1 كيلو",
    category: "دجاج",
    inStock: 200,
    features: ["طري ولذيذ", "نكهة غنية", "مثالي للشوي", "سعر اقتصادي"],
    nutritionFacts: { protein: "26g", fat: "15g", calories: "250", cholesterol: "95mg" },
  },
  {
    id: 8,
    name: "أجنحة دجاج طازجة 750 جرام",
    nameEn: "Fresh Chicken Wings 750g",
    price: 5.5,
    originalPrice: 6.5,
    image: "/placeholder.svg?height=300&width=300",
    description: "أجنحة دجاج طازجة مثالية للشوي",
    detailedDescription: "أجنحة دجاج طازجة من الحجم المتوسط، مثالية للشوي والقلي والتتبيل بالنكهات المختلفة.",
    rating: 4.6,
    reviews: 789,
    weight: "750 جرام",
    category: "دجاج",
    inStock: 120,
    features: ["حجم مثالي", "سهل التتبيل", "مناسب للحفلات", "طعم رائع"],
    nutritionFacts: { protein: "30g", fat: "20g", calories: "290", cholesterol: "84mg" },
  },

  // Lamb Products
  {
    id: 9,
    name: "لحم خروف مقطع للكباب كيلو",
    nameEn: "Lamb Kebab Cuts 1kg",
    price: 25.0,
    originalPrice: 28.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "لحم خروف طازج مقطع خصيصاً للكباب",
    detailedDescription:
      "لحم خروف طازج من أجود الأجزاء، مقطع بالحجم المثالي لتحضير الكباب والمشاوي، طري ومليء بالنكهة الأصيلة.",
    rating: 4.9,
    reviews: 432,
    badge: "فاخر",
    weight: "1 كيلو",
    category: "لحم خروف",
    inStock: 60,
    features: ["قطع مختارة", "مثالي للكباب", "طري جداً", "نكهة أصيلة"],
    nutritionFacts: { protein: "25g", fat: "21g", calories: "294", cholesterol: "97mg" },
  },
  {
    id: 10,
    name: "ضلوع خروف طازجة 800 جرام",
    nameEn: "Fresh Lamb Ribs 800g",
    price: 22.0,
    originalPrice: 25.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "ضلوع خروف طازجة للشوي والطبخ",
    detailedDescription: "ضلوع خروف طازجة من الحجم المثالي، مناسبة للشوي والطبخ البطيء، تعطي نكهة غنية ولذيذة.",
    rating: 4.8,
    reviews: 267,
    weight: "800 جرام",
    category: "لحم خروف",
    inStock: 40,
    features: ["نكهة غنية", "مثالي للشوي", "طري ولذيذ", "حجم مناسب"],
    nutritionFacts: { protein: "24g", fat: "25g", calories: "310", cholesterol: "102mg" },
  },

  // Processed Meat Products
  {
    id: 11,
    name: "نقانق لحم بقري 500 جرام",
    nameEn: "Beef Sausages 500g",
    price: 8.0,
    originalPrice: 9.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "نقانق لحم بقري طازجة عالية الجودة",
    detailedDescription: "نقانق لحم بقري طازجة محضرة من أجود أنواع اللحوم، بنكهات طبيعية ومتبلة بالتوابل الشهية.",
    rating: 4.5,
    reviews: 345,
    weight: "500 جرام",
    category: "لحوم مصنعة",
    inStock: 100,
    features: ["نكهة مميزة", "سهل التحضير", "جودة عالية", "خالي من المواد الضارة"],
    nutritionFacts: { protein: "20g", fat: "25g", calories: "300", cholesterol: "75mg" },
  },
  {
    id: 12,
    name: "برغر لحم بقري 6 قطع",
    nameEn: "Beef Burger Patties 6pcs",
    price: 12.0,
    originalPrice: 14.0,
    image: "/placeholder.svg?height=300&width=300",
    description: "قطع برغر لحم بقري جاهزة للطبخ",
    detailedDescription: "قطع برغر لحم بقري محضرة من لحم مفروم عالي الجودة، متبلة ومشكلة بالحجم المثالي للساندويتشات.",
    rating: 4.6,
    reviews: 567,
    badge: "سريع التحضير",
    weight: "6 قطع",
    category: "لحوم مصنعة",
    inStock: 80,
    features: ["جاهز للطبخ", "حجم مثالي", "نكهة رائعة", "سهل التحضير"],
    nutritionFacts: { protein: "22g", fat: "18g", calories: "260", cholesterol: "80mg" },
  },
]

// Updated categories for meat products
const categories = [
  "الكل",
  "لحم بقري",
  "دجاج",
  "لحم خروف",
  "لحوم مصنعة",
  "لحوم مجمدة",
  "لحوم عضوية",
  "قطع فاخرة",
  "عروض خاصة",
  "منتجات الشوي",
]

export default function MeatProducts() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">منتجات اللحوم الطازجة</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2">
              {product.badge && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">{product.badge}</span>
              )}
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-green-600">{product.price.toFixed(2)} ر.ع</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)} ر.ع</span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{product.weight}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>
              <div className="text-sm text-gray-600">المتوفر: {product.inStock} قطعة</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
