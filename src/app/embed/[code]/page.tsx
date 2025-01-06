'use client'

import TestimonialWidget from "@/components/TestimonialWidget";
import { useParams } from "next/navigation";

export default function EmbedPage() {
  const params = useParams()

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <TestimonialWidget code={typeof params.code === 'string' ? params.code : ''} />
      </div>
    </div>
  );
}
