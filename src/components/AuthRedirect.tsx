"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const AuthRedirect = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.publicMetadata.role;
      if (!role) {
        router.push("/select-role"); // Redirect if no role is set
      }
    }
  }, [isSignedIn, user, router]);

  return null; // This component doesn't render anything
};

export default AuthRedirect;
