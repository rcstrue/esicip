// src/lib/esic/field-map.ts
var FIELD_MAP = [
  {
    csvColumn: "_internal_employer_code",
    page: "entry",
    controlName: "ctl00$HomePageContent$txtEmployerCode",
    controlId: "ctl00_HomePageContent_txtEmployerCode",
    type: "text",
    maxLength: 17,
    required: true,
    portalLabel: "Employer/Subunit Code No",
    runnerNote: "Disabled + auto-filled from session. Do not write. Used only for verification."
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
    triggersPostBack: true
  },
  {
    csvColumn: "_internal_continue",
    page: "entry",
    controlName: "ctl00$HomePageContent$btnContinue",
    controlId: "ctl00_HomePageContent_btnContinue",
    type: "button",
    portalLabel: "Continue",
    runnerNote: "Click to navigate from entry page to the main registration form."
  },
  {
    csvColumn: "EmpName",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextEmpName",
    controlId: "ctl00_HomePageContent_ctrlTextEmpName",
    type: "text",
    maxLength: 45,
    required: true,
    portalLabel: "1. Name of the Insured Person",
    runnerNote: "Uppercased by CSS class cssUpperCaseTextBox."
  },
  {
    csvColumn: "RelationType",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlFatherOrHus",
    controlId: "ctl00_HomePageContent_ctrlFatherOrHus_0",
    type: "radio",
    required: true,
    portalLabel: "2. Father/Husband of",
    runnerNote: "Values: 'Father' (_0) or 'Husband' (_1). Selecting Husband triggers a PostBack that locks gender to F and marital to Married/Widow.",
    triggersPostBack: true
  },
  {
    csvColumn: "FatherOrHusbandName",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextFatherHusName",
    controlId: "ctl00_HomePageContent_ctrlTextFatherHusName",
    type: "text",
    maxLength: 50,
    required: true,
    portalLabel: "Father/Husband Name"
  },
  {
    csvColumn: "DOB",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTxtIpDate",
    controlId: "ctl00_HomePageContent_ctrlTxtIpDate",
    type: "date",
    required: true,
    portalLabel: "3. Date of Birth",
    runnerNote: "Readonly input — must drive the date-picker via JS or set value + dispatch change event. Format: dd/MM/yyyy."
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
    triggersPostBack: false
  },
  {
    csvColumn: "Gender",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlRDMale",
    controlId: "ctl00_HomePageContent_ctrlRDMale_0",
    type: "radio",
    required: true,
    portalLabel: "7. Gender",
    runnerNote: "M (_0) / F (_1) / TG (_2). Each triggers a PostBack. Interlocked with MaritalStatus + Father/Husband.",
    triggersPostBack: true
  },
  {
    csvColumn: "PresentAddress",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentAddress1",
    controlId: "ctl00_HomePageContent_ctrlTextPresentAddress1",
    type: "text",
    maxLength: 50,
    required: true,
    portalLabel: "10. Present Address Line 1"
  },
  {
    csvColumn: "PresentAddress2",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentAddress2",
    controlId: "ctl00_HomePageContent_ctrlTextPresentAddress2",
    type: "text",
    maxLength: 50,
    portalLabel: "10. Present Address Line 2"
  },
  {
    csvColumn: "PresentAddress3",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentAddress3",
    controlId: "ctl00_HomePageContent_ctrlTextPresentAddress3",
    type: "text",
    maxLength: 50,
    portalLabel: "10. Present Address Line 3"
  },
  {
    csvColumn: "PinCode",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTxtPresentPinCode",
    controlId: "ctl00_HomePageContent_ctrlTxtPresentPinCode",
    type: "numeric",
    maxLength: 6,
    required: true,
    portalLabel: "Present Pin Code"
  },
  {
    csvColumn: "PresentState",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTxtPresentState",
    controlId: "ctl00_HomePageContent_ctrlTxtPresentState",
    type: "select",
    required: true,
    portalLabel: "Present State",
    runnerNote: "Set value to the state NAME (e.g. Gujarat) — the live <select> uses the name as the option value. onchange fires selectPresentStates() which PostBacks to load districts.",
    triggersPostBack: true
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
    triggersPostBack: true
  },
  {
    csvColumn: "MobileNo",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentMobileNo",
    controlId: "ctl00_HomePageContent_ctrlTextPresentMobileNo",
    type: "numeric",
    maxLength: 10,
    required: true,
    portalLabel: "Present Mobile No"
  },
  {
    csvColumn: "Email",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlTextPresentEmail",
    controlId: "ctl00_HomePageContent_ctrlTextPresentEmail",
    type: "text",
    maxLength: 45,
    portalLabel: "Present Email (optional)"
  },
  {
    csvColumn: "CopyPresentToPermanent",
    page: "main",
    controlName: "ctl00$HomePageContent$chkboxCopyPresentAddress",
    controlId: "ctl00_HomePageContent_chkboxCopyPresentAddress",
    type: "checkbox",
    portalLabel: "Copy Present Address to Permanent Address",
    runnerNote: "Tick this to avoid filling permanent address fields. Recommended for bulk runs."
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
    triggersPostBack: true
  },
  {
    csvColumn: "DispensaryState",
    page: "main",
    controlName: "ctl00$HomePageContent$ddlDispensaryState",
    controlId: "ctl00_HomePageContent_ddlDispensaryState",
    type: "select",
    required: true,
    portalLabel: "Dispensary State",
    runnerNote: "Set the numeric state CODE (e.g. 29 for Gujarat) — the dispensary <select> uses codes as option values. onchange triggers PostBack to load districts.",
    triggersPostBack: true
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
    triggersPostBack: true
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
    triggersPostBack: true
  },
  {
    csvColumn: "AppointmentDate",
    page: "main",
    controlName: "ctl00$HomePageContent$ctrlDIDateOfAppointmentDy",
    controlId: "ctl00_HomePageContent_ctrlDIDateOfAppointmentDy",
    type: "date",
    required: true,
    portalLabel: "Date of Appointment",
    runnerNote: "Format: dd/MM/yyyy. If DOA > 10 days before registration date, portal flags it for RO/SRO verification (still accepts)."
  },
  {
    csvColumn: "SMSLanguage",
    page: "main",
    controlName: "ctl00$HomePageContent$ddllanguage",
    controlId: "ctl00_HomePageContent_ddllanguage",
    type: "select",
    required: true,
    portalLabel: "SMS Language"
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
    runnerNote: "12-digit Aadhaar number with valid Verhoeff checksum. Entered on the Aadhaar page (between entry and main form). Select 'Later' for OTP verification."
  },
  {
    csvColumn: "_internal_declaration",
    page: "main",
    controlName: "ctl00$HomePageContent$dec_chkbox",
    controlId: "ctl00_HomePageContent_dec_chkbox",
    type: "checkbox",
    required: true,
    portalLabel: "Declaration checkbox",
    runnerNote: "MUST be ticked before Submit becomes enabled (validchkButton())."
  },
  {
    csvColumn: "_internal_submit_main",
    page: "main",
    controlName: "ctl00$HomePageContent$Submit",
    controlId: "ctl00_HomePageContent_Submit",
    type: "button",
    portalLabel: "Submit (main form)",
    runnerNote: "ValidationGroup='EmpDetails'. On success, navigates to bank page."
  },
  {
    csvColumn: "IFSCCode",
    page: "bank",
    controlName: "ctl00$HomePageContent$txtIFSCcode",
    controlId: "ctl00_HomePageContent_txtIFSCcode",
    type: "text",
    maxLength: 11,
    required: true,
    portalLabel: "IFSC Code",
    runnerNote: "Type IFSC, then click btnIFSCcode (Search). PostBack auto-fills Bank Name, Branch Name, and echoes IFSC into disabled txtifsc."
  },
  {
    csvColumn: "_internal_ifsc_search",
    page: "bank",
    controlName: "ctl00$HomePageContent$btnIFSCcode",
    controlId: "ctl00_HomePageContent_btnIFSCcode",
    type: "button",
    portalLabel: "IFSC Search button",
    runnerNote: "ValidationGroup='search'. Click AFTER typing IFSC. Wait for PostBack."
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
    runnerNote: "Only becomes available after IFSC search succeeds."
  },
  {
    csvColumn: "MICRCode",
    page: "bank",
    controlName: "ctl00$HomePageContent$txtmicr",
    controlId: "ctl00_HomePageContent_txtmicr",
    type: "numeric",
    maxLength: 20,
    portalLabel: "MICR Code (optional)"
  },
  {
    csvColumn: "AccountType",
    page: "bank",
    controlName: "ctl00$HomePageContent$ddlAccountType",
    controlId: "ctl00_HomePageContent_ddlAccountType",
    type: "select",
    required: true,
    portalLabel: "Account Type",
    runnerNote: "Codes: 2=Savings, 3=Current, 4=Others. Default 0 = invalid."
  },
  {
    csvColumn: "BankDocPath",
    page: "bank",
    controlName: "ctl00$HomePageContent$ctrlFISelectFile",
    controlId: "ctl00_HomePageContent_ctrlFISelectFile",
    type: "file",
    required: true,
    portalLabel: "Bank Document (cheque/passbook)",
    runnerNote: "PDF/JPG/JPEG, max 200KB. After selecting file, click btnUpload to upload, then wait for status message."
  },
  {
    csvColumn: "_internal_bank_submit",
    page: "bank",
    controlName: "ctl00$HomePageContent$btnsubmit",
    controlId: "ctl00_HomePageContent_btnsubmit",
    type: "button",
    portalLabel: "Submit (bank form)",
    runnerNote: "ValidationGroup='submit'. On success, navigates to nominee page."
  },
  {
    csvColumn: "NomineeName",
    page: "nominee",
    controlName: "ctl00$HomePageContent$ctrlTextUserName",
    controlId: "ctl00_HomePageContent_ctrlTextUserName",
    type: "text",
    maxLength: 45,
    required: true,
    portalLabel: "Nominee Name"
  },
  {
    csvColumn: "NomineeRelation",
    page: "nominee",
    controlName: "ctl00$HomePageContent$RelationShipWithIp",
    controlId: "ctl00_HomePageContent_RelationShipWithIp",
    type: "select",
    required: true,
    portalLabel: "Nominee Relationship",
    runnerNote: "Set CODE from RELATION_CODES (e.g. 7=Father). The page also auto-loads nominee address based on this."
  },
  {
    csvColumn: "NomineeShare",
    page: "nominee",
    controlName: "ctl00$HomePageContent$NomineeXmldata",
    controlId: "ctl00_HomePageContent_NomineeXmldata",
    type: "hidden",
    required: true,
    portalLabel: "Nominee Share %",
    runnerNote: "Share is part of the XML payload in NomineeXmldata. All nominees for an IP must sum to 100. Runner builds XML."
  },
  {
    csvColumn: "FamilyMemberName",
    page: "nominee",
    controlName: "ctl00$HomePageContent$Xmldatahidden",
    controlId: "ctl00_HomePageContent_Xmldatahidden",
    type: "hidden",
    portalLabel: "Family Member Name (for IP card)",
    runnerNote: "Optional but recommended. Part of Xmldatahidden XML payload along with FamilyMemberDOB + FamilyMemberRelation."
  },
  {
    csvColumn: "FamilyMemberDOB",
    page: "nominee",
    controlName: "ctl00$HomePageContent$Xmldatahidden",
    controlId: "ctl00_HomePageContent_Xmldatahidden",
    type: "hidden",
    portalLabel: "Family Member DOB",
    runnerNote: "Format dd/MM/yyyy. Part of Xmldatahidden XML."
  },
  {
    csvColumn: "FamilyMemberRelation",
    page: "nominee",
    controlName: "ctl00$HomePageContent$Xmldatahidden",
    controlId: "ctl00_HomePageContent_Xmldatahidden",
    type: "hidden",
    portalLabel: "Family Member Relation",
    runnerNote: "Use CODE from RELATION_CODES. Part of Xmldatahidden XML."
  },
  {
    csvColumn: "_internal_nominee_save",
    page: "nominee",
    controlName: "ctl00$HomePageContent$Save",
    controlId: "ctl00_HomePageContent_Save",
    type: "button",
    portalLabel: "Save (nominee form)",
    runnerNote: "On success, navigates to success page showing generated IP Number."
  }
];
var FIELDS_BY_PAGE = {
  entry: FIELD_MAP.filter((f) => f.page === "entry"),
  aadhaar: FIELD_MAP.filter((f) => f.page === "aadhaar"),
  main: FIELD_MAP.filter((f) => f.page === "main"),
  bank: FIELD_MAP.filter((f) => f.page === "bank"),
  nominee: FIELD_MAP.filter((f) => f.page === "nominee")
};
var CSV_COLUMNS = FIELD_MAP.filter((f) => !f.csvColumn.startsWith("_internal_")).map((f) => f.csvColumn);

