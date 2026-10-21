/**
 * ESIC IP Registration — Field Map
 *
 * Maps each CSV column to the exact ASP.NET WebForms control on the portal.
 * The Playwright runner on your machine consumes this map + queue.json to
 * drive the real PostBack flow in the correct order.
 *
 * Flow (4 pages, all PostBack-driven, NO captcha after login):
 *
 *   Page 1: 1RegisteredEmployees.aspx
 *           Confirm employer code (auto-filled), answer "ESI No. allotted before?" = No → Continue
 *
 *   Page 2: EmployeeCounterFoilRegistration.aspx
 *           Personal + present/permanent address + dispensary + employer + declaration → Submit
 *
 *   Page 3: EmployeeBankDetails.aspx
 *           Type IFSC → Search (PostBack) → bank name/branch auto-fill → enter account no,
 *           MICR, account type, upload cheque/passbook doc → Submit
 *
 *   Page 4: NomineeDetails.aspx
 *           Nominee name + relation + share + family member grid → Save
 *
 *   Page 5: (success page — not in provided files — displays generated 10-digit IP Number)
 */

export type PageId = "entry" | "aadhaar" | "main" | "bank" | "nominee"

export interface FieldSpec {
  /** CSV column name (case-sensitive, matches template header). */
  csvColumn: string
  /** Which portal page this field lives on. */
  page: PageId
  /** The exact `name` attribute the portal submits. Use this in the runner. */
  controlName: string
  /** The exact `id` attribute (for DOM lookups). */
  controlId: string
  /** Field type — drives how the runner sets the value. */
  type:
    | "text"
    | "numeric"
    | "date"
    | "radio"
    | "select"
    | "checkbox"
    | "file"
    | "hidden"
    | "button"
    | "textarea"
  /** Maxlength from the source HTML (when present). */
  maxLength?: number
  /** Whether the portal marks it as required. */
  required?: boolean
  /** Human-readable label shown in the portal. */
  portalLabel: string
  /** Notes for the runner (PostBack triggers, interlocks, etc.). */
  runnerNote?: string
  /** If true, this field triggers a PostBack after being set. */
  triggersPostBack?: boolean
}

