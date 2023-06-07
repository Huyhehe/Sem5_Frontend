import React from 'react'
import Breadcrumbs from './components/Breadcrumbs'
import { IBreadcrumbItem } from '@/types/hotel-booking'
import InformationDetail from './components/InformationDetail'
import ViewPrice from './components/ViewPrice'
import About from '../About'
import PopularNeaby from './components/PopularNearBy'

const DUMMY_BREADCRUM: IBreadcrumbItem[] = [
    {
        href: "",
        name: "Asia"
    },
    {
        href: "",
        name: "Quang Nam Province"
    },
    {
        href: "",
        name: "Duy Hai"
    },
    {
        href: "",
        name: "Duy Hai Hotels"
    },
]

function HotelBooking() {
    return (
        <div className='w-full'>
            <Breadcrumbs routes={DUMMY_BREADCRUM} />
            <div className='mt-10'>
                <InformationDetail />
            </div>
            <div className='mt-4'>
                <ViewPrice />
            </div>
            <div className='mt-4'>
                <About />
            </div>
            <div className='mt-4'>
                <PopularNeaby />
            </div>
        </div>
    )
}

export default HotelBooking