import Image from "next/image";
import { Button } from "../components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-10">
      <SignedOut>
        <SignInButton>
          <Button>
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
