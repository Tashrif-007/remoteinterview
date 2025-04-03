"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";

type ROLE = "interviewer" | "candidate";

const SelectRole = () => {
  const { user } = useUser();
  const router = useRouter();

  const convexUser = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || "", 
  });

  const updateRole = useMutation(api.users.updateRole);

  if (!user) return <p>Loading...</p>;
  if (!convexUser) return <p>Fetching user...</p>;

  const setRole = async (role: ROLE) => {
    try {
      await updateRole({ id: convexUser._id, role }); /
      router.push("/"); 
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2" onClick={() => setRole("candidate")}>
        Candidate
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setRole("interviewer")}>
        Interviewer
      </button>
    </div>
  );
};

export default SelectRole;
