import { useCallback, useMemo, useState } from 'react';

/**
 * Switch between true or false
 * [isToggled, toggle, close]
 */
const useToggle = (initialState = false): [boolean, () => void, () => void] => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(() => setIsToggled((prevIsToggled) => !prevIsToggled), []);

  const close = useCallback(() => setIsToggled(false), []);

  return useMemo(() => [isToggled, toggle, close], [close, isToggled, toggle]);
};

export default useToggle;
