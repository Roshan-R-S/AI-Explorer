"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Generate sample data points
const generateDataPoints = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] as [
      number,
      number,
      number,
    ],
    value: Math.random() * 100,
    category: ["Sales", "Marketing", "Support", "Development"][Math.floor(Math.random() * 4)],
  }))
}

const categoryColors = {
  Sales: "#10b981",
  Marketing: "#f59e0b",
  Support: "#ef4444",
  Development: "#8b5cf6",
}

function DataPoint({
  position,
  value,
  category,
  onClick,
}: {
  position: [number, number, number]
  value: number
  category: string
  onClick: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[1]) * 0.1
    }
  })

  const scale = Math.max(0.1, value / 50)
  const color = categoryColors[category as keyof typeof categoryColors]

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? scale * 1.2 : scale}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </mesh>
  )
}

function DataConnections({ dataPoints }: { dataPoints: any[] }) {
  const linesRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!linesRef.current) return

    // Clear existing lines
    linesRef.current.clear()

    // Create connections between nearby points
    dataPoints.forEach((point, i) => {
      dataPoints.slice(i + 1).forEach((otherPoint) => {
        const distance = new THREE.Vector3(...point.position).distanceTo(new THREE.Vector3(...otherPoint.position))

        if (distance < 3) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...point.position),
            new THREE.Vector3(...otherPoint.position),
          ])

          const material = new THREE.LineBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.2,
          })

          const line = new THREE.Line(geometry, material)
          linesRef.current?.add(line)
        }
      })
    })
  }, [dataPoints])

  return <group ref={linesRef} />
}

function FloatingText({ position, text }: { position: [number, number, number]; text: string }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[2, 0.5]} />
      <meshBasicMaterial color="#1f2937" transparent opacity={0.8} />
    </mesh>
  )
}

function Scene() {
  const [dataPoints] = useState(() => generateDataPoints(50))
  const [selectedPoint, setSelectedPoint] = useState<any>(null)

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />

      {/* Data connections */}
      <DataConnections dataPoints={dataPoints} />

      {/* Data points */}
      {dataPoints.map((point) => (
        <DataPoint
          key={point.id}
          position={point.position}
          value={point.value}
          category={point.category}
          onClick={() => setSelectedPoint(point)}
        />
      ))}

      {/* Selected point info */}
      {selectedPoint && (
        <FloatingText
          position={[selectedPoint.position[0], selectedPoint.position[1] + 1, selectedPoint.position[2]]}
          text={`${selectedPoint.category}: ${selectedPoint.value.toFixed(1)}`}
        />
      )}

      {/* Camera controls */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  )
}

export function DataVisualization3D() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-[600px] w-full bg-slate-900 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">Loading 3D visualization...</div>
      </div>
    )
  }

  return (
    <div className="h-[600px] w-full bg-slate-900 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Scene />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-4">
        <h4 className="text-white font-medium mb-2">Categories</h4>
        <div className="space-y-1">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm text-gray-300">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
        <div className="text-xs text-gray-400 space-y-1">
          <div>🖱️ Drag to rotate</div>
          <div>🔍 Scroll to zoom</div>
          <div>👆 Click points for details</div>
        </div>
      </div>
    </div>
  )
}
