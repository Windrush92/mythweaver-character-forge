import { useCallback, useRef } from 'react';

interface UseLongPressOptions {
  threshold?: number;
  onLongPress: () => void;
  onClick?: () => void;
}

const isInteractiveTarget = (e: React.MouseEvent | React.TouchEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return false;
  return Boolean(
    target.closest('button, input, select, textarea, [data-prevent-card-action="true"]')
  );
};

export function useLongPress({
  threshold = 420,
  onLongPress,
  onClick,
}: UseLongPressOptions) {
  const isLongPressTriggered = useRef(false);
  const timerRef = useRef<any>(null);

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      // Only handle primary button for mouse (left click)
      if ('button' in e && e.button !== 0) return;
      if (isInteractiveTarget(e)) return;

      isLongPressTriggered.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        isLongPressTriggered.current = true;
        onLongPress();
      }, threshold);
    },
    [onLongPress, threshold]
  );

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const end = useCallback(
    (e: React.MouseEvent | React.TouchEvent, triggerClick = true) => {
      cancel();
      if (isInteractiveTarget(e)) {
        return;
      }
      if (!isLongPressTriggered.current && triggerClick && onClick) {
        onClick();
      }
      // Reset trigger flag slightly later to prevent any synthetic click events
      setTimeout(() => {
        isLongPressTriggered.current = false;
      }, 80);
    },
    [cancel, onClick]
  );

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: (e: React.MouseEvent) => end(e, true),
    onTouchEnd: (e: React.TouchEvent) => end(e, true),
    onMouseLeave: () => cancel(),
    onTouchCancel: () => cancel(),
    onContextMenu: (e: React.MouseEvent) => {
      if (isInteractiveTarget(e)) return;
      e.preventDefault();
      cancel();
      onLongPress();
    },
  };
}
