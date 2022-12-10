import { FunctionComponent } from "react"

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <div className="loading-component absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/30 z-[9999]">
      <div
        className="loading-component__spinner
        animate-spin rounded-full w-[8rem] aspect-square border-b-[0.25rem] border-primary/50"
      ></div>
    </div>
  )
}

export default Loading
