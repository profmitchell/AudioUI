import { useRef, useEffect, useState } from 'react';
import { useAudioContext } from './use-audio-context';

/**
 * Hook to create and manage Web Audio API nodes
 * 
 * @param nodeCreator - Function that creates the audio node
 * @param deps - Dependencies array for when to recreate the node
 * @returns The created audio node
 */
export function useAudioNode<T extends AudioNode>(
  nodeCreator: (context: AudioContext) => T,
  deps: React.DependencyList = []
) {
  const { audioContext } = useAudioContext();
  const [node, setNode] = useState<T | null>(null);
  const prevDepsRef = useRef<React.DependencyList>([]);

  useEffect(() => {
    // Only proceed if we have an audio context
    if (!audioContext) return;

    // Check if dependencies changed
    const depsChanged = deps.some((dep, i) => dep !== prevDepsRef.current[i]);
    prevDepsRef.current = deps;

    // Create node if it doesn't exist or deps changed
    if (!node || depsChanged) {
      // If we already have a node, disconnect it
      if (node) {
        node.disconnect();
      }

      try {
        // Create the new node
        const newNode = nodeCreator(audioContext);
        setNode(newNode);
      } catch (error) {
        console.error('Error creating audio node:', error);
        setNode(null);
      }
    }

    // Cleanup function
    return () => {
      if (node) {
        node.disconnect();
      }
    };
  }, [audioContext, ...deps]);

  return node;
}
