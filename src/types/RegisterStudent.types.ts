import { z } from "zod";
import universitiesArray from "./allUniversityArray";
// const passwordREGEX = /^(?=.*[A-Za-z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
//  const validateSessionDates = (start: Date, end: Date) => {
//   const nowYear = new Date().getFullYear();
//   const startYear = start.getFullYear();
//   const endYear = end.getFullYear();

//   return startYear <= endYear && startYear <= nowYear;
// };

export const DegreeEnum = z.enum([
    "BS Computer Science",
    "BS Software Engineering",
    "BS Information Technology",
    "BS Data Science",
    "BS Artificial Intelligence",
    "BS Cyber Security",
    "BS Computer Engineering",
    "BS Information Systems",
    "MS Computer Science",
    "MS Software Engineering",
    "MS Information Security",
    "MS Data Science",
    "MS Artificial Intelligence",
    "MS Computer Engineering",
    "PhD Computer Science",
    "PhD Software Engineering",
    "Engineering",
    "Medical Sciences",
    "Business Administration",
    "Economics",
    "Social Sciences",
    "Natural Sciences",
    "Humanities",
    "Law",
    "Education",
    "Media Studies",
    "Art and Design",
    "Mathematics",
    "Others"
]);

const usernameSchema = z
    .string()
    .min(3, { message: "This field is required and must have minimum 3 letters." })
    .max(100, { message: "This field cannot have more than 100 Characters." });

const emailSchema = z.string().email({ message: "Not Valid Email Format!" });
const passwordSchema = z
    .string()
    .min(1, { message: "Password should be at least 8 characters long" })
// .refine((pass) => passwordREGEX.test(pass), {
//   message:
//     "At least 8 characters long. Must contain at least one uppercase letter, at least one lowercase letter, at least one digit, and at least one special character (e.g., !@#$%^&*).",
// })

// const defaultFile = new File([], "default.jpg"); // Default empty file



const schoolSchema = z.object({
    level: z.literal("School/Collage"),
    schoolName: z.string().min(1, "School/Collage name is required"),
});

const bachelorSchema = z.object({
    level: z.literal("Bachelor"),
    university: z.enum(universitiesArray as [string, ...string[]], {
        required_error: "University is required",
    }),
    customUniversity: z.string().optional(),
    degree: z.string().min(1, "You must select a degree"),
    customDegree: z.string().optional(),

    sessionStart: z.string().regex(/^(19|20)\d{2}$/, "Start year must be a valid 4-digit year"),
    sessionEnd: z.string().regex(/^(19|20)\d{2}$/, "End year must be a valid 4-digit year"),

});

const masterSchema = z.object({
    level: z.literal("Master"),
    university: z.enum(universitiesArray as [string, ...string[]], {
        required_error: "University is required",
    }),
    customUniversity: z.string().optional(),
    degree: z.string().min(1, "You must select a degree"),
    customDegree: z.string().optional(),

    sessionStart: z.string().regex(/^(19|20)\d{2}$/, "Start year must be a valid 4-digit year"),
    sessionEnd: z.string().regex(/^(19|20)\d{2}$/, "End year must be a valid 4-digit year"),


});

const phdSchema = z.object({
    level: z.literal("Phd"),
    university: z.enum(universitiesArray as [string, ...string[]], {
        required_error: "University is required",
    }),
    customUniversity: z.string().optional(),
    degree: z.string().min(1, "You must select a degree"),
    customDegree: z.string().optional(),

    sessionStart: z.string().regex(/^(19|20)\d{2}$/, "Start year must be a valid 4-digit year"),
    sessionEnd: z.string().regex(/^(19|20)\d{2}$/, "End year must be a valid 4-digit year"),


});
const baseUnion = z.discriminatedUnion("level", [
    schoolSchema,
    bachelorSchema,
    masterSchema,
    phdSchema,
]);


const cnicSchema = z
    .string()
    .regex(/^\d{5}-\d{7}-\d{1}$/, "CNIC must be in 12345-1234567-1 format");




const phoneSchema = z
    .string()
    .regex(/^03[0-9]{9}$/, "Phone number must be 11 digits and start with 03");


