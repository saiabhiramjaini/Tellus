"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clipboard, Code, Palette, Layout } from "lucide-react"
import { motion } from "framer-motion"

interface EmbedScriptGeneratorProps {
  userCode: string
  baseUrl?: string
}

export function EmbedScriptGenerator({
  userCode,
  baseUrl = "https://tellus.abhiramverse.tech",
}: EmbedScriptGeneratorProps) {
  const [copyConfirmation, setCopyConfirmation] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState("dark")
  const [selectedLayout, setSelectedLayout] = useState("grid")

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopyConfirmation(type)
    setTimeout(() => setCopyConfirmation(null), 2000)
  }

  const generateEmbedCode = (type: "iframe" | "script" | "widget") => {
    const params = new URLSearchParams({
      theme: selectedTheme,
      layout: selectedLayout,
    }).toString()

    switch (type) {
      case "iframe":
        return `<iframe 
  src="${baseUrl}/embed/${userCode}?${params}" 
  width="100%" 
  height="600" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
</iframe>`

      case "script":
        return `<script 
  src="${baseUrl}/embed.js" 
  data-code="${userCode}"
  data-theme="${selectedTheme}"
  data-layout="${selectedLayout}"
  async>
</script>
<div id="tellus-testimonials-${userCode}"></div>`

      case "widget":
        return ` Tellus Testimonials Widget 
<div class="tellus-widget" data-code="${userCode}">
  <script>
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "${baseUrl}/widget.js";
      js.setAttribute('data-code', '${userCode}');
      js.setAttribute('data-theme', '${selectedTheme}');
      js.setAttribute('data-layout', '${selectedLayout}');
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'tellus-widget'));
  </script>
</div>`

      default:
        return ""
    }
  }

  const themes = [
    { id: "dark", name: "Dark", preview: "bg-background text-foreground" },
    { id: "light", name: "Light", preview: "bg-white text-gray-900" },
    { id: "auto", name: "Auto", preview: "bg-gradient-to-r from-background to-white" },
  ]

  const layouts = [
    { id: "grid", name: "Grid", icon: Layout },
    { id: "masonry", name: "Masonry", icon: Layout },
    { id: "carousel", name: "Carousel", icon: Layout },
  ]

  return (
    <div className="space-y-6">
      {/* Customization Options */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Palette className="w-5 h-5" />
            Customize Your Widget
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Theme</h4>
            <div className="flex gap-2">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedTheme === theme.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent/50 text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-4 h-4 rounded mb-1 mx-auto ${theme.preview}`} />
                  <span className="text-xs">{theme.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Layout Selection */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Layout</h4>
            <div className="flex gap-2">
              {layouts.map((layout) => (
                <motion.button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout.id)}
                  className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                    selectedLayout === layout.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent/50 text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <layout.icon className="w-4 h-4" />
                  <span className="text-xs">{layout.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Embed Code Options */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Code className="w-5 h-5" />
            Embed Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="iframe" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background/50">
              <TabsTrigger value="iframe">
                iFrame
                <Badge variant="secondary" className="ml-2 text-xs">
                  Recommended
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="script">JavaScript</TabsTrigger>
              <TabsTrigger value="widget">Widget</TabsTrigger>
            </TabsList>

            {["iframe", "script", "widget"].map((type) => (
              <TabsContent key={type} value={type} className="space-y-4">
                <div className="bg-background/50 p-4 rounded-md border border-border/30">
                  <pre className="text-sm text-foreground overflow-x-auto">
                    <code>{generateEmbedCode(type as "iframe" | "script" | "widget")}</code>
                  </pre>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopy(generateEmbedCode(type as "iframe" | "script" | "widget"), type)}
                    className="flex-1"
                    variant="outline"
                  >
                    <Clipboard className="w-4 h-4 mr-2" />
                    {copyConfirmation === type
                      ? "Copied!"
                      : `Copy ${type.charAt(0).toUpperCase() + type.slice(1)} Code`}
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        `${baseUrl}/embed/${userCode}?${new URLSearchParams({ theme: selectedTheme, layout: selectedLayout }).toString()}`,
                        "_blank",
                      )
                    }
                    variant="secondary"
                  >
                    Preview
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
