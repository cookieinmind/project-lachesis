import { useMemo } from 'react';
import Shadow, { ShadowHeight } from './Shadow';

interface iIconButtonParams {
  label?: string;
  icon: string;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
  loadingState?: {
    isLoading: boolean;
    loadingLabel: string;
  };
}

export function IconButton({
  label,
  icon,
  onClick,
  color = 'bg-surface',
  disabled = false,
  loadingState,
}: iIconButtonParams) {
  const padding = label ? 'p-4' : 'p-2';
  const loading = useMemo(() => loadingState?.isLoading, [loadingState]);
  const height =
    disabled || loading
      ? ShadowHeight.none
      : label
      ? ShadowHeight.six
      : ShadowHeight.four;
  const finalColor = disabled ? 'bg-surface' : color;

  const loadingClass = loading ? 'dashed-border' : 'border-3 border-onSurface';
  const border = disabled ? 'border-2' : loadingClass;

  return (
    <Shadow color={finalColor} height={height}>
      <button
        className={`bg-surface ${border} p-2 flex items-center gap-4 center rounded-xl ${padding}`}
        onClick={onClick}
        disabled={disabled}
      >
        <span className={`material-icons ${loading ? 'animate-spin' : ''}`}>
          {!loading && icon}
          {loading && 'loop'}
        </span>

        {label && (
          <span
            className={`font-content pb-0.5 capitalize font-bold ${
              loading ? 'animate-pulse' : ''
            }`}
          >
            {loading && loadingState.loadingLabel}
            {!loading && label}
          </span>
        )}
      </button>
    </Shadow>
  );
}
