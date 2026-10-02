import { enquiryTypes } from "@/data/buyer-content";
export type Lead = {
  name: string;
  phone: string;
  email: string;
  configuration: string;
  enquiryType: string;
  message: string;
  callback: string;
  consent: boolean;
};
export type LeadErrors = Partial<Record<keyof Lead, string>>;

/** Accept Indian mobiles with a local, 0 or +91 prefix, and explicit international numbers. */
export function isValidMobile(phone: string) {
  if (!/^\+?[\d ()-]{10,21}$/.test(phone.trim())) return false;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits);
  if (digits.length === 11 && digits.startsWith("0")) return /^0[6-9]\d{9}$/.test(digits);
  if (digits.startsWith("91")) return /^91[6-9]\d{9}$/.test(digits);
  return phone.trim().startsWith("+") && /^[1-9]\d{7,14}$/.test(digits);
}

export function getLeadErrors(data: Record<string, unknown>): LeadErrors {
  const errors: LeadErrors = {};
  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (name.length < 2 || name.length > 100) errors.name = "Please enter your full name.";
  if (typeof data.phone !== "string" || !isValidMobile(data.phone)) errors.phone = "Please enter a valid mobile number, including a country code if outside India.";
  if (typeof data.email !== "string" || data.email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (typeof data.enquiryType !== "string" || !(enquiryTypes as readonly string[]).includes(data.enquiryType)) errors.enquiryType = "Please select an enquiry type.";
  if (typeof data.message === "string" && data.message.length > 1200) errors.message = "Please keep your message under 1,200 characters.";
  if (data.consent !== true) errors.consent = "Please confirm your consent to be contacted.";
  return errors;
}

export function validateLead(value: unknown): Lead | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  const string = (key: string, max: number) =>
    typeof data[key] === "string" && data[key].length <= max
      ? data[key].trim()
      : null;
  const name = string("name", 100),
    phone = string("phone", 22),
    email = string("email", 150),
    configuration = string("configuration", 100),
    enquiryType = string("enquiryType", 50),
    message = string("message", 1200),
    callback = data.callback === undefined ? "" : string("callback", 100);
  if (
    !name ||
    name.length < 2 ||
    !phone ||
    !isValidMobile(phone) ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    configuration === null ||
    !enquiryType ||
    !(enquiryTypes as readonly string[]).includes(enquiryType) ||
    message === null ||
    callback === null ||
    data.consent !== true
  )
    return null;
  return {
    name,
    phone,
    email,
    configuration,
    enquiryType,
    message,
    callback,
    consent: true,
  };
}
