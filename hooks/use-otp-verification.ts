import { useState } from "react";

export const useOTPVerification = () => {
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountDown] = useState(3);

  return {
    otpValue,
    isSuccess,
    countdown,
    isLoading,
    error,
    setOtpValue,
    setCountDown,
    setIsLoading,
    setIsSuccess,
    setError,
  };
};