export const simplifiedExpertiseSchema = z.array(
    z.object({
        category: z.enum(
            [
                "Programming",
                "Cyber Security",
                "Data Science",
                "Cloud",
                "AI/ML",
                "DevOps",
                "Game Dev",
                "UI/UX",
                "Blockchain",
                "Others"
            ] as const,
            {
                required_error: "Category is required",
            }
        ),
        techStack: z
            .string()
            .trim()
            .min(1, "Please enter a tech stack or tool."),
        level: z.enum(["Beginner", "Intermediate", "Expert"], {
            required_error: "Please select a skill level",
        }),
    })
)
    .min(1, "At least one expertise is required.")
    .refine((items) => {
        const seen = new Set();

        for (const item of items) {
            const key = `${item.category.toLowerCase()}_${item.techStack.trim().toLowerCase()}`;

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);
        }

        return true;
    }, {
        message: "Each category + tech stack combination must be unique.",
    });

const educationSchema = baseUnion.superRefine((data, ctx) => {
    // Validate custom university
    if ("university" in data && data.university === "Others" && !data.customUniversity?.trim()) {
        ctx.addIssue({
            path: ["customUniversity"],
            code: z.ZodIssueCode.custom,
            message: "Please specify the university name.",
        });
    }

    // Validate custom degree
    if ("degree" in data && data.degree === "Others" && !data.customDegree?.trim()) {
        ctx.addIssue({
            path: ["customDegree"],
            code: z.ZodIssueCode.custom,
            message: "Please specify the degree name.",
        });
    }

    // Validate session date order
    if (
        "sessionStart" in data &&
        "sessionEnd" in data &&
        data.sessionStart > data.sessionEnd
    ) {
        ctx.addIssue({
            path: ["sessionStart"],
            code: z.ZodIssueCode.custom,
            message: "Session start date cannot be after session end date.",
        });
    }
});


export const certificationsSchema = z
    .array(z.object({
        name: z.string().min(1, "Certification name cannot be empty, click on remove icon if you do not have any.")
    }))

export const createUserSchema = z.object({
    firstName: usernameSchema,
    lastName: usernameSchema,
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    phone: phoneSchema,
    cnic: cnicSchema,
    education: educationSchema,
    expertise: simplifiedExpertiseSchema,
    certifications: certificationsSchema.optional(),
    gender: z.enum(["Male", "Female", "Prefer not to say"], {
        required_error: "Gender is required",
        invalid_type_error: 'Gender must be either "Male", "Female", or "Prefer not to say"',
    }),
});



export type CreateUserType = z.infer<typeof createUserSchema>;
export const registerDefaultValues: CreateUserType = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    cnic: "",
    phone: "",
    education: { level: "School/Collage", schoolName: "" },
    expertise: [
        { category: "Cyber Security", techStack: "Kali Linux", level: "Expert" },
    ],
    certifications: [{ name: "" }], // Array of objects instead of strings
    gender: "Male",
};


export const bsDegreesInPakistan = [
    // 🔐 Core Computer & IT Fields
    "BS Computer Science",
    "BS Software Engineering",
    "BS Information Technology",
    "BS Artificial Intelligence",
    "BS Data Science",
    "BS Cyber Security",
    "BS Bioinformatics",
    "BS Computer Engineering",
    "BS Game Design and Development",
    "BS Robotics",
    "BS Digital Forensics",
    "BS Internet of Things (IoT)",

    // 📊 Supporting Tech/Math Fields
    "BS Statistics",
    "BS Mathematics",
    "BS Electronics",

    // 📚 Other Fields (only field names)
    "Physics",
    "Chemistry",
    "Biology",
    "Biotechnology",
    "Zoology",
    "Botany",
    "Microbiology",
    "Environmental Science",
    "Geology",
    "Nanotechnology",
    "Medical Lab Technology",
    "Nursing",
    "Radiology",
    "Anesthesia Technology",
    "Optometry",
    "Human Nutrition",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Textile Engineering",
    "Biomedical Engineering",
    "Business Administration",
    "Accounting & Finance",
    "Economics",
    "Public Administration",
    "Sociology",
    "Psychology",
    "Political Science",
    "International Relations",
    "Mass Communication",
    "Islamic Studies",
    "English Literature",
    "Fine Arts",
    "Graphic Design",
    "Interior Design",
    "Fashion Design",
    "Film & TV",
    "Education",
    "Library Science",
    "Criminology",
    "Tourism & Hospitality",
    "Forensic Science",
    "Sports Sciences",
    "Agriculture",
    "Defense & Strategic Studies",
    "Others"
];

