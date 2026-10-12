import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * The "digital intelligence" layer — a restrained field of glowing
 * points with faint connecting lines, representing sensors/data nodes
 * across the plant. Deliberately sparse and slow: this should read as
 * "mission control telemetry," not a particle-effect game background.
 *
 * Rendered as its own transparent Canvas, sitting between the factory
 * silhouette (behind) and the HUD cards (in front) in the layer stack.
 */
function Nodes({ scrollProgress, mouse }) {
  const groupRef = useRef();
  const pointsRef = useRef();

  // Generate a fixed set of node positions once — spread in a shallow
  // volume so it reads as a layer, not a sphere of noise.
  const { positions, count } = useMemo(() => {
    const count = 70;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4; // z — shallow depth
    }
    return { positions, count };
  }, []);

  // A handful of connecting lines between nearby nodes — just enough to
  // suggest a network without becoming a web of noise.
  const linePositions = useMemo(() => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      if (Math.random() > 0.88) {
        const j = Math.floor(Math.random() * count);
        lines.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        );
      }
    }
    return new Float32Array(lines);
  }, [positions, count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle ambient drift — alive but not busy
    groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.04 + mouse.x * 0.08;
    groupRef.current.rotation.x = mouse.y * -0.04;

    // Layer moves subtly with scroll — the "faster" HUD layer from the brief
    groupRef.current.position.y = scrollProgress.current * 1.2;
    groupRef.current.position.z = scrollProgress.current * -1.5;

    if (pointsRef.current) {
      pointsRef.current.material.opacity =
        0.35 + Math.sin(t * 0.8) * 0.08 + scrollProgress.current * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#00C9A7"
          transparent
          opacity={0.45}
          sizeAttenuation
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#028090" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function DataParticleField({ scrollProgressRef, mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Nodes scrollProgress={scrollProgressRef} mouse={mouse} />
    </Canvas>
  );
}
