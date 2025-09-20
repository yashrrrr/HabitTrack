"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface DateItem {
  day: string;
  date: number;
  fullDate: Date;
  isToday: boolean;
}

interface VirtualizedDateSliderProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  className?: string;
}

export function VirtualizedDateSlider({ 
  selectedDate, 
  onDateSelect, 
  className
}: VirtualizedDateSliderProps) {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    
    // Set initial selected date (today is at index 30)
    const todayIndex = 30;
    if (selectedDate) {
      const selectedIndex = dateArray.findIndex(item => 
        item.fullDate.toDateString() === selectedDate.toDateString()
      );
      const targetIndex = selectedIndex >= 0 ? selectedIndex : todayIndex;
      setSelectedIndex(targetIndex);
    } else {
      setSelectedIndex(todayIndex);
    }
  }, [selectedDate]);

  // Scroll to selected item with proper centering
  useEffect(() => {
    if (scrollContainerRef.current && selectedIndex >= 0 && dates.length > 0) {
      const container = scrollContainerRef.current;
      const itemWidth = 60; // 48px + 12px gap
      const containerWidth = container.clientWidth;
      const targetScrollLeft = (selectedIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
      
      setTimeout(() => {
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [selectedIndex, dates.length]);

  const handleDateClick = (index: number) => {
    setSelectedIndex(index);
    if (onDateSelect && dates[index]) {
      onDateSelect(dates[index].fullDate);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-scroll scrollbar-hide pb-2 px-6"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        {dates.map((dateItem, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(index)}
            className={cn(
              "flex-shrink-0 flex flex-col items-center justify-center",
              "w-12 h-16 rounded-xl cursor-pointer transition-all duration-200",
              "hover:scale-105 select-none",
              selectedIndex === index 
                ? "bg-red-500 text-white shadow-lg shadow-red-500/25" 
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            )}
          >
            <span className="text-xs font-medium mb-1 opacity-80">
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