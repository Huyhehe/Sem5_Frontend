import { Rate } from "antd"
import { ReactNode } from "react"
import { FaStar } from "react-icons/fa"
import { GiStripedSun } from "react-icons/gi"

interface IAboutTripDescriptionProps {
  title: string;
  iconBlocks: IconBlock[]
}

interface IconBlock {
  icon: ReactNode;
  text: string;
}

const dummy = [
  { icon: <GiStripedSun size={16} />, text: 'Free parking' },
  { icon: <GiStripedSun size={16} />, text: 'Free parking' },
  { icon: <GiStripedSun size={16} />, text: 'Free parking' },
  { icon: <GiStripedSun size={16} />, text: 'Free parking' },
  { icon: <GiStripedSun size={16} />, text: 'Free parking' },
]

const About = () => {
  return <div className='py-6 px-8 border border-[#ccc]/30 rounded-md shadow-sm'>
    <h2 className="text-2xl font-bold pb-3 border-b border-gray-400/40">About</h2>
    <div className="pt-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="pb-4 border-b border-gray-500/30">
          <div className="flex items-stretch gap-x-3">
            <h3 className="h-full font-bold text-5xl">5.0</h3>
            <div className="flex flex-col gap-y-0.5">
              <span className="font-medium text-lg">Excellent</span>
              <div className="flex items-center gap-x-1">
                <Rate
                  className="text-green-600 flex"
                  allowHalf
                  value={5}
                  character={<FaStar />}
                  disabled
                />
                <span className="text-sm text-gray-600 font-medium">23 reviews</span>
              </div>
            </div>
          </div>
          <p className="mt-4 tracking-wider text-lg">
            The resort is found within a secluded beachfront paradise after a pleasant 45-minute drive from Danang International Airport or an-hour-and-25-minute drive from Chu Lai Airport. Hoi An Ancient Town - a UNESCO World Cultural Heritage site which is renowned for its harmonious and aesthetic blend of Vietnamese, Chinese, Japanese and French architectural culture is only within 15-minute car ride from the resort.
          </p>
          <p className="mt-4 tracking-wider text-lg">
            The resort is found within a secluded beachfront paradise after a pleasant 45-minute drive from Danang International Airport or an-hour-and-25-minute drive from Chu Lai Airport. Hoi An Ancient Town - a UNESCO World Cultural Heritage site which is renowned for its harmonious and aesthetic blend of Vietnamese, Chinese, Japanese and French architectural culture is only within 15-minute car ride from the resort.
          </p>
        </div>
        <div className="flex flex-col gap-y-8 pb-4 border-b border-gray-500/30">
          <AboutTripDescription
            iconBlocks={dummy}
            title="Property amenities"
          />
          <AboutTripDescription
            iconBlocks={dummy}
            title="Room features"
          />
          <AboutTripDescription
            iconBlocks={dummy}
            title="Room types"
          />
        </div>
      </div>
    </div>
  </div>
}

const AboutTripDescription = ({ title, iconBlocks }: IAboutTripDescriptionProps) => {
  return <div className="">
    <h5 className="text-sm font-bold">{title}</h5>
    <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
      {iconBlocks.map((icon: IconBlock, index: number) =>
        <div className="flex items-center gap-x-2" key={index}>
          {icon.icon}
          <span className="text-sm text-gray-600">{icon.text}</span>
        </div>)}
    </div>
  </div>
}

export default About
