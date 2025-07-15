"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Shield, AlertCircle, CheckCircle } from "lucide-react"

interface OTPModalProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
  onVerificationSuccess: () => void
}

export function OTPModal({ isOpen, onClose, phoneNumber, onVerificationSuccess }: OTPModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer for resend OTP
  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setCanResend(true)
    }
  }, [timeLeft, isOpen])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""])
      setError("")
      setSuccess(false)
      setTimeLeft(60)
      setCanResend(false)
      // Focus first input
      setTimeout(() => inputRefs.current[0]?.focus(), 100)
    }
  }, [isOpen])

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("") // Clear error when user types

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i]
    }

    setOtp(newOtp)
    setError("")

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const validateOTP = (otpString: string): string | null => {
    if (otpString.length !== 6) {
      return "يجب إدخال رمز التحقق كاملاً (6 أرقام)"
    }

    if (!/^\d{6}$/.test(otpString)) {
      return "رمز التحقق يجب أن يحتوي على أرقام فقط"
    }

    // Simulate common OTP validation errors
    if (otpString === "000000") {
      return "رمز التحقق غير صالح"
    }

    if (otpString === "123456") {
      return "رمز التحقق منتهي الصلاحية"
    }

    if (otpString === "111111") {
      return "تم استخدام رمز التحقق من قبل"
    }

    return null
  }

  const handleVerifyOTP = async () => {
    const otpString = otp.join("")

    // Validate OTP format
    const validationError = validateOTP(otpString)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate different responses based on OTP
      if (otpString === "999999") {
        throw new Error("خطأ في الخادم، يرجى المحاولة لاحقاً")
      }

      if (otpString === "888888") {
        throw new Error("تم تجاوز عدد المحاولات المسموحة")
      }

      if (otpString === "777777") {
        throw new Error("رقم الهاتف غير مسجل في النظام")
      }

      // Success case (any other 6-digit number)
      setSuccess(true)
      setTimeout(() => {
        onVerificationSuccess()
        onClose()
      }, 1500)
    } catch (error) {
      setError(error instanceof Error ? error.message : "حدث خطأ غير متوقع")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setTimeLeft(60)
      setCanResend(false)
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    } catch (error) {
      setError("فشل في إعادة إرسال الرمز، يرجى المحاولة لاحقاً")
    } finally {
      setIsLoading(false)
    }
  }

  const formatPhoneNumber = (phone: string) => {
    // Format Omani phone number for display
    if (phone.startsWith("+968")) {
      return phone.replace("+968", "+968 ").replace(/(\d{4})(\d{4})/, "$1 $2")
    }
    return phone
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">تأكيد رقم الهاتف</DialogTitle>
          <DialogDescription className="text-gray-600">
            تم إرسال رمز التحقق إلى رقم الهاتف
            <br />
            <span className="font-semibold text-blue-600 dir-ltr inline-block mt-1">
              {formatPhoneNumber(phoneNumber)}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* OTP Input */}
          <div className="space-y-4">
            <div className="flex justify-center space-x-2 space-x-reverse" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold border-2 ${
                    error ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  } ${success ? "border-green-300 bg-green-50" : ""}`}
                  disabled={isLoading || success}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center">
              {!canResend ? (
                <p className="text-sm text-gray-600">
                  إعادة الإرسال خلال <span className="font-bold text-blue-600">{timeLeft}</span> ثانية
                </p>
              ) : (
                <Button
                  variant="link"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin ml-2" />
                      جاري الإرسال...
                    </>
                  ) : (
                    "إعادة إرسال الرمز"
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                تم التحقق بنجاح! جاري تسجيل الدخول...
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 space-x-reverse">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={isLoading || success}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleVerifyOTP}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              disabled={isLoading || success || otp.some((digit) => !digit)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  جاري التحقق...
                </>
              ) : (
                "تأكيد الرمز"
              )}
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center">
            <p className="text-xs text-gray-500">لم تستلم الرمز؟ تأكد من رقم الهاتف أو تحقق من رسائل SMS</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
