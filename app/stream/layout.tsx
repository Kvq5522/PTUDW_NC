import { AuthGuard } from "@/components/Guard/AuthGuard";
import "@/Styles/stream.css";

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center justify-center">
    
      {children}
   
  </div>;
}

export default AuthLayout;
