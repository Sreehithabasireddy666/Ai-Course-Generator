import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <Image src={'/logo.svg'} width={30} height={40} alt='hehe' />
        <UserButton/>
    </div>
  )
}

export default Header