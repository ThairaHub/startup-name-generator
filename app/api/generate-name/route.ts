import { NextResponse } from "next/server"

// Startup name components for generation
const prefixes = [
  "Nexus",
  "Quantum",
  "Vertex",
  "Zenith",
  "Apex",
  "Flux",
  "Nova",
  "Pulse",
  "Spark",
  "Vibe",
  "Echo",
  "Shift",
  "Flow",
  "Rise",
  "Peak",
  "Edge",
  "Core",
  "Sync",
  "Leap",
  "Dash",
  "Swift",
  "Bold",
  "Pure",
  "Bright",
  "Smart",
  "Quick",
  "Fast",
  "Pro",
  "Max",
  "Ultra",
  "Super",
  "Mega",
]

const suffixes = [
  "ly",
  "fy",
  "io",
  "co",
  "ai",
  "tech",
  "lab",
  "hub",
  "box",
  "app",
  "net",
  "soft",
  "ware",
  "sys",
  "pro",
  "max",
  "plus",
  "go",
  "up",
  "now",
  "fast",
  "quick",
  "smart",
  "easy",
  "simple",
  "clean",
  "fresh",
]

const techWords = [
  "Data",
  "Cloud",
  "Cyber",
  "Digital",
  "Crypto",
  "Block",
  "Chain",
  "Neural",
  "Logic",
  "Pixel",
  "Code",
  "Byte",
  "Link",
  "Stream",
  "Grid",
  "Matrix",
  "Vector",
  "Signal",
  "Circuit",
  "Binary",
  "Laser",
  "Fiber",
  "Nano",
  "Micro",
  "Meta",
  "Virtual",
  "Augmented",
  "Reality",
  "Vision",
  "Mind",
]

function generateStartupName(): string {
  // Choose a random generation strategy
  const strategy = Math.floor(Math.random() * 4) + 1

  let name: string

  if (strategy === 1) {
    // Prefix + Suffix combination
    name = prefixes[Math.floor(Math.random() * prefixes.length)] + suffixes[Math.floor(Math.random() * suffixes.length)]
  } else if (strategy === 2) {
    // Tech word + suffix
    name =
      techWords[Math.floor(Math.random() * techWords.length)] + suffixes[Math.floor(Math.random() * suffixes.length)]
  } else if (strategy === 3) {
    // Prefix + tech word
    name =
      prefixes[Math.floor(Math.random() * prefixes.length)] + techWords[Math.floor(Math.random() * techWords.length)]
  } else {
    // Creative combinations
    if (Math.random() > 0.5) {
      name =
        prefixes[Math.floor(Math.random() * prefixes.length)] +
        techWords[Math.floor(Math.random() * techWords.length)] +
        suffixes[Math.floor(Math.random() * suffixes.length)]
    } else {
      name =
        techWords[Math.floor(Math.random() * techWords.length)] + prefixes[Math.floor(Math.random() * prefixes.length)]
    }
  }

  return name
}

export async function POST() {
  try {
    const name = generateStartupName()

    return NextResponse.json({ name })
  } catch (error) {
    console.error("Error generating startup name:", error)
    return NextResponse.json({ error: "Failed to generate startup name" }, { status: 500 })
  }
}
