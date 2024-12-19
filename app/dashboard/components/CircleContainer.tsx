import Link from "next/link";
import React from "react";

interface BubbleProps {
  title: string;
  total: number;
}
function CircleContainer({ title, total }: BubbleProps) {
  return (
    <Link href="/dashboard/purchases">
      <div className="cursor-pointer hover:scale-105 group transition rounded-full bg-btn-background text-neutral-600 w-24 h-24 p-3 flex flex-col justify-center items-center">
        <div className="font-bold text-lg group-hover:scale-125 transition">${total}</div>
        <div className="text-xs">{title}</div>
      </div>
    </Link>
  );
}

export default CircleContainer;
