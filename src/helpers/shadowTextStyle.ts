interface ShadowTextStyle {
  textShadow: string;
}

export interface ShadowTextParams {
  offsetX?: string;
  offsetY?: string;
  blurRadius?: string;
  color?: string;
  theme?: 'light' | 'dark';
}

export const shadowText = ({
  offsetX = '1px',
  offsetY = '1px',
  blurRadius = '1px',
  color,
  theme = 'light',
}: ShadowTextParams = {}): ShadowTextStyle => {
  const resolvedColor =
    color ?? (theme === 'dark' ? 'rgb(255,255,255, 0.5)' : 'rgba(0, 0, 0, 0.5)');
  return {
    textShadow: `${offsetX} ${offsetY} ${blurRadius} ${resolvedColor}`,
  };
};
