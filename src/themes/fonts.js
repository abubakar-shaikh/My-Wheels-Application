import { scale } from 'react-native-size-matters';

const fontFamily = {
  medium: 'OpenSans-SemiBold',
  regular: 'OpenSans-Regular',
};

const fonts = {
  h1: (weight = 'regular') => ({
    fontSize: scale(32),
    fontFamily: fontFamily[weight],
  }),
  h2: (weight = 'regular') => ({
    fontSize: scale(20),
    fontFamily: fontFamily[weight],
  }),
  h3: (weight = 'regular') => ({
    fontSize: scale(16),
    fontFamily: fontFamily[weight],
  }),
  h4: (weight = 'regular') => ({
    fontSize: scale(14),
    fontFamily: fontFamily[weight],
  }),
  h5: (weight = 'regular') => ({
    fontSize: scale(10),
    fontFamily: fontFamily[weight],
  }),
  h6: (weight = 'regular') => ({
    fontSize: scale(8),
    fontFamily: fontFamily[weight],
  }),
  p1: (weight = 'regular') => ({
    fontSize: scale(15),
    fontFamily: fontFamily[weight],
  }),
  p2: (weight = 'regular') => ({
    fontSize: scale(13),
    fontFamily: fontFamily[weight],
  }),
};

export default fonts;

export const fontProps = Object.keys(fonts).map((font) => font);
