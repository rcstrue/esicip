/**
 * ESIC IP Registration — Master Data
 *
 * Extracted directly from the ASPX source files you provided:
 *   - EmployeeCounterFoilRegistration.aspx (main form)
 *   - 2EmployeeBankDetails.aspx (bank page post-IFSC-search)
 *   - NomineeDetails.aspx (nominee + family page)
 *
 * These code tables are what the portal's <select> controls submit.
 * Your Excel/CSV uses human labels; we translate them to these codes
 * before producing the queue.json the runner consumes.
 */

/** State code → State name (used by Present / Permanent / Dispensary state dropdowns). */
export const STATE_CODES: Record<string, string> = {
  "102": "Andaman And Nicobar",
  "23": "Andhra Pradesh",
  "24": "Arunachal Pradesh",
  "25": "Assam",
  "26": "Bihar",
  "32": "Chandigarh",
  "27": "Chhattisgarh",
  "101": "Dadra and Nagar Haveli",
  "100": "Daman and Diu",
  "20": "Delhi",
  "99": "Dummy State",
  "28": "Goa",
  "29": "Gujarat",
  "30": "Haryana",
  "1": "Himachal Pradesh",
  "98": "IP State",
  "2": "Jammu and Kashmir",
  "3": "Jharkhand",
  "21": "Karnataka",
  "4": "Kerala",
  "103": "Lakshadweep",
  "5": "Madhya Pradesh",
  "6": "Maharashtra",
  "7": "Manipur",
  "8": "Meghalaya",
  "9": "Mizoram",
  "10": "Nagaland",
  "11": "Odisha",
  "104": "Outside India",
  "12": "Puducherry",
  "13": "Punjab",
  "14": "Rajasthan",
  "15": "Sikkim",
  "16": "Tamilnadu",
  "105": "Telangana",
  "17": "Tripura",
  "18": "Uttar Pradesh",
  "31": "Uttarakhand",
  "19": "Uttaranchal",
  "22": "West Bengal",
}

/** Reverse lookup: state name (case-insensitive) → code. */
export const STATE_NAME_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_CODES).map(([code, name]) => [name.toLowerCase(), code]),
)

/** Nominee / family-member relation codes (RelationShipWithIp <select>). */
export const RELATION_CODES: Record<string, string> = {
  "1": "Spouse",
  "2": "Minor dependant son",
  "3": "Dependant unmarried daughter",
  "4": "Dependant son receiving education",
  "5": "Dependant infirm son",
  "6": "Dependant infirm unmarried daughter",
  "7": "Dependant father",
  "8": "Dependant mother",
  "39": "Brother",
  "40": "Sister",
  "41": "Dependant son - receiving education",
  "99": "Others",
}

/** Common shorthand aliases users type in CSV → relation code.
 *  The portal's <option> text is verbose ("Dependant father"), but users
 *  naturally write "Father". This map bridges that gap. */
export const RELATION_ALIASES: Record<string, string> = {
  father: "7",
  mother: "8",
  spouse: "1",
  wife: "1",
  husband: "1",
  son: "2",
  "minor son": "2",
  daughter: "3",
  "unmarried daughter": "3",
  brother: "39",
  sister: "40",
  other: "99",
  others: "99",
}

/** Reverse: relation name (case-insensitive, with aliases) → code. */
export const RELATION_NAME_TO_CODE: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(RELATION_CODES).map(([code, name]) => [name.toLowerCase(), code]),
  ),
  ...RELATION_ALIASES,
}

/** Human-friendly list of accepted relation labels (for error messages + docs). */
export const RELATION_ACCEPTED_LABELS = [
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Others",
]

/** Marital status (ctrlRDMarried <select> on main form). */
export const MARITAL_CODES: Record<string, string> = {
  "1": "UnMarried",
  "2": "Married",
  "3": "Widow",
  "4": "Widower",
}

export const MARITAL_NAME_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(MARITAL_CODES).map(([code, name]) => [name.toLowerCase(), code]),
)

/** Gender (ctrlRDMale radio: M / F / TG). */
export const GENDER_VALUES = ["M", "F", "TG"] as const
export type Gender = (typeof GENDER_VALUES)[number]

/** Father/Husband radio values. */
export const FATHER_HUSBAND_VALUES = ["Father", "Husband"] as const
export type FatherHusband = (typeof FATHER_HUSBAND_VALUES)[number]

/** Bank account type (ddlAccountType on bank page). */
export const ACCOUNT_TYPE_CODES: Record<string, string> = {
  "2": "Savings",
  "3": "Current",
  "4": "Others",
}

export const ACCOUNT_TYPE_NAME_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(ACCOUNT_TYPE_CODES).map(([code, name]) => [name.toLowerCase(), code]),
)

/** Dispensary/IMP/mEUD radio values (ctrlRBDispensaryIMP). */
export const DISPENSARY_TYPE_VALUES = ["Dispensary", "IMP", "EMud"] as const

/** SMS language values visible on the ddllanguage dropdown.
 * The portal populates this server-side. Common values seen in production. */
export const SMS_LANGUAGES = [
  "Hindi",
  "English",
  "Gujarati",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Punjabi",
] as const

/** Allowed document MIME types / extensions for bank page upload. */
export const BANK_DOC_CONSTRAINTS = {
  extensions: ["pdf", "jpg", "jpeg"],
  maxSizeBytes: 200 * 1024, // 200 KB
} as const

/** IFSC format: 4 letters + 0 + 6 alphanumeric. */
export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/

/** Aadhaar uses Verhoeff checksum (12 digits, last is check digit). */
export const AADHAAR_REGEX = /^\d{12}$/

/** Mobile: 10 digits, first digit 6-9 (Indian format). */
export const MOBILE_REGEX = /^[6-9]\d{9}$/

/** PIN code: 6 digits. */
export const PIN_REGEX = /^\d{6}$/

/** Date format on the portal: dd/MM/yyyy (readonly date-pickers). */
export const DATE_FORMAT_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/
