import { useCallback, useMemo, useState } from 'react';

/**
 * Switch between true or false
 */
const useToggle = (
  initialState = false,
): {
  isToggled: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
  setToggled: (value: boolean) => void;
} => {
  const [isToggled, setToggled] = useState(initialState);

  const toggle = useCallback(() => setToggled((prevIsToggled) => !prevIsToggled), []);

  const close = useCallback(() => setToggled(false), []);

  const open = useCallback(() => setToggled(true), []);

  return useMemo(
    () => ({ isToggled, toggle, close, open, setToggled }),
    [close, open, isToggled, toggle],
  );
};

export default useToggle;
