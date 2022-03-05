import Shadow, { ShadowHeight } from './Shadow';

interface iIconButtonParams {
  icon: string;
  onClick: () => void;
  color?: string;
}

export function IconButton({
  icon,
  onClick,
  color = 'bg-surface',
}: iIconButtonParams) {
  return (
    <Shadow color={color} height={ShadowHeight.four}>
      <button
        className="bg-surface border-3 border-onSurface p-2 center rounded-xl"
        onClick={onClick}
      >
        <span className="material-icons">{icon}</span>
      </button>
    </Shadow>
  );
}
