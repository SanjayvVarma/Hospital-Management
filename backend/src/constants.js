const DOCTOR_DEPARTMENT = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Gynecology",
    "Dermatology",
    "Psychiatry",
    "Oncology",
    "Radiology",
    "General Medicine",
    "ENT",
    "Urology",
    "Gastroenterology",
    "Anesthesiology",
    "Nephrology",
    "Endocrinology",
    "Rheumatology",
    "Pulmonology",
    "Hematology",
    "Pathology",
    "Emergency Medicine",
    "Family Medicine",
    "Infectious Disease",
    "Sports Medicine",
    "Rehabilitation",
    "Sexology",
    "Plastic Surgery",
    "Dentistry",
    "Ophthalmology"
];


const JWT_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'None' : "Lax"
}

export { DOCTOR_DEPARTMENT, JWT_COOKIE_OPTIONS };