// src/lib/esic/csv.ts
function parseCSV(text) {
  const clean = text.replace(/^\uFEFF/, "");
  const records = [];
  let field = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0;i < clean.length; i++) {
    const ch = clean[i];
    if (inQuotes) {
      if (ch === '"') {
        if (clean[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(field);
        field = "";
      } else if (ch === "\r") {} else if (ch === `
`) {
        row.push(field);
        records.push(row);
        row = [];
        field = "";
      } else {
        field += ch;
      }
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    records.push(row);
  }
  if (records.length && records[records.length - 1].length === 1 && records[records.length - 1][0] === "") {
    records.pop();
  }
  if (records.length === 0)
    return { headers: [], rows: [] };
  const headers = records[0].map((h) => h.trim());
  const rows = records.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (r[i] ?? "").trim();
    });
    return obj;
  });
  return { headers, rows };
}
function toCSV(rows, columns) {
  if (rows.length === 0)
    return "";
  const cols = columns ?? Object.keys(rows[0]);
  const escape = (v) => {
    const s = String(v ?? "");
    if (s.includes(",") || s.includes('"') || s.includes(`
`)) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  const lines = [cols.join(",")];
  for (const r of rows) {
    lines.push(cols.map((c) => escape(r[c] ?? "")).join(","));
  }
  return lines.join(`
`);
}
var TEMPLATE_COLUMNS = CSV_COLUMNS;
function templateCSV() {
  const sampleRows = [
    {
      EmpName: "KISHAN MOTIBHAI JADAV",
      RelationType: "Father",
      FatherOrHusbandName: "MOTIBHAI JADAV",
      DOB: "15/05/1983",
      MaritalStatus: "Married",
      Gender: "M",
      AadhaarNumber: "947000311535",
      PresentAddress: "B-104,XYZ Apartments,Vesu",
      PresentAddress2: "",
      PresentAddress3: "",
      PresentState: "Gujarat",
      PresentDistrict: "Surat",
      PinCode: "395007",
      MobileNo: "9898319329",
      Email: "",
      PermanentAddress: "",
      DispensaryType: "Dispensary",
      DispensaryState: "Gujarat",
      DispensaryDistrict: "Surat",
      DispensaryName: "Dindoli Dispensary",
      AppointmentDate: "15/10/2026",
      SMSLanguage: "Hindi",
      IFSCCode: "UBIN0567663",
      BankAccNo: "676602010005931",
      MICRCode: "",
      AccountType: "Savings",
      BankDocPath: "./docs/kishan_cheque.pdf",
      NomineeName: "MOTIBHAI JADAV",
      NomineeRelation: "Father",
      NomineeShare: "100",
      FamilyMemberName: "MOTIBHAI JADAV",
      FamilyMemberDOB: "01/01/1980",
      FamilyMemberRelation: "Father"
    },
    {
      EmpName: "SUNITA RAMESHBHAI PATEL",
      RelationType: "Husband",
      FatherOrHusbandName: "RAMESHBHAI PATEL",
      DOB: "22/08/1990",
      MaritalStatus: "Married",
      Gender: "F",
      AadhaarNumber: "520828311415",
      PresentAddress: "12,Shanti Society,Mumbai",
      PresentAddress2: "",
      PresentAddress3: "",
      PresentState: "Maharashtra",
      PresentDistrict: "Mumbai",
      PinCode: "400001",
      MobileNo: "9876543210",
      Email: "",
      PermanentAddress: "",
      DispensaryType: "Dispensary",
      DispensaryState: "Maharashtra",
      DispensaryDistrict: "Mumbai",
      DispensaryName: "Andheri Dispensary",
      AppointmentDate: "01/11/2026",
      SMSLanguage: "English",
      IFSCCode: "HDFC0001234",
      BankAccNo: "50100012345678",
      MICRCode: "",
      AccountType: "Savings",
      BankDocPath: "./docs/sunita_cheque.pdf",
      NomineeName: "RAMESHBHAI PATEL",
      NomineeRelation: "Spouse",
      NomineeShare: "100",
      FamilyMemberName: "",
      FamilyMemberDOB: "",
      FamilyMemberRelation: ""
    }
  ];
  return toCSV(sampleRows, TEMPLATE_COLUMNS);
}
function buildQueue(rows, establishmentCode) {
  const items = rows.filter((r) => r.status === "ready" || r.status === "warning").map((r) => ({
    rowIndex: r.rowIndex,
    status: r.status,
    normalized: r.normalized
  }));
  return {
    generatedAt: new Date().toISOString(),
    count: items.length,
    establishmentCode: establishmentCode ?? null,
    items
  };
}
// src/lib/esic/masters.ts
var STATE_CODES = {
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
  "22": "West Bengal"
};
var STATE_NAME_TO_CODE = Object.fromEntries(Object.entries(STATE_CODES).map(([code, name]) => [name.toLowerCase(), code]));
var RELATION_CODES = {
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
  "99": "Others"
};
var RELATION_ALIASES = {
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
  others: "99"
};
var RELATION_NAME_TO_CODE = {
  ...Object.fromEntries(Object.entries(RELATION_CODES).map(([code, name]) => [name.toLowerCase(), code])),
  ...RELATION_ALIASES
};
var RELATION_ACCEPTED_LABELS = [
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Others"
];
var MARITAL_CODES = {
  "1": "UnMarried",
  "2": "Married",
  "3": "Widow",
  "4": "Widower"
};
var MARITAL_NAME_TO_CODE = Object.fromEntries(Object.entries(MARITAL_CODES).map(([code, name]) => [name.toLowerCase(), code]));
var GENDER_VALUES = ["M", "F", "TG"];
var FATHER_HUSBAND_VALUES = ["Father", "Husband"];
var ACCOUNT_TYPE_CODES = {
  "2": "Savings",
  "3": "Current",
  "4": "Others"
};
var ACCOUNT_TYPE_NAME_TO_CODE = Object.fromEntries(Object.entries(ACCOUNT_TYPE_CODES).map(([code, name]) => [name.toLowerCase(), code]));
var BANK_DOC_CONSTRAINTS = {
  extensions: ["pdf", "jpg", "jpeg"],
  maxSizeBytes: 200 * 1024
};
var IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
var AADHAAR_REGEX = /^\d{12}$/;
var MOBILE_REGEX = /^[6-9]\d{9}$/;
var PIN_REGEX = /^\d{6}$/;
var DATE_FORMAT_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/;

// src/lib/esic/validate.ts
var VERHOEFF_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];
var VERHOEFF_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];
function verhoeffValidate(num) {
  if (!/^\d+$/.test(num))
    return false;
  let c = 0;
  const reversed = num.split("").reverse().join("");
  for (let i = 0;i < reversed.length; i++) {
    const digit = parseInt(reversed[i], 10);
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][digit]];
  }
  return c === 0;
}
function parseDate(ddmmyyyy) {
  const m = DATE_FORMAT_REGEX.exec(ddmmyyyy?.trim() ?? "");
  if (!m)
    return null;
  const [, dd, mm, yyyy] = m;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (d.getFullYear() !== Number(yyyy) || d.getMonth() !== Number(mm) - 1 || d.getDate() !== Number(dd)) {
    return null;
  }
  return d;
}
function today() {
  const d = new Date;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function ageBetween(dob, minYear, maxYear) {
  const now = today();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || m === 0 && now.getDate() < dob.getDate())
    age--;
  return age >= minYear && age <= maxYear;
}
function validateAadhaar(value) {
  const v = value?.trim() ?? "";
  if (!v)
    return null;
  if (!AADHAAR_REGEX.test(v))
    return "Aadhaar must be exactly 12 digits";
  if (!verhoeffValidate(v))
    return "Aadhaar checksum failed — likely a typo";
  return null;
}
function validateIFSC(value) {
  const v = value?.trim().toUpperCase() ?? "";
  if (!v)
    return "IFSC is required";
  if (!IFSC_REGEX.test(v))
    return "IFSC format must be AAAA0XXXXXX (e.g. BARB0VESUXX)";
  return null;
}
function validatePin(value) {
  const v = value?.trim() ?? "";
  if (!v)
    return "PIN code is required";
  if (!PIN_REGEX.test(v))
    return "PIN must be 6 digits";
  return null;
}
function validateMobile(value) {
  const v = value?.trim() ?? "";
  if (!v)
    return "Mobile number is required";
  if (!MOBILE_REGEX.test(v))
    return "Mobile must be 10 digits starting 6-9";
  return null;
}
function validateDate(value, label, opts = {}) {
  const v = value?.trim() ?? "";
  if (!v)
    return opts.required ? `${label} is required` : null;
  const d = parseDate(v);
  if (!d)
    return `${label} must be dd/MM/yyyy`;
  if (opts.notFuture && d > today())
    return `${label} cannot be in the future`;
  if (opts.minAge !== undefined && !ageBetween(d, opts.minAge, 150)) {
    return `${label} implies age below ${opts.minAge} — not allowed`;
  }
  if (opts.maxAge !== undefined && !ageBetween(d, 0, opts.maxAge)) {
    return `${label} implies age above ${opts.maxAge} — verify`;
  }
  return null;
}
function validateRow(rowIndex, raw) {
  const issues = [];
  const normalized = {};
  const get = (col) => (raw[col] ?? "").trim();
  const empName = get("EmpName");
  if (!empName) {
    issues.push({ column: "EmpName", severity: "error", message: "Employee name is required" });
  } else if (empName.length > 45) {
    issues.push({ column: "EmpName", severity: "error", message: "Name exceeds 45 chars (portal maxlength)" });
  } else if (!/^[A-Za-z .]+$/.test(empName)) {
    issues.push({ column: "EmpName", severity: "warning", message: "Name contains non-alpha characters — portal may reject" });
  }
  normalized.EmpName = empName.toUpperCase();
  const relationType = get("RelationType");
  if (!FATHER_HUSBAND_VALUES.includes(relationType)) {
    issues.push({
      column: "RelationType",
      severity: "error",
      message: `RelationType must be 'Father' or 'Husband' (got '${relationType}')`
    });
  }
  normalized.RelationType = relationType;
  const fhName = get("FatherOrHusbandName");
  if (!fhName) {
    issues.push({ column: "FatherOrHusbandName", severity: "error", message: "Father/Husband name is required" });
  } else if (fhName.length > 50) {
    issues.push({ column: "FatherOrHusbandName", severity: "error", message: "Exceeds 50 chars" });
  }
  normalized.FatherOrHusbandName = fhName.toUpperCase();
  const dobErr = validateDate(get("DOB"), "DOB", { required: true, notFuture: true, minAge: 14, maxAge: 100 });
  if (dobErr)
    issues.push({ column: "DOB", severity: dobErr.includes("verify") ? "warning" : "error", message: dobErr });
  normalized.DOB = get("DOB");
  const maritalRaw = get("MaritalStatus");
  const maritalCode = MARITAL_NAME_TO_CODE[maritalRaw.toLowerCase()];
  if (!maritalCode) {
    issues.push({
      column: "MaritalStatus",
      severity: "error",
      message: `MaritalStatus '${maritalRaw}' not recognized. Use: ${Object.values(MARITAL_NAME_TO_CODE).join("/")}`
    });
  }
  normalized.MaritalStatus = maritalCode ?? maritalRaw;
  const gender = get("Gender").toUpperCase();
  if (!GENDER_VALUES.includes(gender)) {
    issues.push({
      column: "Gender",
      severity: "error",
      message: `Gender must be M, F, or TG (got '${gender}')`
    });
  }
  normalized.Gender = gender;
  if (relationType === "Husband" && gender !== "F") {
    issues.push({
      column: "Gender",
      severity: "error",
      message: "When RelationType='Husband', Gender must be F (portal interlock)"
    });
  }
  if (relationType === "Husband" && maritalCode && !["2", "3"].includes(maritalCode)) {
    issues.push({
      column: "MaritalStatus",
      severity: "error",
      message: "When RelationType='Husband', MaritalStatus must be Married or Widow (portal interlock)"
    });
  }
  if (maritalCode === "3" && gender && gender !== "F") {
    issues.push({
      column: "Gender",
      severity: "error",
      message: "Widow implies Gender=F (portal interlock)"
    });
  }
  if (maritalCode === "4" && gender && gender !== "M") {
    issues.push({
      column: "Gender",
      severity: "error",
      message: "Widower implies Gender=M (portal interlock)"
    });
  }
  const presentAddress = get("PresentAddress");
  if (!presentAddress) {
    issues.push({ column: "PresentAddress", severity: "error", message: "Present address is required" });
  } else if (presentAddress.length > 50) {
    issues.push({ column: "PresentAddress", severity: "warning", message: "Address > 50 chars will be split; consider PresentAddress2/3 columns" });
  }
  normalized.PresentAddress = presentAddress;
  normalized.PresentAddress2 = get("PresentAddress2");
  normalized.PresentAddress3 = get("PresentAddress3");
  const pinErr = validatePin(get("PinCode"));
  if (pinErr)
    issues.push({ column: "PinCode", severity: "error", message: pinErr });
  normalized.PinCode = get("PinCode");
  const mobileErr = validateMobile(get("MobileNo"));
  if (mobileErr)
    issues.push({ column: "MobileNo", severity: "error", message: mobileErr });
  normalized.MobileNo = get("MobileNo");
  const email = get("Email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    issues.push({ column: "Email", severity: "warning", message: "Email format looks invalid" });
  }
  normalized.Email = email;
  const presentStateRaw = get("PresentState");
  const presentStateCode = STATE_NAME_TO_CODE[presentStateRaw.toLowerCase()];
  if (!presentStateCode) {
    issues.push({
      column: "PresentState",
      severity: "error",
      message: `PresentState '${presentStateRaw}' not recognized. Use state names like Gujarat, Maharashtra, etc.`
    });
  }
  normalized.PresentState = presentStateRaw;
  if (!get("PresentDistrict")) {
    issues.push({ column: "PresentDistrict", severity: "error", message: "PresentDistrict is required" });
  }
  normalized.PresentDistrict = get("PresentDistrict");
  const permanentAddress = get("PermanentAddress");
  const copyFlag = permanentAddress ? "No" : "Yes";
  normalized.CopyPresentToPermanent = copyFlag;
  normalized.PermanentAddress = permanentAddress;
  const dispensaryType = get("DispensaryType") || "Dispensary";
  if (!["Dispensary", "IMP", "EMud"].includes(dispensaryType)) {
    issues.push({
      column: "DispensaryType",
      severity: "error",
      message: `DispensaryType must be 'Dispensary', 'IMP', or 'EMud' (got '${dispensaryType}')`
    });
  }
  normalized.DispensaryType = dispensaryType;
  const dispStateRaw = get("DispensaryState");
  const dispStateCode = STATE_NAME_TO_CODE[dispStateRaw.toLowerCase()];
  if (!dispStateCode) {
    issues.push({
      column: "DispensaryState",
      severity: "error",
      message: `DispensaryState '${dispStateRaw}' not recognized`
    });
  }
  normalized.DispensaryState = dispStateCode ?? dispStateRaw;
  if (!get("DispensaryDistrict")) {
    issues.push({ column: "DispensaryDistrict", severity: "error", message: "DispensaryDistrict is required" });
  }
  normalized.DispensaryDistrict = get("DispensaryDistrict");
  if (!get("DispensaryName")) {
    issues.push({ column: "DispensaryName", severity: "error", message: "DispensaryName is required" });
  }
  normalized.DispensaryName = get("DispensaryName");
  const doaErr = validateDate(get("AppointmentDate"), "AppointmentDate", {
    required: true,
    notFuture: false
  });
  if (doaErr)
    issues.push({ column: "AppointmentDate", severity: "error", message: doaErr });
  normalized.AppointmentDate = get("AppointmentDate");
  const dobDate = parseDate(get("DOB"));
  const doaDate = parseDate(get("AppointmentDate"));
  if (dobDate && doaDate) {
    if (doaDate <= dobDate) {
      issues.push({
        column: "AppointmentDate",
        severity: "error",
        message: "AppointmentDate must be after DOB"
      });
    } else if (doaDate > today()) {
      issues.push({
        column: "AppointmentDate",
        severity: "warning",
        message: "Future AppointmentDate — portal will flag for RO/SRO verification"
      });
    } else {
      const diffDays = Math.floor((today().getTime() - doaDate.getTime()) / 86400000);
      if (diffDays > 10) {
        issues.push({
          column: "AppointmentDate",
          severity: "warning",
          message: `AppointmentDate is ${diffDays} days old — portal requires RO/SRO confirmation per Regulation 10B`
        });
      }
    }
  }
  const smsLang = get("SMSLanguage");
  if (!smsLang) {
    issues.push({ column: "SMSLanguage", severity: "error", message: "SMSLanguage is required" });
  }
  normalized.SMSLanguage = smsLang;
  const aadhaar = get("AadhaarNumber");
  if (!aadhaar) {
    issues.push({
      column: "AadhaarNumber",
      severity: "error",
      message: "AadhaarNumber is required — the ESIC portal asks for it before the main form"
    });
  } else {
    const err = validateAadhaar(aadhaar);
    if (err)
      issues.push({ column: "AadhaarNumber", severity: "error", message: err });
    normalized.AadhaarNumber = aadhaar;
  }
  const ifscErr = validateIFSC(get("IFSCCode"));
  if (ifscErr)
    issues.push({ column: "IFSCCode", severity: "error", message: ifscErr });
  normalized.IFSCCode = get("IFSCCode").toUpperCase();
  const bankAccNo = get("BankAccNo");
  if (!bankAccNo) {
    issues.push({ column: "BankAccNo", severity: "error", message: "BankAccNo is required" });
  } else if (!/^\d{6,20}$/.test(bankAccNo)) {
    issues.push({ column: "BankAccNo", severity: "error", message: "BankAccNo must be 6-20 digits" });
  }
  normalized.BankAccNo = bankAccNo;
  const micr = get("MICRCode");
  if (micr && !/^\d{9}$/.test(micr)) {
    issues.push({ column: "MICRCode", severity: "warning", message: "MICR is conventionally 9 digits" });
  }
  normalized.MICRCode = micr;
  const accountTypeRaw = get("AccountType");
  const accountTypeCode = ACCOUNT_TYPE_NAME_TO_CODE[accountTypeRaw.toLowerCase()];
  if (!accountTypeCode) {
    issues.push({
      column: "AccountType",
      severity: "error",
      message: `AccountType '${accountTypeRaw}' not recognized. Use: Savings, Current, or Others`
    });
  }
  normalized.AccountType = accountTypeCode ?? accountTypeRaw;
  const bankDocPath = get("BankDocPath");
  if (!bankDocPath) {
    issues.push({
      column: "BankDocPath",
      severity: "warning",
      message: "BankDocPath missing — bank page requires a cheque/passbook PDF/JPG ≤200KB. Add path before running."
    });
  } else if (!/\.(pdf|jpe?g)$/i.test(bankDocPath)) {
    issues.push({
      column: "BankDocPath",
      severity: "error",
      message: "Bank document must be .pdf, .jpg, or .jpeg"
    });
  }
  normalized.BankDocPath = bankDocPath;
  const nomineeName = get("NomineeName");
  if (!nomineeName) {
    issues.push({ column: "NomineeName", severity: "error", message: "NomineeName is required" });
  } else if (nomineeName.length > 45) {
    issues.push({ column: "NomineeName", severity: "error", message: "NomineeName exceeds 45 chars" });
  }
  normalized.NomineeName = nomineeName.toUpperCase();
  const nomineeRelRaw = get("NomineeRelation");
  const nomineeRelCode = RELATION_NAME_TO_CODE[nomineeRelRaw.toLowerCase()];
  if (!nomineeRelCode) {
    issues.push({
      column: "NomineeRelation",
      severity: "error",
      message: `NomineeRelation '${nomineeRelRaw}' not recognized. Use one of: ${RELATION_ACCEPTED_LABELS.join(", ")}`
    });
  }
  normalized.NomineeRelation = nomineeRelCode ?? nomineeRelRaw;
  const shareStr = get("NomineeShare");
  const shareNum = Number(shareStr);
  if (!shareStr) {
    issues.push({ column: "NomineeShare", severity: "error", message: "NomineeShare is required" });
  } else if (!Number.isInteger(shareNum) || shareNum < 1 || shareNum > 100) {
    issues.push({ column: "NomineeShare", severity: "error", message: "NomineeShare must be integer 1-100" });
  }
  normalized.NomineeShare = shareStr;
  const fmName = get("FamilyMemberName");
  const fmDob = get("FamilyMemberDOB");
  const fmRel = get("FamilyMemberRelation");
  if (fmName || fmDob || fmRel) {
    if (!fmName) {
      issues.push({ column: "FamilyMemberName", severity: "error", message: "FamilyMemberName required when other family fields present" });
    }
    const fmDobErr = validateDate(fmDob, "FamilyMemberDOB", { required: true, notFuture: true });
    if (fmDobErr)
      issues.push({ column: "FamilyMemberDOB", severity: "error", message: fmDobErr });
    const fmRelCode = RELATION_NAME_TO_CODE[fmRel.toLowerCase()];
    if (!fmRelCode) {
      issues.push({
        column: "FamilyMemberRelation",
        severity: "error",
        message: `FamilyMemberRelation '${fmRel}' not recognized. Use one of: ${RELATION_ACCEPTED_LABELS.join(", ")}`
      });
    }
    normalized.FamilyMemberName = fmName.toUpperCase();
    normalized.FamilyMemberDOB = fmDob;
    normalized.FamilyMemberRelation = fmRelCode ?? fmRel;
  }
  const hasError = issues.some((i) => i.severity === "error");
  const hasWarning = issues.some((i) => i.severity === "warning");
  const status = hasError ? "error" : hasWarning ? "warning" : "ready";
  return { rowIndex, raw, normalized, issues, status };
}
function validateRows(rows) {
  return rows.map((r, i) => validateRow(i + 1, r));
}
function summarize(rows) {
  return {
    total: rows.length,
    ready: rows.filter((r) => r.status === "ready").length,
    warning: rows.filter((r) => r.status === "warning").length,
    error: rows.filter((r) => r.status === "error").length
  };
}
export {
  validateRows,
  toCSV,
  templateCSV,
  summarize,
  parseCSV,
  buildQueue,
  CSV_COLUMNS
};
