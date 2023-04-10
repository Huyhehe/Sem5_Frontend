import { MdOutlineNotListedLocation } from "react-icons/md"


interface IRecentSearchItem {
    title: string
    desc: string
}

const DUMMY_RECENT_SEARCH = [{
    title: "Ck Thinh",
    desc: "Quintana Roo"
}, {
    title: "Da Nang",
    desc: "Quintana Roo"
}, {
    title: "Quang Nam",
    desc: "Quintana Roo"
}, {
    title: "Nghe An",
    desc: "Ngao Nghe"
}]

function RecentSearch() {

    return (
        <div className="mt-6">
            <h3 className='font-bold tracking-wide text-black text-2xl'>Your recent searches</h3>
            <div className="flex items-center gap-x-4 mt-4">
                {DUMMY_RECENT_SEARCH.map((item: IRecentSearchItem, index: number) =>
                    <div className="flex items-center  min-w-[150px] border border-gray-300 border-solid rounded-[0.5rem]
                                px-3 py-2 gap-x-2 cursor-pointer hover:bg-black transition-all group"
                        key={index}>
                        <div>
                            <MdOutlineNotListedLocation className="group-hover:text-white" size={22} />
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className="group-hover:text-white text-sm font-bold">{item.title}</span>
                            <span className="group-hover:text-white text-xs font-normal">{item.desc}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentSearch
