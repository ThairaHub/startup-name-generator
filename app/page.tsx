"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"

export default function StartupNameGenerator() {
  const [generatedName, setGeneratedName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentAnimationName, setCurrentAnimationName] = useState("")
  const [showResult, setShowResult] = useState(false)

  const sampleNames = [
    "TechFlow",
    "DataSync",
    "CloudVault",
    "NextGen",
    "InnovateLab",
    "StreamCore",
    "PixelForge",
    "CodeCraft",
    "FlowState",
    "ByteWave",
    "NeuralLink",
    "QuantumLeap",
    "SkyBridge",
    "FireBase",
    "IceBreaker",
    "ThunderBolt",
    "LightSpeed",
    "DeepDive",
    "RocketFuel",
    "StarForge",
    "MoonShot",
    "SunRise",
    "WaveRider",
    "StormChaser",
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)]
        setCurrentAnimationName(randomName)
      }, 80) // Fast animation - changes every 80ms
    }
    return () => clearInterval(interval)
  }, [isAnimating])

  const generateName = async () => {
    setShowResult(false)
    setIsAnimating(true)
    setIsLoading(true)

    try {
      const response = await fetch("/api/generate-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to generate name")
      }

      const data = await response.json()

      setTimeout(() => {
        setIsAnimating(false)
        setGeneratedName(data.name)
        setShowResult(true)
        setIsLoading(false)
      }, 2000) // 2 seconds of roulette animation
    } catch (error) {
      console.error("Error generating name:", error)
      setIsAnimating(false)
      setGeneratedName("Error generating name. Please try again.")
      setShowResult(true)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {!isAnimating && !showResult && (
          <>
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-[#717372]">Startup Name Generator</h1>
              <p className="text-lg text-[#717372]/80">Generate unique and memorable names for your next startup</p>
            </div>
          </>
        )}

        {isAnimating && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-bold text-[#717372] font-sans animate-pulse blur-sm">
                {currentAnimationName}
              </div>
            </div>
          </div>
        )}

        {showResult && generatedName && (
          <div className="space-y-8">
            <Card className="p-8 border-2 border-[#717372]/20 bg-white">
              <div className="text-center">
                <p className="text-sm text-[#717372]/60 mb-4">Your startup name:</p>
                <h2 className="text-6xl md:text-8xl font-bold text-[#717372] font-sans">{generatedName}</h2>
              </div>
            </Card>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={generateName}
          disabled={isLoading}
          size="lg"
          className="bg-[#717372] hover:bg-[#717372]/90 text-white px-8 py-4 text-lg font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Name
            </>
          )}
        </Button>

        {!isAnimating && (
          <div className="pt-8">
            <p className="text-sm text-[#717372]/60">Powered by AI • Generate unlimited names</p>
          </div>
        )}
      </div>
    </div>
  )
}
