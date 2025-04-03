"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes"; // Add this import for theme support
import { api } from "../../../convex/_generated/api";

type ROLE = "interviewer" | "candidate";

const SelectRole = () => {
  const { user } = useUser();
  const router = useRouter();
  const { theme } = useTheme(); // Get current theme
  
  const convexUser = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || "", 
  });

  const updateRole = useMutation(api.users.updateRole);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-black bg-gray-50">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full dark:bg-gray-800 bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 dark:bg-gray-800 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 dark:bg-gray-800 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!convexUser) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-black bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="dark:text-gray-400 text-gray-600">Fetching user...</p>
        </div>
      </div>
    );
  }

  const setRole = async (role: ROLE) => {
    try {
      await updateRole({ id: convexUser._id, role });
      router.push("/"); 
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-black bg-gray-50 transition-colors duration-200">
      <div className="dark:bg-gray-900 bg-white p-6 rounded-lg shadow-lg max-w-md w-full dark:border-gray-800 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-2">Select Your Role</h2>
          <p className="dark:text-gray-400 text-gray-600">Choose your role to continue</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => setRole("candidate")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Candidate</span>
          </button>
          
          <button 
            onClick={() => setRole("interviewer")}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Interviewer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;