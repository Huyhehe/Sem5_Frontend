import React from 'react'
import { BiUpload, } from "react-icons/bi"
import { BsTelephone, BsPencil } from "react-icons/bs"
import { AiOutlineHeart, AiOutlineMail } from "react-icons/ai"
import { Rate } from 'antd'
import { FaStar } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import { TbWorldUpload } from 'react-icons/tb'
import GalleryImage from '../GalleryImage'

function InformationDetail() {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold'>New World Hoiana Old Town Resort</h1>
                <div className='flex items-center gap-x-3'>
                    <button
                        className='border border-black rounded-[50%] p-1 group hover:bg-black'>
                        <BiUpload size={20} className='group-hover:text-white' />
                    </button>
                    <button
                        className='border border-black rounded-[50%] p-1 group hover:bg-black'>
                        <AiOutlineHeart size={20} className='group-hover:text-white' />
                    </button>
                </div>
            </div>

            <div className='mt-4 flex items-center justify-between'>
                <div className='flex items-center gap-x-2 '>
                    <Rate
                        className="text-green-600 flex"
                        allowHalf
                        value={4.5}
                        character={<FaStar />}
                        disabled
                    />
                    <span className='text-sm pr-5 border-r border-r-gray-500/20'>11 reviews</span>
                    <span className='ml-4 text-base hover:underline text-[#525252] cursor-pointer'>#3 of 3 hotels in Duy Hai</span>
                </div>
                <span className='text-sm text-[#525252]'>Enter dates to see prices</span>
            </div>

            <div className='flex items-center justify-between mt-3'>
                <div>
                    <div className='mt-2 flex items-center gap-x-2'>
                        <HiLocationMarker size={18} />
                        <p className='hover:underline text-lg cursor-pointer max-w-[70%]'>Hoiana Resort & Golf, Tay Son Tay Hamlet Duy Hai Commune, Duy Xuyen District, Hoi An, Quang Nam Province, Duy Hai 560000 Vietnam</p>
                    </div>

                    <div className='flex items-center gap-x-6 mt-4'>
                        <div className='flex items-center gap-x-2'>
                            <TbWorldUpload size={18} />
                            <span className='font-medium hover:underline cursor-pointer'>Visit hotel website</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <BsTelephone size={18} />
                            <span className='hover:underline cursor-pointer'>0905 5555 999</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <AiOutlineMail size={18} />
                            <span className='hover:underline cursor-pointer'>aHuyHoiAn@gmail.com</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <BsPencil size={18} />
                            <span className='hover:underline cursor-pointer'>Write a review</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='px-7 py-5 bg-[#f2b203] text-black rounded-[100px] hover:bg-[#f2b203]/60 font-medium'>Show Prices</button>
                </div>
            </div>

            <div className='mt-4'>
                <GalleryImage />
            </div>
        </div>
    )
}

export default InformationDetail