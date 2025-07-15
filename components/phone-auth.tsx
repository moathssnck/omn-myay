"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Phone, Loader2, AlertCircle } from "lucide-react"
import { OTPModal } from "./otp-modal"

interface PhoneAuthProps {
  onAuthSuccess: (phoneNumber: string) => void
}

export function PhoneAuth({ onAuthSuccess }: PhoneAuthProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showOTPModal, setShowOTPModal] = useState(false)

  const validatePhoneNumber = (phone: string): string | null => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, "")

    if (!cleanPhone) {
      return "يرجى إدخال رقم الهاتف"
    }

    // Check Omani phone number patterns
    if (cleanPhone.startsWith("968")) {
      // Format: 968XXXXXXXX (11 digits total)
      if (cleanPhone.length !== 11) {
        return "رقم الهاتف العماني يجب أن يكون 8 أرقام بعد رمز البلد"
      }
      if (!/^968[79]\d{7}$/.test(cleanPhone)) {
        return "رقم الهاتف العماني يجب أن يبدأ بـ 7 أو 9"
      }
    } else if (cleanPhone.startsWith("00968")) {
      // Format: 00968XXXXXXXX (13 digits total)
      if (cleanPhone.length !== 13) {
        return "رقم الهاتف غير صحيح"
      }
      if (!/^00968[79]\d{7}$/.test(cleanPhone)) {
        return "رقم الهاتف العماني يجب أن يبدأ بـ 7 أو 9"
      }
    } else if (cleanPhone.length === 8) {
      // Local format: XXXXXXXX (8 digits)
      if (!/^[79]\d{7}$/.test(cleanPhone)) {
        return "رقم الهاتف العماني يجب أن يبدأ بـ 7 أو 9"
      }
    } else {
      return "تنسيق رقم الهاتف غير صحيح"
    }

    return null
  }

  const formatPhoneNumber = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, "")

    if (cleanPhone.startsWith("968")) {
      return `+${cleanPhone}`
    } else if (cleanPhone.startsWith("00968")) {
      return `+${cleanPhone.substring(2)}`
    } else if (cleanPhone.length === 8) {
      return `+968${cleanPhone}`
    }

    return phone
  }

  const handleSendOTP = async () => {
    const validationError = validatePhoneNumber(phoneNumber)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)

      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate different error scenarios
      const cleanPhone = phoneNumber.replace(/\D/g, "")
      if (cleanPhone.includes("0000")) {
        throw new Error("رقم الهاتف غير صالح")
      }
      if (cleanPhone.includes("1111")) {
        throw new Error("رقم الهاتف محظور")
      }
      if (cleanPhone.includes("2222")) {
        throw new Error("خدمة الرسائل غير متوفرة لهذا الرقم")
      }

      // Success - show OTP modal
      setShowOTPModal(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : "حدث خطأ في إرسال رمز التحقق")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPVerificationSuccess = () => {
    const formattedPhone = formatPhoneNumber(phoneNumber)
    onAuthSuccess(formattedPhone)
  }

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value)
    setError("") // Clear error when user types
  }

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
          <CardDescription>أدخل رقم هاتفك لتلقي رمز التحقق</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="phone"
                type="tel"
                placeholder="9X XXX XXXX أو +968 9X XXX XXXX"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`pr-10 text-left ${error ? "border-red-300 focus:border-red-500" : ""}`}
                disabled={isLoading}
                dir="ltr"
              />
            </div>
            <p className="text-xs text-gray-500">مثال: 91234567 أو +968 91234567</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleSendOTP}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            disabled={isLoading || !phoneNumber.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
                جاري الإرسال...
              </>
            ) : (
              "إرسال رمز التحقق"
            )}
          </Button>

          <div className="text-center text-xs text-gray-500">
            بالمتابعة، أنت توافق على{" "}
            <a href="#" className="text-blue-600 hover:underline">
              الشروط والأحكام
            </a>{" "}
            و{" "}
            <a href="#" className="text-blue-600 hover:underline">
              سياسة الخصوصية
            </a>
          </div>
        </CardContent>
      </Card>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        phoneNumber={formatPhoneNumber(phoneNumber)}
        onVerificationSuccess={handleOTPVerificationSuccess}
      />
    </>
  )
}
