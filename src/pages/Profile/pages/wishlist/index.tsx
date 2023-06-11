import { getWishlist } from "@/service/api/user/getWishlist.api"
import { IWishlist } from "@/types/responses/user/wishlist.res.type"

import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import WishlistCard from "./components/WishlistCard"
import { Empty } from "antd"

export default function MyWishlist() {
    const { userInfo } = useOutletContext<any>()

    const [wishlist, setWishlist] = useState<IWishlist[]>([])

    const getMyWishlist = async () => {
        try {
            const data = await getWishlist()
            setWishlist(data)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        getMyWishlist()
    }, [userInfo])

    return (
        <div className="flex flex-col gap-y-5 pb-8">
            {wishlist.length === 0 ? <Empty /> : wishlist.map((wishlist: IWishlist) => <WishlistCard key={wishlist.id} location={wishlist.location} />)}
        </div>
    )
}
