import { IBreadcrumbItem } from "@/types/hotel-booking"
import { Link } from "react-router-dom"
import { MdKeyboardArrowRight } from "react-icons/md"
interface IBreadcrumbs {
    routes: IBreadcrumbItem[]
};
function Breadcrumbs({ routes }: IBreadcrumbs) {

    if (routes.length === 0) return <></>

    return (
        <div className="w-full border-b border-t border-[#ccc]/40 py-3">
            <div className="flex items-center gap-x-2">
                {routes.map((route: IBreadcrumbItem, index: number) =>
                    <Link key={index} to={route.href}>
                        <div className="flex items-center gap-x-1">
                            <span className="text-sm text-[#a5a5a5] border-b border-b-transparent hover:border-b-[#a5a5a5]">{route.name}</span>
                            {index < routes.length - 1 && <MdKeyboardArrowRight color="#a5a5a5" />}
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Breadcrumbs