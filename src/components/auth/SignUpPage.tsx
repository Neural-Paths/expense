import { SignUp } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { dark } from "@clerk/themes";

const SignUpPage = () => {
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create an account</h1>
          <p className="text-muted-foreground">Sign up to get started with expense tracking</p>
        </div>
        
        <SignUp 
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: "mx-auto w-full",
              card: "bg-background shadow-none",
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
          path="/sign-up"
          signInUrl="/sign-in"
          redirectUrl={redirectUrl}
        />

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage; 