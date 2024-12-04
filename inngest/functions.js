import { db } from "@/configs/db";
import { inngest } from "./client";
import { Chapter_Notes_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { GenerateStudyTypeContentAiModel } from "@/configs/AIModel";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);
export const CreateNewUser = inngest.createFunction(
    { id: 'create-user' },
    { event: 'user.create' },
    async ({ event, step }) => {
        const { user } = event.data;
        //Get Event Data
        const result = await step.run('Check user and create user if Not in DB', async () => {
            //Check if user already exist

            const result = await db.select().from(USER_TABLE)
                .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))

            console.log(result);
            if (result?.length == 0) {
                //If not add to the DB
                const userResp = await db.insert(USER_TABLE).values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress
                }).returning({ id: USER_TABLE.id })
                return userResp;
            }
            return result;
        })
        return 'Success';

    }
    //Step is to send welcome mail notification

    //Step is to send mail notification after 3 days user join
);

export const GenerateNotes = inngest.createFunction(
    { id: 'generate-course' },
    { event: 'notes.generate' },
    async ({ event, step }) => {
        const { course } = event.data; //All record info

        //Generate Notes for Each
        const notesResult = await step.run('Generate Chapter Notes', async () => {
            const Chapters = course?.courseLayout?.chapters;
            let index = 0;
            Chapters.forEach(async (chapter) => {
                const PROMPT = 'Generate exam material detail content for each chapter,Make sure to include all points in the content,make sure to give content in HTML format(Do not Add HTML,Head,Body,title tag),The chapter:' + JSON.stringyfy(chapter);
                const result = await generateNotesAiModel.sendMessage(PROMPT);
                const aiResp = result.response.text();

                await db.insert(Chapter_Notes_TABLE).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    notes: aiResp,
                })
                index = index + 1;

            })
            return 'Completed';
        });

        //Update Status to Ready
        const updateCourseStatusResult = await step.run('Update Course Status to Ready', async () => {
            const result = await db.update(STUDY_MATERIAL_TABLE).set({
                Status: 'Ready'
            }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId))
            return 'Success';
        });



    }
)

//used to generate flashcard, quiz, question answer
export const GenerateStudyTypeContent = inngest.createFunction(
    { id: 'Generate Study Type Content' },
    { event: 'studyType.content' },

    async ({ event, step }) => {
        const { studyType, prompt, courseId ,recordId} = event.data;

        const FlashcardAiResult = await step.run('Generating Flashcard using AI', async () => {
            const result = await GenerateStudyTypeContentAiModel.sendMessage(prompt);
            const AIResult = JSON.parse(result.response.text());
            return AIResult;
        })

        //Save the result
        const DbResult = await step.run('Save Result to DB', async () => {
            const result = await db.update(STUDY_TYPE_CONTENT_TABLE)
                .set({
                    content: FlashcardAiResult,
                    status:'Ready'
                }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
            return 'Data Inserted'

        })
    }

)
//Generate exam material detail content for each chapter,Make sure to include all points in the content,\
// make sure to gice content in HTML format(Do not Add HTML,Head,Body,title tag),The
//chapter