interface ShadowBoxStyle {
  boxShadow: string;
}

export interface ShadowBoxParams {
  offsetX?: string;
  offsetY?: string;
  blurRadius?: string;
  spreadRadius?: string;
  color?: string;
  theme?: 'light' | 'dark';
}

export const shadowBox = ({
  offsetX = '1px',
  offsetY = '1px',
  blurRadius = '5px',
  spreadRadius = '1px',
  color,
  theme = 'light',
}: ShadowBoxParams = {}): ShadowBoxStyle => {
  const resolvedColor =
    color ?? (theme === 'dark' ? 'rgba(255,255,255, 0.5)' : 'rgba(0, 0, 0, 0.5)');
  return {
    boxShadow: `${offsetX} ${offsetY} ${blurRadius} ${spreadRadius} ${resolvedColor}`,
  };
};
