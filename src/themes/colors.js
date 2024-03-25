const colors = {
  tertiary: '#B02329',
  primaryAlt: '#B02329',
  primary: '#B02329',
  brightRed: '#EE4B2B',
  primaryBg: '#FCEACE',
  secondary: '#2A234E',
  green: '#4FCE82',
  white: '#FFFFFF',
  transparant: 'transparent',
  blue: '#0073D8',
  blueAlt: '#ECF6FF',
  // #cc3b41
  // shades of gray
  gray5: '#F2f2f2',
  gray10: '#E6E6E6',
  gray25: '#BFBFBF',
  gray50: '#808080',
  gray75: '#404040',
  gray100: '#191919',
};

export default colors;

export const colorProps = Object.keys(colors).map(color => color);
