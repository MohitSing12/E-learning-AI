import { db } from "@/configs/db";
import { Chapter_Notes_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { courseId, studyType } = await req.json();

    if (studyType == 'ALL') {

        const notes = await db.select().from(Chapter_Notes_TABLE)
            .where(eq(Chapter_Notes_TABLE?.courseId, courseId));

        //Get the All other study type records

        const contentList=await db.selec().from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId));
        const result = {
            notes: notes,
            flashcard: contentList?.find(item=>item.type=='Flashcard'),
            quiz: null,
            qa: null
        }
        return NextResponse.json(result);
    }
    else if(studyType=='notes')
    {
        const notes = await db.select().from(Chapter_Notes_TABLE)
            .where(eq(Chapter_Notes_TABLE?.courseId, courseId));

            return NextResponse.json(notes);
    }
}