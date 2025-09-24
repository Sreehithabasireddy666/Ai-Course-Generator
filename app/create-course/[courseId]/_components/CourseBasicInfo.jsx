import React, { useState } from 'react'
import Image from 'next/image'
import { HiOutlinePuzzlePiece } from 'react-icons/hi2'
import { Button } from '../../../../components/ui/button'
import EditCourseBasicInfo from './EditCourseBasicInfo'



function CourseBasicInfo({course,refreshData}) {
   
    const [selectedFile, setSelectedFile] =useState();
   const onFileSelected=(event)=>{
    const file=event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
   

   }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='p-10 border rounded-xl shadow-sm mt-5'>
                   <h2 className='font-bold text-3xl'>{course?.courseOutput?.["Course Name"]} <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)}/></h2>
                   <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.Description}</p>
                   <h2 className='font-medium mt-2 flex gap-2 items-center text-purple-500'>
                    <HiOutlinePuzzlePiece/>
                    {course?.category}
                   </h2>
                    <Button className={"w-full mt-2"} >Start</Button>
                </div>
                <div>

                    {/* Image placeholder or other content */}
                    <label htmlFor='upload-image'>
                        <Image src={selectedFile?selectedFile:'/file.svg'} width={250} height={250} alt='hi'
                        className='w-full rounded-xl h-[150px] object-cover mt-5 cursor-pointer' />
                    </label>
                    <input type='file' id='upload-image' className='opacity-0'
                    onChange={onFileSelected}/>
                   
                </div>
            </div>

        </div>
    )
}

export default CourseBasicInfo