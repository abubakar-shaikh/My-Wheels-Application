import { scale } from 'react-native-size-matters';

const radius = scale(8);

export default {
  topLeft: {
    borderTopLeftRadius: radius,
  },
  topRight: {
    borderTopRightRadius: radius,
  },
  leftMost: {
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
  },
  rightMost: {
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
  },
  bottomLeft: {
    borderBottomLeftRadius: radius,
  },
  bottomRight: {
    borderBottomRightRadius: radius,
  },
  top: {
    borderTopRightRadius: radius,
    borderTopLeftRadius: radius,
  },
};
