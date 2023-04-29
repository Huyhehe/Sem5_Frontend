import Logo from "./Logo"

const Fallback = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center gap-[1.5rem]">
      <div className="flex items-end gap-4 fading-text">
        <Logo scale={4} className="animate-bounce" />
      </div>
    </div>
  )
}

export default Fallback
