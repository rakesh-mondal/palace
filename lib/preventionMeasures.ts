import { toast } from "@/components/ui/use-toast"

// Rate limiting
const rateLimits: { [key: string]: { count: number; lastReset: number } } = {}

export const checkRateLimit = (key: string, limit: number, windowMs: number): boolean => {
  const now = Date.now()
  if (!rateLimits[key]) {
    rateLimits[key] = { count: 1, lastReset: now }
    return true
  }

  if (now - rateLimits[key].lastReset > windowMs) {
    rateLimits[key] = { count: 1, lastReset: now }
    return true
  }

  if (rateLimits[key].count >= limit) {
    toast({
      title: "Rate limit exceeded",
      description: "Please try again later.",
      variant: "destructive",
    })
    return false
  }

  rateLimits[key].count++
  return true
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  // Remove any potentially harmful characters or scripts
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
}

// CSRF token generation
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Validate CSRF token
export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken
}

