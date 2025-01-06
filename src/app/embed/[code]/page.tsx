// app/embed/[code]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function EmbedTestimonialsPage() {
    const { code } = useParams(); // Get the `code` from URL params
    const [feedbackData, setFeedbackData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!code) return; // If code is not available, don't make the request

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/testimonials/${code}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch testimonials");
                }

                const data = await response.json();
                setFeedbackData(data); // Store the fetched data
            } catch (error: any) {
                setError(error.message); // Handle any errors
            }
        };

        fetchData();
    }, [code]); // Re-run the effect when `code` changes

    if (error) {
        return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
    }

    if (!feedbackData.length) {
        return <div className="text-center text-gray-500 mt-4">Loading...</div>;
    }

    return (
        <div className="font-sans p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Testimonials</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {feedbackData.map((feedback) => (
                    <div
                        key={feedback.id}
                        className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow overflow-hidden"
                    >
                        <h2 className="text-lg font-semibold text-gray-700 mb-2 truncate">
                            {feedback.name}
                        </h2>
                        <p className="text-gray-600 mb-4 break-words overflow-hidden text-ellipsis max-h-20">
                            {feedback.feedback}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>
                                Rating: <span className="font-bold">{feedback.rating}</span>/5
                            </span>
                            <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
