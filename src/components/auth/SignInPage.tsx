import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { dark } from "@clerk/themes";

const SignInPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect_url') || '/';
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>
        
        <SignIn 
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: "mx-auto w-full flex items-center justify-center",
              card: "bg-background shadow-lg",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsIconButton: "bg-black text-white hover:bg-black/80 border-none",
              socialButtonsBlockButton: "bg-black text-white hover:bg-black/80 border-none",
              socialButtonsProviderIcon: "text-white",
              dividerLine: "bg-border",
              formFieldInput: "bg-background border border-input",
              formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
              footerAction: "text-muted-foreground",
              identityPreviewEditButton: "text-primary",
              formFieldWarning: "text-destructive text-sm",
              formFieldError: "text-destructive text-sm",
              footer: "hidden",
              logoBox: "hidden",
              logoImage: "hidden"
            }
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          redirectUrl={redirectUrl}
        />

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-primary hover:text-primary/80 font-medium">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage; 