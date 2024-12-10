import { AuthError } from "@supabase/supabase-js";

// Error codes at https://supabase.com/docs/guides/auth/debugging/error-codes

export default function handleAuthErrors(error: AuthError): string {
  switch (error.code) {
    case "anonymous_provider_disabled":
      return "Anonymous sign-ins are not allowed. Please use a different sign-in method.";
    case "bad_json":
      return "Something went wrong. Please try again later.";
    case "bad_jwt":
      return "Session expired. Please sign in again.";
    case "captcha_failed":
      return "Captcha verification failed. Please try again.";
    case "email_exists":
      return "This email address is already registered. Please sign in or use a different email.";
    case "email_not_confirmed":
      return "Please confirm your email address before signing in.";
    case "invalid_credentials":
      return "Invalid email or password. Please try again.";
    case "over_email_send_rate_limit":
      return "Too many emails have been sent to this address. Please wait a while before trying again.";
    case "otp_expired":
      return "The OTP has expired. Please request a new one.";
    case "over_request_rate_limit":
      return "Too many requests from this device. Please try again later.";
    case "signup_disabled":
      return "Sign-ups are currently disabled. Please contact support for more information.";
    case "user_banned":
      return "Your account has been temporarily banned. Please contact support for assistance.";
    case "validation_failed":
      return "One or more fields are invalid. Please check your input and try again.";
    case "weak_password":
      return "Your password does not meet the strength requirements. Please use a stronger password.";
    default:
      return "[Auth Api Error] An unexpected error occurred. Please contact support if the issue persists.";
  }
}
