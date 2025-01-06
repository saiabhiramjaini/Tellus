"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clipboard,
  Star,
  Code,
  ChevronUp,
  ChevronDown,
  Users,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";

type Feedback = {
  id: string;
  name: string;
  feedback: string;
  rating: number;
};

type DashboardClientProps = {
  feedbackUrl: string;
  feedback: Feedback[];
  userCode: string;
};

export function DashboardClient({
  feedbackUrl,
  feedback,
  userCode,
}: DashboardClientProps) {
  const [isEmbedCodeOpen, setIsEmbedCodeOpen] = useState(false);
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);
  const [copyConfirmation, setCopyConfirmation] = useState<string | null>(null);

  const averageRating =
    feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-lightBlue to-white pt-20">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-6">
          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Feedback
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{feedback.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Rating
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Unique Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(feedback.map((f) => f.name)).size}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback URL and Embed Code */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Share Feedback Form</CardTitle>
              <CardDescription>
                Share this URL with your users to collect feedback or embed the
                feedback form on your website to gather testimonials seamlessly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Feedback URL */}
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={feedbackUrl}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(feedbackUrl);
                    setCopyConfirmation("url");
                    setTimeout(() => setCopyConfirmation(null), 2000);
                  }}
                  variant="secondary"
                >
                  <Clipboard className="w-4 h-4 mr-2" />
                  {copyConfirmation === "url" ? "Copied!" : "Copy"}
                </Button>
              </div>

              {/* Embed Code Button */}
              <Button
                onClick={() => setIsEmbedCodeOpen(true)}
                variant="outline"
              >
                <Code className="w-4 h-4 mr-2" />
                Get Embed Code
              </Button>
            </CardContent>
          </Card>

          {/* Feedback List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recent Feedback</h2>
            <div className="grid gap-4">
              {feedback.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                className={`w-4 h-4 ${
                                  index < item.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setExpandedFeedback(
                            expandedFeedback === item.id ? null : item.id
                          )
                        }
                      >
                        {expandedFeedback === item.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CardHeader>
                    <AnimatePresence>
                      {expandedFeedback === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <CardContent>
                            <p className="text-muted-foreground">
                              {item.feedback}
                            </p>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Embed Code Dialog */}
      <Dialog open={isEmbedCodeOpen} onOpenChange={setIsEmbedCodeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Embed Testimonials</DialogTitle>
            <DialogDescription>
              Copy and paste the following code into your website to embed the
              feedback testimonials. This code dynamically fetches testimonials
              associated with your unique code and displays them beautifully on
              your site.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/50 p-4 rounded-md">
            <code className="text-sm break-all font-mono">
              {`<iframe src="https://tellus.abhiramverse.tech/embed/${userCode}" height="500px" width="1000px"></iframe>
            `}
            </code>
          </div>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `<iframe src="https://tellus.abhiramverse.tech/embed/${userCode}" height="500px" width="1000px"></iframe>`
              );
              setCopyConfirmation("embed");
              setTimeout(() => setCopyConfirmation(null), 2000);
            }}
          >
            <Clipboard className="w-4 h-4 mr-2" />
            {copyConfirmation === "embed" ? "Copied!" : "Copy Code"}
          </Button>
          {/* Preview Link */}
    <p className="text-sm text-muted-foreground">
      Preview your testimonials at:{" "}
      <a
        href={`https://tellus.abhiramverse.tech/embed/${userCode}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {`https://tellus.abhiramverse.tech/embed/${userCode}`}
      </a>
    </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
