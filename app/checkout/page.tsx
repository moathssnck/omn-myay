"use client"
import { useState, useEffect } from "react"
import { PaymentGatewayService, type PaymentRequest } from "@/lib/payment-gateways"
import { useCart } from "@/contexts/cart-context"

export default function ProfessionalCheckout() {
  const { items: cartItems, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [deliveryMethod, setDeliveryMethod] = useState("home")
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<any>(null)
  const [orderTime, setOrderTime] = useState(new Date())
  const [otpError, setOtpError] = useState("")

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    area: "",
    building: "",
    floor: "",
    apartment: "",
    notes: "",
    isCompany: false,
    companyName: "",
    taxNumber: "",
  })

  useEffect(() => {
    const timer = setInterval(() => setOrderTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Redirect to home if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && currentStep === 1) {
      // Allow some time for cart to load from localStorage
      const timer = setTimeout(() => {
        if (cartItems.length === 0) {
          window.location.href = "/"
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [cartItems.length, currentStep])

  const subtotal = getTotalPrice()
  const deliveryFee = deliveryMethod === "home" ? (subtotal >= 5 ? 0 : 1.5) : 0
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

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessing(true)
    setOtpError("")

    try {
      const paymentRequest: PaymentRequest = {
        amount: total,
        currency: "OMR",
        orderId: `ORD_${Date.now()}`,
        customerInfo: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone,
        },
        cardInfo: paymentData.cardInfo,
        gateway: paymentData.gateway,
      }

      const result = await PaymentGatewayService.initiatePayment(paymentRequest)

      if (result.success && result.requiresOTP) {
        setPaymentResult(result)
        // Send OTP
        await PaymentGatewayService.sendOTP({
          transactionId: result.transactionId!,
          phone: customerInfo.phone,
          gateway: paymentData.gateway,
        })
        setCurrentStep(4) // Move to OTP verification step
      } else if (!result.success) {
        alert(`فشل في معالجة الدفع: ${result.error}`)
      }
    } catch (error) {
      alert("حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleOTPVerification = async (otpCode: string) => {
    if (!paymentResult?.transactionId) return

    setIsProcessing(true)
    setOtpError("")

    try {
      const result = await PaymentGatewayService.verifyOTP({
        transactionId: paymentResult.transactionId,
        otpCode,
        gateway: "bank_muscat_card",
      })

      if (result.success) {
        setPaymentResult({
          transactionId: result.transactionId,
          amount: total,
          currency: "OMR",
          gateway: "bank_muscat_card",
          customerInfo: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
          },
          orderItems: cartItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        })
        // Clear cart after successful payment
        clearCart()
        setCurrentStep(5) // Success step
      } else {
        setOtpError(result.error || "رمز التحقق غير صحيح")
      }
    } catch (error) {
      setOtpError("حدث خطأ أثناء التحقق. يرجى المحاولة مرة أخرى.")
