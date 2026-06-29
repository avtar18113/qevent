"use client";

import { useRouter } from "next/navigation";

const Tag = ({ text, clickable = false }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (clickable) {
      router.push(`/events?tag=${encodeURIComponent(text)}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl w-fit px-3 py-1 text-center font-bold hover:scale-110 hover:cursor-pointer"
    >
      # {text}
    </div>
  );
};

export default Tag;