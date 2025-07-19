interface ShadowTextStyle {
  textShadow: string;
}

interface ShadowTextParams {
  offsetX: string;
  offsetY: string;
  blurRadius: string;
  color: string;
}

export const shadowText = (
  {
    offsetX = '2px',
    offsetY = '2px',
    blurRadius = '4px',
    color = 'rgba(0, 0, 0, 0.5)',
  }: ShadowTextParams = {} as ShadowTextParams,
): ShadowTextStyle => {
  return {
    textShadow: `${offsetX} ${offsetY} ${blurRadius} ${color}`,
  };
};
