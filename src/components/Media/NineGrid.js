import React, { Fragment } from 'react';
import {
  Image, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import borders from './borders';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  horizontalSpace: {
    paddingHorizontal: scale(2),
  },
  verticalSpace: {
    paddingVertical: scale(2),
  },
});

const NineGrid = ({ images }) => {
  const firstRow = [images[0], images[1], images[2]];
  const secondRow = [images[3], images[4], images[5]];
  const thirdRow = [images[6], images[7], images[8]];
  return (
    <>
      <View style={styles.container}>
        {firstRow.map((image, index) => (
          <Fragment key={index}>
            <TouchableOpacity style={styles.container}>
              <Image
                source={image}
                style={[
                  styles.image,
                  index === 0 && { ...borders.topLeft },
                  index === 2 && { ...borders.topRight },
                ]}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {(index !== 0 || index !== 2) && <View style={styles.horizontalSpace} />}
          </Fragment>
        ))}
      </View>
      <View style={styles.verticalSpace} />
      <View style={styles.container}>
        {secondRow.map((image, index) => (
          <Fragment key={index}>
            <TouchableOpacity style={styles.container}>
              <Image
                source={image}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {(index !== 0 || index !== 2) && <View style={styles.horizontalSpace} />}

          </Fragment>
        ))}
      </View>
      <View style={styles.verticalSpace} />
      <View style={styles.container}>
        {thirdRow.map((image, index) => (
          <Fragment key={index}>
            <TouchableOpacity style={styles.container}>
              <Image
                source={image}
                style={[
                  styles.image,
                  index === 0 && { ...borders.bottomLeft },
                  index === 2 && { ...borders.bottomRight },
                ]}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {(index !== 0 || index !== 2) && <View style={styles.horizontalSpace} />}

          </Fragment>
        ))}
      </View>
    </>
  );
};

NineGrid.propTypes = {
  images: PropTypes.array.isRequired,
};

export default NineGrid;
