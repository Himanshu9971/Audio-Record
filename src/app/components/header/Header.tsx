import Image from 'next/image';
import React from 'react'
import { BiMenuAltLeft } from "react-icons/bi";
import profileImage from '../../../../public/profile-icon.svg'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-4'>
        <div className='bg-white border-2 border-gray-200 rounded-xl cursor-pointer'>
            <BiMenuAltLeft size={36} />
        </div>
        <Image
            src={profileImage}
            alt='Profile-Image'
            width={56}
        />
    </div>
  )
}

export default Header