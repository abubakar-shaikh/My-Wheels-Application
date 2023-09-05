import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  event: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray25,
    backgroundColor: Colors.gray10,
  },
  track: {
    borderLeftWidth: 1,
    height: 'auto',
    flex: 1,
    borderColor: Colors.gray25,
  },
  block: {
    marginRight: scale(14),
    alignItems: 'center',
    minHeight: scale(80),
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  passedEvent: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
  },
  passedTrack: {
    borderColor: Colors.primary,
  },
});

const Timeline = ({ children, reverse, currentIndex }) => {
  const blocks = React.Children.toArray(children);

  const displayBlocks = blocks.map((block, index) => {
    const passedEvent = reverse ? currentIndex >= index : currentIndex > index;
    const currentEvent = currentIndex === index;

    const getIconColor = () => {
      if (currentEvent) {
        return Colors.white;
      } if (passedEvent) {
        return Colors.primary;
      }
      return Colors.gray25;
    };

    return (
      <View style={styles.container} key={index}>
        <View style={styles.block}>
          <View style={[
            styles.event,
            passedEvent && styles.passedEvent,
            currentEvent && styles.selected,
          ]}
          >
            <Icon
              name={block.props.icon}
              size={scale(20)}
              color={getIconColor()}
            />
          </View>
          {(!block.props.hideTrack) && (
            <View
              style={[
                styles.track,
                passedEvent && styles.passedTrack]}
            />
          )}
        </View>
        {block}
      </View>
    );
  });

  return reverse ? displayBlocks.reverse() : displayBlocks;
};

Timeline.propTypes = {
  currentIndex: PropTypes.number,
  reverse: PropTypes.bool,
};

Timeline.defaultProps = {
  currentIndex: 0,
  reverse: false,
};

export default Timeline;
