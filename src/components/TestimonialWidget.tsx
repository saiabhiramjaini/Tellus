'use client';

import React, { useEffect, useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  rating: number;
  createdAt: string;
}

interface TestimonialWidgetProps {
  code: string;
  limit?: number;
  theme?: 'light' | 'dark';
}

export default function TestimonialWidget({
  code,
  limit = 5,
  theme = 'light',
}: TestimonialWidgetProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `/api/testimonials/${code}?limit=${limit}`
        );
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [code, limit]);

  if (loading) return <div>Loading testimonials...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${
      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{testimonial.name}</h3>
              <div className="text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < Math.round(testimonial.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {testimonial.feedback}
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {new Date(testimonial.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}