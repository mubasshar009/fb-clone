import React from 'react';
import Image from 'next/image';
import { BellIcon,ChatIcon,ChevronDownIcon,HomeIcon,UserGroupIcon,ViewGridIcon} from '@heroicons/react/solid'
import { FlagIcon,PlayIcon,SearchIcon,ShoppingCartIcon} from '@heroicons/react/outline';
import HeaderIcon from './HeaderIcon';
 const Header = () => {
  return (
    <div className='sticky top-0 z-50 bg-white  flex items-center p-2 lg:px-5 shadow-md'>
        {/* Left */}
        <div className='flex items-center p-2'>
            <Image src="https://links.papareact.com/5me" width={40} height={40} layout="fixed"/>
            <div className='flex items-center rounded-full ml-2 bg-gray-100 p-2'>
             <SearchIcon className='h-6 text-gray-400'/>
            <input className='hidden md:inline-flex flex-shrink  ml-2 bg-transparent  outline-none' type="text" placeholder='Search Facebook'/>
        </div>
        </div>
        
        {/* Center */}
             <div className='flex justify-center flex-grow'>

                 <div className='flex space-x-6 md:space-x-2 '>
                    <HeaderIcon active Icon={HomeIcon}/>
                    <HeaderIcon Icon={FlagIcon}/>
                    <HeaderIcon Icon={PlayIcon}/>
                    <HeaderIcon Icon={ShoppingCartIcon}/>
                    <HeaderIcon Icon={UserGroupIcon}/>

                 </div>
             </div>
        {/* Right */}
        <div className='flex items-center sm:space-x-2 justify-end'>
            
            {/* Profile Pict */}
            <p className='whitespace-nowrap font-bold pr-3'>Sonny Sangha</p>
            <ViewGridIcon className='icon'/>
            <ChatIcon className='icon' />
            <BellIcon className='icon' />
            <ChevronDownIcon className='icon' />
        </div>
    </div>
  )
}

export default Header