export const FIELD_MAP: FieldSpec[] = [
  // ─── PAGE 1: ENTRY ────────────────────────────────────────────────────────
  {
    csvColumn: "_internal_employer_code",
    page: "entry",
    controlName: "ctl00$HomePageContent$txtEmployerCode",
    controlId: "ctl00_HomePageContent_txtEmployerCode",
    type: "text",
    maxLength: 17,
    required: true,
    portalLabel: "Employer/Subunit Code No",
    runnerNote: "Disabled + auto-filled from session. Do not write. Used only for verification.",
  },
  {
    csvColumn: "_internal_esi_allotted_before",
    page: "entry",
    controlName: "ctl00$HomePageContent$rbtnlistIsregistered",
    controlId: "ctl00_HomePageContent_rbtnlistIsregistered_1",
    type: "radio",
    required: true,
    portalLabel: "Was the Employee ever allotted a ESI Number?",
    runnerNote: "For NEW IPs, click the 'No' radio (value=1) which triggers a PostBack to reveal the registration form.",
    triggersPostBack: true,
  },
  {
    csvColumn: "_internal_continue",
    page: "entry",
    controlName: "ctl00$HomePageContent$btnContinue",
    controlId: "ctl00_HomePageContent_btnContinue",
    type: "button",
    portalLabel: "Continue",
    runnerNote: "Click to navigate from entry page to the main registration form.",
  },

  // ─── PAGE 2: MAIN FORM (EmployeeCounterFoilRegistration.aspx) ─────────────
  {
    csvColumn: "EmpName",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextEmpName",
    controlId: "ctl00_HomePageContent_ctrlTextEmpName",
    type: "text",
    maxLength: 45,
    required: true,
    portalLabel: "1. Name of the Insured Person",
    runnerNote: "Uppercased by CSS class cssUpperCaseTextBox.",
  },
  {
    csvColumn: "RelationType",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlFatherOrHus",
    controlId: "ctl00_HomePageContent_ctrlFatherOrHus_0", // Father; _1 = Husband
    type: "radio",
    required: true,
    portalLabel: "2. Father/Husband of",
    runnerNote: "Values: 'Father' (_0) or 'Husband' (_1). Selecting Husband triggers a PostBack that locks gender to F and marital to Married/Widow.",
    triggersPostBack: true,
  },
  {
    csvColumn: "FatherOrHusbandName",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextFatherHusName",
    controlId: "ctl00_HomePageContent_ctrlTextFatherHusName",
    type: "text",
    maxLength: 50,
    required: true,
    portalLabel: "Father/Husband Name",
  },
  {
    csvColumn: "DOB",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTxtIpDate",
    controlId: "ctl00_HomePageContent_ctrlTxtIpDate",
    type: "date",
    required: true,
    portalLabel: "3. Date of Birth",
    runnerNote: "Readonly input — must drive the date-picker via JS or set value + dispatch change event. Format: dd/MM/yyyy.",
  },
  {
    csvColumn: "MaritalStatus",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlRDMarried",
    controlId: "ctl00_HomePageContent_ctrlRDMarried",
    type: "select",
    required: true,
    portalLabel: "6. Marital Status",
    runnerNote: "Codes: 1=UnMarried, 2=Married, 3=Widow, 4=Widower. onchange fires assignGender() which locks gender radio.",
    triggersPostBack: false,
  },
  {
    csvColumn: "Gender",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlRDMale",
    controlId: "ctl00_HomePageContent_ctrlRDMale_0", // _0=M, _1=F, _2=TG
    type: "radio",
    required: true,
    portalLabel: "7. Gender",
    runnerNote: "M (_0) / F (_1) / TG (_2). Each triggers a PostBack. Interlocked with MaritalStatus + Father/Husband.",
    triggersPostBack: true,
  },
  {
    csvColumn: "PresentAddress",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentAddress1",
    controlId: "ctl00_HomePageContent_ctrlTextPresentAddress1",
    type: "text",
    maxLength: 50,
    required: true,
    portalLabel: "10. Present Address Line 1",
  },
  {
    csvColumn: "PresentAddress2",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentAddress2",
    controlId: "ctl00_HomePageContent_ctrlTextPresentAddress2",
    type: "text",
    maxLength: 50,
    portalLabel: "10. Present Address Line 2",
  },
  {
    csvColumn: "PresentAddress3",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentAddress3",
    controlId: "ctl00_HomePageContent_ctrlTextPresentAddress3",
    type: "text",
    maxLength: 50,
    portalLabel: "10. Present Address Line 3",
  },
  {
    csvColumn: "PinCode",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTxtPresentPinCode",
    controlId: "ctl00_HomePageContent_ctrlTxtPresentPinCode",
    type: "numeric",
    maxLength: 6,
    required: true,
    portalLabel: "Present Pin Code",
  },
  {
    csvColumn: "PresentState",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTxtPresentState",
    controlId: "ctl00_HomePageContent_ctrlTxtPresentState",
    type: "select",
    required: true,
    portalLabel: "Present State",
    runnerNote: "Set value to the state CODE (e.g. 29 for Gujarat). onchange fires selectPresentStates() which PostBacks to load districts.",
    triggersPostBack: true,
  },
  {
    csvColumn: "PresentDistrict",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentDistrict",
    controlId: "ctl00_HomePageContent_ctrlTextPresentDistrict",
    type: "select",
    required: true,
    portalLabel: "Present District",
    runnerNote: "Wait for state PostBack to finish, then set district. District codes are state-specific and loaded server-side.",
    triggersPostBack: true,
  },
  {
    csvColumn: "MobileNo",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentMobileNo",
    controlId: "ctl00_HomePageContent_ctrlTextPresentMobileNo",
    type: "numeric",
    maxLength: 10,
    required: true,
    portalLabel: "Present Mobile No",
  },
  {
    csvColumn: "Email",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentEmail",
    controlId: "ctl00_HomePageContent_ctrlTextPresentEmail",
    type: "text",
    maxLength: 45,
    portalLabel: "Present Email (optional)",
  },
  {
    csvColumn: "CopyPresentToPermanent",
    page: "main",
    controlName: "ctl00$HomePageContent$chkboxCopyPresentAddress",
    controlId: "ctl00_HomePageContent_chkboxCopyPresentAddress",
    type: "checkbox",
    portalLabel: "Copy Present Address to Permanent Address",
    runnerNote: "Tick this to avoid filling permanent address fields. Recommended for bulk runs.",
  },
  {
    csvColumn: "DispensaryType",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlRBDispensaryIMP",
    controlId: "ctl00_HomePageContent_ctrlRBDispensaryIMP_0",
    type: "radio",
    required: true,
    portalLabel: "12a. Dispensary Or IMP or mEUD For IP",
    runnerNote: "Values: 'Dispensary' (_0, default), 'IMP' (_1), 'EMud' (_2). _1 and _2 trigger PostBacks.",
    triggersPostBack: true,
  },
  {
    csvColumn: "DispensaryState",
    page: "main",
    controlName: "ctl00$HomePageContent$ddlDispensaryState",
    controlId: "ctl00_HomePageContent_ddlDispensaryState",
    type: "select",
    required: true,
    portalLabel: "Dispensary State",
    runnerNote: "Set state CODE. onchange triggers PostBack to load districts.",
    triggersPostBack: true,
  },
  {
    csvColumn: "DispensaryDistrict",
    page: "main",
    controlName: "ctl00$HomePageContent$ddlDispensaryDistrict",
    controlId: "ctl00_HomePageContent_ddlDispensaryDistrict",
    type: "select",
    required: true,
    portalLabel: "Dispensary District",
    runnerNote: "Wait for state PostBack, then set district. Triggers another PostBack to load dispensary names.",
    triggersPostBack: true,
  },
  {
    csvColumn: "DispensaryName",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextDispensary",
    controlId: "ctl00_HomePageContent_ctrlTextDispensary",
    type: "select",
    required: true,
    portalLabel: "Dispensary Name",
    runnerNote: "Wait for district PostBack, then select dispensary by visible label (codes are dynamic). Triggers PostBack.",
    triggersPostBack: true,
  },
  {
    csvColumn: "AppointmentDate",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlDIDateOfAppointmentDy",
    controlId: "ctl00_HomePageContent_ctrlDIDateOfAppointmentDy",
    type: "date",
    required: true,
    portalLabel: "Date of Appointment",
    runnerNote: "Format: dd/MM/yyyy. If DOA > 10 days before registration date, portal flags it for RO/SRO verification (still accepts).",
  },
  {
    csvColumn: "SMSLanguage",
    page: "main",
    controlName: "ctl00$HomePageContent$ddllanguage",
    controlId: "ctl00_HomePageContent_ddllanguage",
    type: "select",
    required: true,
    portalLabel: "SMS Language",
  },
  {
    csvColumn: "AadhaarNumber",
    page: "aadhaar",
    controlName: "ctl00$HomePageContent$txtAadhaar",
    controlId: "ctl00_HomePageContent_txtAadhaar",
    type: "numeric",
    maxLength: 12,
    required: true,
    portalLabel: "Aadhaar Number",
    runnerNote: "12-digit Aadhaar number with valid Verhoeff checksum. Entered on the Aadhaar page (between entry and main form). Select 'Later' for OTP verification.",
  },
  {
    csvColumn: "_internal_declaration",
    page: "main",
    controlName: "ctl00$HomePageContent$dec_chkbox",
    controlId: "ctl00_HomePageContent_dec_chkbox",
    type: "checkbox",
    required: true,
    portalLabel: "Declaration checkbox",
    runnerNote: "MUST be ticked before Submit becomes enabled (validchkButton()).",
  },
  {
    csvColumn: "_internal_submit_main",
    page: "main",
    controlName: "ctl00$HomePageContent$Submit",
    controlId: "ctl00_HomePageContent_Submit",
    type: "button",
    portalLabel: "Submit (main form)",
    runnerNote: "ValidationGroup='EmpDetails'. On success, navigates to bank page.",
  },

  // ─── PAGE 3: BANK DETAILS (EmployeeBankDetails.aspx) ──────────────────────
  {
    csvColumn: "IFSCCode",
    page: "bank",
    controlName: "ctl00$HomePageContent$txtIFSCcode",
    controlId: "ctl00_HomePageContent_txtIFSCcode",
    type: "text",
    maxLength: 11,
    required: true,
    portalLabel: "IFSC Code",
    runnerNote: "Type IFSC, then click btnIFSCcode (Search). PostBack auto-fills Bank Name, Branch Name, and echoes IFSC into disabled txtifsc.",
  },
  {
    csvColumn: "_internal_ifsc_search",
    page: "bank",
    controlName: "ctl00$HomePageContent$btnIFSCcode",
    controlId: "ctl00_HomePageContent_btnIFSCcode",
    type: "button",
    portalLabel: "IFSC Search button",
    runnerNote: "ValidationGroup='search'. Click AFTER typing IFSC. Wait for PostBack.",
  },
  {
    csvColumn: "BankAccNo",
    page: "bank",
    controlName: "ctl00$HomePageContent$txtacc_number",
    controlId: "ctl00_HomePageContent_txtacc_number",
    type: "numeric",
    maxLength: 20,
    required: true,
    portalLabel: "Account Number",
    runnerNote: "Only becomes available after IFSC search succeeds.",
  },
  {
    csvColumn: "MICRCode",
    page: "bank",
    controlName: "ctl00$HomePageContent$txtmicr",
    controlId: "ctl00_HomePageContent_txtmicr",
    type: "numeric",
    maxLength: 20,
    portalLabel: "MICR Code (optional)",
  },
  {
    csvColumn: "AccountType",
    page: "bank",
    controlName: "ctl00$HomePageContent$ddlAccountType",
    controlId: "ctl00_HomePageContent_ddlAccountType",
    type: "select",
    required: true,
    portalLabel: "Account Type",
    runnerNote: "Codes: 2=Savings, 3=Current, 4=Others. Default 0 = invalid.",
  },
  {
    csvColumn: "BankDocPath",
    page: "bank",
    controlName: "ctl00$HomePageContent$ctrlFISelectFile",
    controlId: "ctl00_HomePageContent_ctrlFISelectFile",
    type: "file",
    required: true,
    portalLabel: "Bank Document (cheque/passbook)",
    runnerNote: "PDF/JPG/JPEG, max 200KB. After selecting file, click btnUpload to upload, then wait for status message.",
  },
  {
    csvColumn: "_internal_bank_submit",
    page: "bank",
    controlName: "ctl00$HomePageContent$btnsubmit",
    controlId: "ctl00_HomePageContent_btnsubmit",
    type: "button",
    portalLabel: "Submit (bank form)",
    runnerNote: "ValidationGroup='submit'. On success, navigates to nominee page.",
  },

  // ─── PAGE 4: NOMINEE (NomineeDetails.aspx) ────────────────────────────────
  {
    csvColumn: "NomineeName",
    page: "nominee",
    controlName: "ctl00$HomePageContent$ctrlTextUserName",
    controlId: "ctl00_HomePageContent_ctrlTextUserName",
    type: "text",
    maxLength: 45,
    required: true,
    portalLabel: "Nominee Name",
  },
  {
    csvColumn: "NomineeRelation",
    page: "nominee",
    controlName: "ctl00$HomePageContent$RelationShipWithIp",
    controlId: "ctl00_HomePageContent_RelationShipWithIp",
    type: "select",
    required: true,
    portalLabel: "Nominee Relationship",
    runnerNote: "Set CODE from RELATION_CODES (e.g. 7=Father). The page also auto-loads nominee address based on this.",
  },
  {
    csvColumn: "NomineeShare",
    page: "nominee",
    controlName: "ctl00$HomePageContent$NomineeXmldata",
    controlId: "ctl00_HomePageContent_NomineeXmldata",
    type: "hidden",
    required: true,
    portalLabel: "Nominee Share %",
    runnerNote: "Share is part of the XML payload in NomineeXmldata. All nominees for an IP must sum to 100. Runner builds XML.",
  },
  {
    csvColumn: "FamilyMemberName",
    page: "nominee",
    controlName: "ctl00$HomePageContent$Xmldatahidden",
    controlId: "ctl00_HomePageContent_Xmldatahidden",
    type: "hidden",
    portalLabel: "Family Member Name (for IP card)",
    runnerNote: "Optional but recommended. Part of Xmldatahidden XML payload along with FamilyMemberDOB + FamilyMemberRelation.",
  },
  {
    csvColumn: "FamilyMemberDOB",
    page: "nominee",
    controlName: "ctl00$HomePageContent$Xmldatahidden",
    controlId: "ctl00_HomePageContent_Xmldatahidden",
    type: "hidden",
    portalLabel: "Family Member DOB",
    runnerNote: "Format dd/MM/yyyy. Part of Xmldatahidden XML.",
  },
  {
    csvColumn: "FamilyMemberRelation",
    page: "nominee",
    controlName: "ctl00$HomePageContent$Xmldatahidden",
    controlId: "ctl00_HomePageContent_Xmldatahidden",
    type: "hidden",
    portalLabel: "Family Member Relation",
    runnerNote: "Use CODE from RELATION_CODES. Part of Xmldatahidden XML.",
  },
  {
    csvColumn: "_internal_nominee_save",
    page: "nominee",
    controlName: "ctl00$HomePageContent$Save",
    controlId: "ctl00_HomePageContent_Save",
    type: "button",
    portalLabel: "Save (nominee form)",
    runnerNote: "On success, navigates to success page showing generated IP Number.",
  },
]

/** Convenience: fields grouped by page, in the order the runner should fill them. */
export const FIELDS_BY_PAGE: Record<PageId, FieldSpec[]> = {
  entry: FIELD_MAP.filter((f) => f.page === "entry"),
  aadhaar: FIELD_MAP.filter((f) => f.page === "aadhaar"),
  main: FIELD_MAP.filter((f) => f.page === "main"),
  bank: FIELD_MAP.filter((f) => f.page === "bank"),
  nominee: FIELD_MAP.filter((f) => f.page === "nominee"),
}

/** CSV columns the user provides (excludes internal-only fields prefixed with _internal_). */
export const CSV_COLUMNS = FIELD_MAP.filter((f) => !f.csvColumn.startsWith("_internal_")).map(
  (f) => f.csvColumn,
)
