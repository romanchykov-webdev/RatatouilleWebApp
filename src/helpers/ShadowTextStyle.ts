interface ShadowTextStyle {
  textShadow: string;
}

interface ShadowTextParams {
  offsetX?: string;
  offsetY?: string;
  blurRadius?: string;
  color?: string;
  theme?: 'light' | 'dark';
}

export const shadowText = ({
  offsetX = '2px',
  offsetY = '2px',
  blurRadius = '4px',
  color,
  theme = 'light',
}: ShadowTextParams = {}): ShadowTextStyle => {
  const resolvedColor =
    color ?? (theme === 'dark' ? 'rgb(255,255,255, 0.3)' : 'rgba(0, 0, 0, 0.3)');
  return {
    textShadow: `${offsetX} ${offsetY} ${blurRadius} ${resolvedColor}`,
  };
};
