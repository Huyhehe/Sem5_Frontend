import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div>
      <h1 className="text-[5rem] font-black tracking-widest text-center">
        404
      </h1>
      <h2 className="text-[2rem] font-bold text-center">Page not found</h2>
      <div className="text-center">
        Click{" "}
        <Link className="underline font-bold" to="/">
          here
        </Link>{" "}
        to go back to the homepage.
      </div>
    </div>
  )
}
