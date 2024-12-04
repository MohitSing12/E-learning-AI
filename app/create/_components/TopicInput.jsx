
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function TopicInput({setTopic, setDifficultyLevel}) {

    return (

        <div className='mt-10 w-full'>
            <h2>Enter the topic or paste the content for which you want to generate content </h2>
            <Textarea placeholder='Start writing here'
                className="mt-02 w-full"  onChange={(event) => setTopic(event.target.value)}/>
            {/* { onChange={(event) => setTopic(event.target.value)}} */}
          

            <h2 className='mt-5 mb-3'>Select the difficulty level</h2>
            <Select  onValueChange={(value) => setDifficultyLevel(value)}>
            {/* onValueChange={(value) => setDifficultyLevel(value)} */}
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Easy</SelectItem>
                    <SelectItem value="dark">Moderate</SelectItem>
                    <SelectItem value="system">Hard</SelectItem>
                </SelectContent>
            </Select>


        </div>
    )
}

export default TopicInput