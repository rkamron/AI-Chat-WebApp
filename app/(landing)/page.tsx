import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div>
            Landing Page (Unprotected)
            <div>
                <SignInButton>
                    <Button>
                        Log-In
                    </Button>
                </SignInButton>
                <SignUpButton>
                    <Button>
                        Register
                    </Button>
                </SignUpButton>
            </div>
        </div>
    );
}

export default LandingPage;