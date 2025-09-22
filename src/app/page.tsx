"use client";

import { useAuth } from "@/lib/firebase/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VirtualizedDateSlider } from "@/components/ui/virtualized-date-slider";
import { useEffect, useState } from "react";
import getUserData from "@/services/getUserData";
import { responseUser } from "@/types/types";
import UserHabitTask from "@/components/userHabitTask";
import AddHT from "@/components/addHT";

export default function Home() {
  const { user, loading } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<responseUser | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const dt = await getUserData(user);
      setData(dt);
    };
    fetchData();
  }, []);

  useEffect(()=>{
    if(data){
      console.log(data?.categories);
    }
  },[data]);

  // Show a loading message while the auth state is being determined
  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date.toDateString());
  };

  return (
    <>
      {/* If user is logged in, show welcome message and date slider */}
      {user ? (
        <div className="w-full overflow-hidden p-4">
          {/* Horizontal Date Slider - Dark Theme like in image */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            <div className="py-6">
              <VirtualizedDateSlider 
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>
          <h2 className="mt-8 mb-4 ml-2 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Habits and Tasks
          </h2>
          <UserHabitTask data={data}/>
          <AddHT data={data}/>
        </div>
      ) : (
        // If user is not logged in, show message and link to login page
        <div className="flex items-center justify-center h-screen flex-col">
          <h1 className="text-4xl text-center font-bold mb-4">HabitTrack</h1>
          <div className="text-center">
            <p className="mb-4">Please sign in to track your habits.</p>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}