export const msDegreesInPakistan = [
    // 💻 Core Computer & IT Fields
    "MS Computer Science",
    "MS Software Engineering",
    "MS Information Technology",
    "MS Artificial Intelligence",
    "MS Data Science",
    "MS Cyber Security",
    "MS Computer Engineering",
    "MS Robotics",
    "MS Bioinformatics",
    "MS Information Security",
    "MS Data Engineering",
    "MS Big Data Analytics",
    "MS Internet of Things (IoT)",

    // 📊 Supporting Tech Fields
    "MS Mathematics",
    "MS Statistics",
    "MS Electronics",

    // 📚 Other Fields (field names only)
    "Physics",
    "Chemistry",
    "Biology",
    "Zoology",
    "Botany",
    "Biotechnology",
    "Microbiology",
    "Environmental Science",
    "Geology",
    "Nanotechnology",
    "Medical Lab Technology",
    "Radiology",
    "Nursing",
    "Human Nutrition",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Industrial Engineering",
    "Textile Engineering",
    "Biomedical Engineering",
    "Business Administration",
    "Accounting & Finance",
    "Economics",
    "Public Administration",
    "Sociology",
    "Psychology",
    "International Relations",
    "Political Science",
    "Education",
    "Mass Communication",
    "Islamic Studies",
    "English Literature",
    "Fine Arts",
    "Graphic Design",
    "Criminology",
    "Forensic Science",
    "Tourism & Hospitality",
    "Library Science",
    "Development Studies",
    "Defense & Strategic Studies",
    "Others"
];

export const phdDegreesInPakistan = [
    // 🧠 Core Computer & IT Fields
    "PhD Computer Science",
    "PhD Software Engineering",
    "PhD Information Technology",
    "PhD Artificial Intelligence",
    "PhD Data Science",
    "PhD Cyber Security",
    "PhD Computer Engineering",
    "PhD Bioinformatics",
    "PhD Robotics",
    "PhD Information Security",

    // 📊 Supporting Tech Fields
    "PhD Mathematics",
    "PhD Statistics",
    "PhD Electronics",

    // 📚 Other Fields (field names only)
    "Physics",
    "Chemistry",
    "Biology",
    "Botany",
    "Zoology",
    "Biotechnology",
    "Microbiology",
    "Environmental Science",
    "Geology",
    "Nanotechnology",
    "Medical Lab Technology",
    "Radiology",
    "Nutrition",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biomedical Engineering",
    "Business Administration",
    "Accounting & Finance",
    "Economics",
    "Public Administration",
    "Sociology",
    "Psychology",
    "Political Science",
    "International Relations",
    "Mass Communication",
    "Islamic Studies",
    "Education",
    "English Literature",
    "Fine Arts",
    "Criminology",
    "Forensic Science",
    "Tourism & Hospitality",
    "Defense & Strategic Studies",
    "Others"
];



export const allDegreesArray = [

    "BS Computer Science",
    "BS Software Engineering",
    "BS Information Technology",
    "BS Data Science",
    "BS Artificial Intelligence",
    "BS Cyber Security",
    "BS Computer Engineering",
    "BS Information Systems",
    "MS Computer Science",
    "MS Software Engineering",
    "MS Information Security",
    "MS Data Science",
    "MS Artificial Intelligence",
    "MS Computer Engineering",
    "PhD Computer Science",
    "PhD Software Engineering",

    "Engineering",
    "Medical Sciences",
    "Business Administration",
    "Economics",
    "Social Sciences",
    "Natural Sciences",
    "Humanities",
    "Law",
    "Education",
    "Media Studies",
    "Art and Design",
    "Mathematics",
    "Others"
]

export const educationLevelOptions = [
    "School/Collage",
    "Bachelor",
    "Master",
    "Phd"
]



