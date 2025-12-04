import { verifyOtp } from "@/app/(auth)/otp-verification";
import { useState } from "react";

export const useOTPVerification = () => {
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountDown] = useState(3);

  const handleVerify = async () => {
      try {
        if (otpValue.length !== 4) return;
        setError("");
        setIsLoading(true);
        await verifyOtp(otpValue);
        setIsSuccess(true);
      } catch (error) {
        setIsLoading(false);
        setError("Invalid OTP");
      } finally {
        setIsLoading(false);
      }
    };
  return {
    otpValue, isSuccess, countdown, isLoading, error,
    setOtpValue, setCountDown, 
    handleVerify
  };
};
