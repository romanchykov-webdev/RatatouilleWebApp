interface ShadowBoxStyle {
  boxShadow: string;
}

interface ShadowBoxParams {
  offsetX?: string;
  offsetY?: string;
  blurRadius?: string;
  spreadRadius?: string;
  color?: string;
  theme?: 'light' | 'dark';
}

export const shadowBox = ({
  offsetX = '2px',
  offsetY = '2px',
  blurRadius = '6px',
  spreadRadius = '1px',
  color,
  theme = 'light',
}: ShadowBoxParams = {}): ShadowBoxStyle => {
  const resolvedColor =
    color ?? (theme === 'dark' ? 'rgb(255,255,255, 0.3)' : 'rgba(0, 0, 0, 0.3)');
  return {
    boxShadow: `${offsetX} ${offsetY} ${blurRadius} ${spreadRadius} ${resolvedColor}`,
  };
};
