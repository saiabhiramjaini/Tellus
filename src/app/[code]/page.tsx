"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from 'next/navigation';
import { StarIcon } from "lucide-react";

export default function FeedbackPage() {
    const params = useParams();
    const [formData, setFormData] = useState({
        name: '',
        feedback: '',
        rating: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    code: params.code
                }),
            });

            if (response.ok) {
                setMessage('Thank you for your feedback!');
                setFormData({ name: '', feedback: '', rating: 0 });
            } else {
                setMessage('Failed to submit feedback. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="feedback">Your Feedback</Label>
                    <Textarea
                        id="feedback"
                        value={formData.feedback}
                        onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                        placeholder="Tell us what you think..."
                        required
                        className="min-h-32"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setFormData({...formData, rating: star})}
                                className="focus:outline-none"
                            >
                                <StarIcon
                                    className={`w-6 h-6 ${
                                        formData.rating >= star
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {message && (
                    <div className={`p-4 rounded ${
                        message.includes('Thank you') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {message}
                    </div>
                )}

                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
            </form>
        </div>
    );
}