import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

const SceneContent = () => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 0,
        z: 5,
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

const Scene = () => {
  return (
    <div className="h-full w-full">
      <Canvas>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene; 