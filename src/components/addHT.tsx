"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Plus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { responseUser } from "@/types/types";
import page1 from '@/../public/page1.png';
import page2 from '@/../public/page2.png';
import page3 from '@/../public/page3.png';
import page4 from '@/../public/page4.png';
import page5 from '@/../public/page5.png';
import page6 from '@/../public/page6.png';
import Image from "next/image";

interface propType {
  data: responseUser | null;
}

export default function AddHT(props: propType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currPage, setCurrPage] = useState<number>(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const imgPages =[page1, page2, page3, page4, page5, page6];

  const leftClick = ()=>{
    if(currPage>0){
      setCurrPage(currPage-1);
    }
  };

  const rightClick = ()=>{
    if(currPage<5){
      setCurrPage(currPage+1);
    }
  };

  return (
    <>
      {/* Modal Dialog */}
      {isModalOpen && (
        <div
          // This outer div is the blurred backdrop
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <Card
            className="w-full max-w-lg m-4"
            // Stop click propagation to prevent closing the modal when clicking on the card
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6">
              {currPage == 0 
              ? (
                <div className="flex flex-col mb-3">
                  <Button variant="ghost" className="w-full h-11 justify-start rounded-none">Create a new Habit</Button>
                  <hr/>
                  <Button variant="ghost" className="w-full h-11 justify-start rounded-none">Create a new Task</Button>
                  <hr/>
                  <Button variant="ghost" className="w-full h-11 justify-start rounded-none">Choose from templates</Button>
                </div>
              ) 
              : currPage == 1 ? (
                <p>page 2</p>
              ) : currPage == 2 ? (
                <p>page 3</p>
              ) : currPage == 3 ? (
                <p>page 4</p>
              ) : currPage == 4 ? (
                <p>page 5</p>
              ) : (
                <p>page 6</p>
              )
              }
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="icon" className="size-8" onClick={leftClick}>
                    <ChevronLeftIcon/>
                  </Button>
                  <Image src={imgPages[currPage]} alt="A description of my image" className="w-35"/>
                  <Button variant="secondary" size="icon" className="size-8" onClick={rightClick}>
                    <ChevronRightIcon/>
                  </Button>
                </div>
                <Button onClick={closeModal}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Action Button */}
      <Button
        onClick={openModal}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg z-40"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </>
  );
}