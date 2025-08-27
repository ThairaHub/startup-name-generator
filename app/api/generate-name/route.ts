import { NextResponse } from "next/server"

const prefixes = [
  "Nexus", // 5
  "Verse",
  "Apex", // 4
  "Flux", // 4
  "Nova", // 4
  "Pulse", // 5
  "Spark", // 5
  "Vibe", // 4
  "Echo", // 4
  "Shift", // 5
  "Flow", // 4
  "Rise", // 4
  "Peak", // 4
  "Edge", // 4
  "Core", // 4
  "Sync", // 4
  "Leap", // 4
  "Dash", // 4
  "Swift", // 5
  "Bold", // 4
  "Pure", // 4
  "Smart", // 5
  "Quick", // 5
  "Fast", // 4
  "Pro", // 3
  "Max", // 3
  "Zen", // 3
  "Arc", // 3
  "Orb", // 3
  "Hex", // 3
  "Zap", // 3
  "Glow", // 4
  "Mint", // 4
  "Neon", // 4
  // New additions:
  "Beam", // 4
  "Crux", // 4
  "Link", // 4
  "Axis", // 4
  "Lume", // 4
  "Trek", // 4
  "Grip", // 4
  "Hype", // 4
  "Blip", // 4
  "Byte", // 4
  "Ping", // 4
  "Zoom", // 4
  "Spin", // 4
  "Drip", // 4
  "Volt", // 4
  "Glint", // 5
  "Blaze", // 5
  "Orbit", // 5
  "Prime", // 5
  "Quest", // 5
  "Spark", // 5
  "Thry", // 4
  "Plex", // 4
  "Echo", // 4
  "Jolt"  // 4
]

const suffixes = [
  "ly", // 2
  "fy", // 2
  "io", // 2
  "co", // 2
  "ai", // 2
  "go", // 2
  "up", // 2
  "ly", // 2
  "x", // 1
  "z", // 1
  "r", // 1
  "hub", // 3
  "box", // 3
  "app", // 3
  "net", // 3
  "pro", // 3
  "max", // 3
  "lab", // 3
]

const techWords = [
  "Data", // 4
  "Code", // 4
  "Byte", // 4
  "Link", // 4
  "Grid", // 4
  "Nano", // 4
  "Meta", // 4
  "Mind", // 4
  "Pixel", // 5
  "Logic", // 5
  "Stream", // 6
  "Matrix", // 6
  "Vector", // 6
  "Signal", // 6
  "Binary", // 6
  "Laser", // 5
  "Fiber", // 5
  "Micro", // 5
  "Vision", // 6
  "Neural", // 6
  "Cyber", // 5
  "Block", // 5
  "Chain", // 5
]

function isPreferredLength(name: string): boolean {
  return name.length >= 4 && name.length <= 7
}

function generateStartupName(): string {
  let attempts = 0
  let name: string

  do {
    const strategy = Math.floor(Math.random() * 4) + 1

    if (strategy === 1) {
      // Prefix + Suffix combination
      name =
        prefixes[Math.floor(Math.random() * prefixes.length)] + suffixes[Math.floor(Math.random() * suffixes.length)]
    } else if (strategy === 2) {
      // Tech word + suffix
      name =
        techWords[Math.floor(Math.random() * techWords.length)] + suffixes[Math.floor(Math.random() * suffixes.length)]
    } else if (strategy === 3) {
      // Single word (prefix or tech word)
      const allWords = [...prefixes, ...techWords]
      name = allWords[Math.floor(Math.random() * allWords.length)]
    } else {
      // Creative short combinations
      if (Math.random() > 0.7) {
        // Rarely use longer combinations
        name =
          prefixes[Math.floor(Math.random() * prefixes.length)] +
          techWords[Math.floor(Math.random() * techWords.length)]
      } else {
        // Prefer shorter combinations
        name =
          prefixes[Math.floor(Math.random() * prefixes.length)] + suffixes[Math.floor(Math.random() * suffixes.length)]
      }
    }

    attempts++
  } while (!isPreferredLength(name) && attempts < 20)

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
