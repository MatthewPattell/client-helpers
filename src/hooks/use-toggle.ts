import { useCallback, useMemo, useState } from 'react';

/**
 * Switch between true or false
 */
const useToggle = (initialState = false): [boolean, () => void] => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(() => setIsToggled((prevState) => !prevState), []);

  return useMemo(() => [isToggled, toggle], [isToggled, toggle]);
};

export default useToggle;
