"use client"
import { Chapters, CourseList } from '../../../configs/schema'
import React, { useEffect, useState } from 'react'
import { db } from '../../../configs/db'
import { eq, and } from 'drizzle-orm' // Add 'and' to the import
import { useUser } from '@clerk/nextjs'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'
import { Button } from '../../../components/ui/button'
import { GenerateChapterContent_AI } from '../../../configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '../../../configs/service'
import { useRouter } from 'next/navigation'

function CourseLayout({params}) {
    const unwrappedParams = React.use(params);
    const {user} = useUser();
    const [course, setCourse] = useState([]);
    const [loading,setLoading]=useState(false);
    const router = useRouter();
    
    useEffect(() => {
        params && GetCourse();
    }, [params, user])
    
    const GetCourse = async () => {
        try {
            const result = await db.select().from(CourseList)
                .where(and(
                    eq(CourseList.courseId, unwrappedParams.courseId),
                    eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
                ));
            setCourse(result[0]);
            console.log(result);
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };

    const GenerateChapterContent=()=>{
        setLoading(true);
        const chapters=course?.courseOutput?.Chapters;
        chapters.forEach(async(chapter,index)=>{
        const PROMPT = `Explain the concept in Detail on Topic: ${course?.courseOutput?.["Course Name"]}, Chapter: ${chapter?.["Chapter Name"]} ,in JSON Format with list of array with field as title,explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable`;
            console.log(PROMPT)
            //if(index==0){
                try{
                    let videoId='';
                    //generate video url
                    service.getVideos(course?.name+':'+chapter?.["Chapter Name"]).then(resp=>{
                        console.log(resp);
                        videoId=resp[0]?.id?.videoId
                    })
                    //generate chapter content
                    const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
                    console.log(result?.response?.text());
                    const content=JSON.parse(result?.response?.text())
                    
                    
                    //save chapter content+videourl
                    await db.insert(Chapters).values({
                        chapterId:index,
                        courseId:course?.courseId,
                        content:content,
                        videoId:videoId
                    })
                    setLoading(false);

                }catch(e){
                    setLoading(false);
                    console.log(e);
                }
                await db.update(CourseList).set({
                    publish:true
                })
                router.replace('/create-course/'+course?.courseId+'/finish')
            //}
        }
    )
    }

    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44'>
            <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
            <LoadingDialog loading={loading}/>
            {/**
             * BasicInfo*/}
            <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
            {/**Course Detail */}
            <CourseDetail course={course}/>
            {/**List of Lesson */}
            <ChapterList course={course}/>
            {/**Button to generate layout */}
            <Button onClick ={GenerateChapterContent} className={"my-10"}>Generate Course Content</Button>
        </div>
    )
}

export default CourseLayout