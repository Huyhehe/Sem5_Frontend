import Slide from '@/components/common/Slide';

interface PlaceItem {
  title: string;
  img: string;
}
interface IPlaceSection {
  data: PlaceItem[];
  title: string;
  desc?: string;
}

function PlaceSection(props: IPlaceSection) {
  return (
    <div className='mt-6 flex flex-col gap-y-3'>
      <h3 className='font-bold tracking-wide text-black text-2xl'>{props.title}</h3>
      {props?.desc && <span className='block tracking-wide font-normal text-gray-500 text-sm'>{props?.desc}</span>}

      <Slide >
        {props?.data && props?.data?.length > 0 && props?.data?.map((place: PlaceItem, index: number) =>
          <div key={index} className="card-container relative flex flex-col box-border md:w-[250px] xl:w-[300px] h-[250px]
                 bg-white rounded-[0.5rem] overflow-hidden border cursor-pointer hover:shadow-md ">
            <img src={place?.img} alt={place.title} className="absolute w-full h-full top-0 left-0 object-cover z-0" />
            <h3 className='text-white z-10 mt-auto mb-3 ml-4 text-2xl font-bold tracking-wide'>{place?.title}kaka</h3>
          </div>)
        }
      </Slide>
    </div>
  )
}

export default PlaceSection;
