from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import uvicorn

app = FastAPI(title="Startup Name Generator API", version="1.0.0")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NameResponse(BaseModel):
    name: str

# Startup name components for generation
prefixes = [
    "Nexus", "Quantum", "Vertex", "Zenith", "Apex", "Flux", "Nova", "Pulse",
    "Spark", "Vibe", "Echo", "Shift", "Flow", "Rise", "Peak", "Edge",
    "Core", "Sync", "Leap", "Dash", "Swift", "Bold", "Pure", "Bright",
    "Smart", "Quick", "Fast", "Pro", "Max", "Ultra", "Super", "Mega",
    "Beam", "Crux", "Link", "Axis", "Lume", "Trek", "Grip", "Hype", "Blip", "Byte",
    "Ping", "Zoom", "Spin", "Drip", "Volt", "Glint", "Blaze", "Orbit", "Prime", "Quest",
    "Plex", "Jolt", "Loop", "Clix", "Snap", "Amp", "Bit", "Tap", "Dyn", "Kin",
    "Zyn", "Xen", "Opt", "Lum", "Mod", "Nod", "Rov", "Sky", "Strm", "Fyn",
    "Glyph", "Code", "Data", "Cast", "Base", "Node", "Spec", "True", "Ping", "Tide",
    "Path", "Mesh", "Net", "Sig", "Pix", "Pod", "Arc", "Vox", "Ray", "Aim",
    "Zapz", "Volt", "Brix", "Echoo", "Thry", "Lynk", "Vybe", "Grav", "Axel", "Spinr",
    "Blink", "Shft", "Drft", "Clue", "Star", "Meta", "Lite", "Grid", "Form", "Tone",
    "Snapz", "Fluxy", "Zorb", "Qik", "Tron", "Cynk", "Glxy", "Wave", "Pwr", "Zenx",
    "Kick", "Lyn", "Neo", "Jet", "Run", "Ampx", "Skyx", "Phaze", "Strk", "Orin"
]

suffixes = [
    "ly", "fy", "io", "co", "ai", "tech", "lab", "hub", "box", "app",
    "net", "soft", "ware", "sys", "pro", "max", "plus", "go", "up",
    "now", "fast", "quick", "smart", "easy", "simple", "clean", "fresh"
]

tech_words = [
    "Data", "Cloud", "Cyber", "Digital", "Crypto", "Block", "Chain", "Neural",
    "Logic", "Pixel", "Code", "Byte", "Link", "Stream", "Grid", "Matrix",
    "Vector", "Signal", "Circuit", "Binary", "Laser", "Fiber", "Nano",
    "Micro", "Meta", "Virtual", "Augmented", "Reality", "Vision", "Mind",
        # New additions:
    "Quantum", "AI", "Bot", "Script", "Compute", "Server", "Node", "Portal",
    "Core", "Hub", "Kernel", "Frame", "Module", "Cache", "Packet", "Ping",
    "Protocol", "Syntax", "Terminal", "Cluster", "Array", "Field", "Orbit",
    "Pulse", "Spark", "Volt", "Wave", "Flux", "Drive", "Port", "Layer",
    "Pixelate", "Render", "Shader", "Glyph", "Cipher", "Hash", "Token",
    "Ledger", "Turing", "NeuralNet", "Holo", "Lens", "Drone", "Sensor",
    "Beacon", "Bit", "Chip", "LogicGate", "Sim", "Model", "Engine", "Streamline",
    "Overlay", "Hyperlink", "Upload", "Download", "Encrypt", "Decrypt"
]

@app.get("/")
async def root():
    return {"message": "Startup Name Generator API is running!"}

@app.post("/api/generate-name", response_model=NameResponse)
async def generate_startup_name():
    """Generate a unique startup name using various algorithms"""
    
    try:
        # Choose a random generation strategy
        strategy = random.choice([1, 2, 3, 4])
        
        if strategy == 1:
            # Prefix + Suffix combination
            name = random.choice(prefixes) + random.choice(suffixes)
        elif strategy == 2:
            # Tech word + suffix
            name = random.choice(tech_words) + random.choice(suffixes)
        elif strategy == 3:
            # Prefix + tech word
            name = random.choice(prefixes) + random.choice(tech_words)
        else:
            # Creative combinations
            if random.choice([True, False]):
                name = random.choice(prefixes) + random.choice(tech_words) + random.choice(suffixes)
            else:
                name = random.choice(tech_words) + random.choice(prefixes)
        
        # Ensure proper capitalization
        name = name.capitalize()
        
        return NameResponse(name=name)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating name: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "startup-name-generator"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
