import z from "zod";

export const CreateLabFormSchema = z.object({
  title: z.string().min(1, "Lab title is required"),
  description: z.string().min(1, "Lab description is required"),
  timelimit: z.string()
      .refine(
        (val) => !isNaN(Number(val)),
        "Time limit must be a valid number (in minutes)"
      )
      .refine(
        (val) => Number(val) > 0,
        "Time limit must be greater than 0"
      )
      .refine(
        (val) => Number(Number(val).toFixed(1)) === Number(val),
        "Time limit can only have up to 1 decimal place"
      ),
  activationStatus: z.enum(["Active", "Inactive"]),
});

export type CreateLabFormType = z.infer<typeof CreateLabFormSchema>;

export const CreateLabFormDefaultValues: CreateLabFormType = {
  title: "",
  description: "",
  timelimit: '0',
  activationStatus: "Inactive",
};

export const CreateLabChallengeFormSchema = z.object({
  challenge_text: z.string().min(1, "Challenge prompt is required"),
  description: z.string().min(1, "Challenge description is required"),
  answer_string_type: z.enum(["Code", "Text", "Flag"]),
  max_score: z.string()
      .refine(
        (val) => !isNaN(Number(val)),
        "Total score must be a valid number"
      )
      .refine(
        (val) => Number(val) >= 0,
        "Total score cannot be negative"
      )
      .refine(
        (val) => Number(val) <= 999999.99,
        "Total score cannot exceed 999,999.99"
      )
      .refine(
        (val) => Number(Number(val).toFixed(2)) === Number(val),
        "Total score can only have up to 2 decimal places"
      ),
  correct_solution: z.string().min(1, "Expected solution is required"),
  sample_input: z.string().optional(),
  
});

export type CreateLabChallengeFormType = z.infer<typeof CreateLabChallengeFormSchema>;

export const CreateLabChallengeFormDefaultValues: CreateLabChallengeFormType = {
  challenge_text: "",
  description: "",
  answer_string_type: "Code",
  max_score: "",
  correct_solution: "",
  sample_input: "",
  
};
export const CreateLabWithChallengesSchema = z.object({
  lab: CreateLabFormSchema,
  challenges: z
    .array(CreateLabChallengeFormSchema)
    .nonempty("At least one challenge is required"),
});

export type CreateLabWithChallengesFormType = z.infer<typeof CreateLabWithChallengesSchema>;

export const CreateLabWithChallengesFormDefaultValues: CreateLabWithChallengesFormType = {
  lab: CreateLabFormDefaultValues,
  challenges: [
    {
      challenge_text: "",
      description: "",
      answer_string_type: "Code",
      max_score: "",
      correct_solution: "",
      sample_input: "", 
    },
  ],
};
