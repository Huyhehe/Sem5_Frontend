interface LogoProps {
  scale?: number | string
  className?: string
}

const Logo = ({ scale, className }: LogoProps) => {
  return (
    <h1
      className={`text-blue-500 leading-[4rem] text-[${scale}rem] ${className}`}
    >
      TRAVEL<strong className="text-primary">CARE</strong>
    </h1>
  )
}

export default Logo
