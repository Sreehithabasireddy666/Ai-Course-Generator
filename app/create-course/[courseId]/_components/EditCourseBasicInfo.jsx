//"use client"
import React, { useEffect } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../../@/components/ui/dialog'
import { HiPaintBrush, HiPencilSquare } from 'react-icons/hi2'
import { Textarea } from '../../../../@/components/ui/textarea';
import { Input } from '../../../../@/components/ui/input';
import { Button } from '../../../../@/components/ui/button';
import { useState } from 'react';
import { CourseList } from '../../../../configs/schema';
import { db } from '../../../../configs/db';
import { eq } from 'drizzle-orm';

function EditCourseBasicInfo({course,refreshData}) {
  
  const[name,setName]=useState();
  const[description,setDescription] =useState();

  useEffect(() => {
    if (course?.courseOutput) {
      setName(course.courseOutput["Course Name"] || "");
      setDescription(course.courseOutput.Description || "");
    }
  }, [course]);

  const onUpdateHandler=async()=>{
    course.courseOutput["Course Name"]=name;
    course.courseOutput.Description=description;
    const result=await db.update(CourseList).set({
      courseOutput:course?.courseOutput
    }).where(eq(CourseList?.id,course?.id))
    .returning({id:CourseList.id});
    console.log(result);
    refreshData(true)
  }

  return (
    <Dialog>
        <DialogTrigger><HiPaintBrush/></DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit Course Title & Description</DialogTitle>
            <DialogDescription>
               <div className='mt-3'>
                <label>Course Title</label>
                <Input defaultValue={course?.courseOutput?.["Course Name"]}
                onChange={(event)=>setName(event?.target.value)}/>
               </div>
               <div>
                <label> Description</label>
                <Textarea className="h-40" defaultValue={course?.courseOutput?.Description}
                onChange={(event)=>setDescription(event?.target.value)}/>
               </div>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button onClick={onUpdateHandler}>Update</Button>
              </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default EditCourseBasicInfo