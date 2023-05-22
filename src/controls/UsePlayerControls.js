import { useState, useEffect } from 'react';

const usePlayerControls = () => {
  const [forward, setForward] = useState(false);
  const [backward, setBackward] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  useEffect(() => {
      const handleKeyDown = (e) => {
      switch (e.key) {
        case 'w':
          setForward(true);
          break;
        case 's':
          setBackward(true);
          break;
        case 'a':
          setLeft(true);
          break;
        case 'd':
          setRight(true);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case 'w':
          setForward(false);
          break;
        case 's':
          setBackward(false);
          break;
        case 'a':
          setLeft(false);
          break;
        case 'd':
          setRight(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  console.log('forward',forward, 'backward',backward, 'left',left, 'right',right);

  return { forward, backward, left, right };
};

export default usePlayerControls;
