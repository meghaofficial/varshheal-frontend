import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';

const ImageViewer = ({ img, customClass }) => {
      const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=''>
      <div className='shadow rounded'>
            <img src={img} alt="some" className={`cursor-pointer object-cover ${customClass}`} onClick={() => setIsOpen(true)} />
      </div>
      {isOpen && (
            <div className='h-screen absolute top-0 left-0 z-[999] w-full bg-black/95 flex items-center justify-center'>
                  <RxCross2 className='text-white absolute top-3 right-3 cursor-pointer' size={20} onClick={() => setIsOpen(false)} />
                  <img src={img} alt="some" className='h-[530px]' />
            </div>
      )}
    </div>
  )
}

export default ImageViewer
