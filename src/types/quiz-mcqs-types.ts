import z from "zod"

const optionsSchema=z.array(z.string().min(1,"Option cannot be empty.")).length(4,"Exactly 4 options are required")



export const createMCQSchema=z.object({
    questions:z.array(z.object({
        questionId:z.string(),
        question_text:z.string().min(1,"Question's text is required"),
        options:optionsSchema,
        correctAnswer:z.string().min(0).max(3),
        explanation: z.string().optional(),
    })).nonempty("At least one question is required"),
})

export type CreateQuizMCQFormType=z.infer<typeof createMCQSchema>

export const CreateMCQQuizFormDefaultValues:CreateQuizMCQFormType={
    questions:[{
        questionId:Date.now().toString(),
        question_text:"",
        options:["","","",""],
        correctAnswer:"1",
        explanation:""

    }]
}
