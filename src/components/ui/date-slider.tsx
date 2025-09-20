"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DateItem {
  day: string;
  date: number;
  fullDate: Date;
  isToday: boolean;
}

interface DateSliderProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  className?: string;
}

export function DateSlider({ selectedDate, onDateSelect, className }: DateSliderProps) {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Generate dates (30 days before and after today)
  useEffect(() => {
    const today = new Date();
    const dateArray: DateItem[] = [];
    
    for (let i = -30; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateNumber = date.getDate();
      const isToday = i === 0;
      
      dateArray.push({
        day: dayName,
        date: dateNumber,
        fullDate: date,
        isToday
      });
    }
    
    setDates(dateArray);
    
    // Set initial selected date
    if (selectedDate) {
      const selectedIndex = dateArray.findIndex(item => 
        item.fullDate.toDateString() === selectedDate.toDateString()
      );
      setSelectedIndex(selectedIndex >= 0 ? selectedIndex : 30); // Default to today
    } else {
      setSelectedIndex(30); // Today is at index 30
    }
  }, [selectedDate]);

  // Scroll to selected item
  useEffect(() => {
    if (itemRefs.current[selectedIndex] && scrollContainerRef.current) {
      const selectedElement = itemRefs.current[selectedIndex];
      const container = scrollContainerRef.current;
      
      if (selectedElement) {
        const elementRect = selectedElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollLeft = selectedElement.offsetLeft - container.offsetLeft - 
          (containerRect.width / 2) + (elementRect.width / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  const handleDateClick = (index: number) => {
    setSelectedIndex(index);
    if (onDateSelect) {
      onDateSelect(dates[index].fullDate);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {dates.map((dateItem, index) => (
          <div
            key={index}
            ref={el => { itemRefs.current[index] = el; }}
            onClick={() => handleDateClick(index)}
            className={cn(
              "flex-shrink-0 flex flex-col items-center justify-center",
              "w-12 h-16 rounded-xl cursor-pointer transition-all duration-200",
              "hover:scale-105",
              selectedIndex === index 
                ? "bg-red-500 text-white shadow-lg" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            )}
          >
            <span className="text-xs font-medium mb-1">
              {dateItem.day}
            </span>
            <span className="text-lg font-bold">
              {dateItem.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}