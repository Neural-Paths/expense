import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/sign-in") || location.pathname.startsWith("/sign-up");

  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        {isAuthPage ? (
          location.pathname.startsWith("/sign-in") ? <SignInPage /> : <SignUpPage />
        ) : (
          <Navigate to="/sign-in" replace />
        )}
      </SignedOut>
    </>
  );
};

export default AuthWrapper; 