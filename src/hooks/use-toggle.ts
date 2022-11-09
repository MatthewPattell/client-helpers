import { useCallback, useMemo, useState } from 'react';

/**
 * Switch between true or false
 */
const useToggle = (initialState = false): [boolean, () => void, () => void] => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(() => setIsToggled((prevState) => !prevState), []);

  const switchToFalse = useCallback(() => setIsToggled(false), []);

  return useMemo(() => [isToggled, toggle, switchToFalse], [isToggled, toggle, switchToFalse]);
};

export default useToggle;
