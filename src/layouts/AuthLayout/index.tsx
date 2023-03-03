import NavBarSignedIn from "@/components/NavBarSignedIn";
import useUser from "@/hooks/useUser";
import NavBar from "../../components/NavBar";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const user = useUser();
  document.title = "TravelCare";
  return (
    <div className="authLayout flex flex-col items-center relative mb-4">
      <div className="w-full flex justify-center sticky top-0 z-50 bg-white border-b">
        {user ? <NavBarSignedIn user={user} /> : <NavBar />}
      </div>
      <div className="xl:w-[1260px] w-[80%] mobile:w-full tablet:w-full mt-[2rem] flex justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
