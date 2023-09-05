import React, { useRef, useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Text from '../Text';
import BottomSheet from '../Layout/BottomSheet';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray5,
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    borderRadius: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  contentContainer: {
    padding: scale(14),
  },
  option: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(4),
    borderRadius: scale(4),
    backgroundColor: Colors.gray10,
    marginRight: scale(14),
    marginTop: scale(14),
    borderWidth: 1,
    borderColor: Colors.gray10,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
});

const Option = ({ label, value, onPress }) => {
  const isSelected = label === value;
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.option,
        isSelected && styles.selected,
      ])}
      onPress={() => onPress(label)}
    >
      <Text color={isSelected ? 'primary' : 'gray100'}>{label}</Text>
    </TouchableOpacity>
  );
};

const Select = ({
  value, options, renderContentHeader, optionTitle, renderTouchable,
}) => {
  const sheetRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(value);

  return (
    <>
      {renderTouchable && renderTouchable({
        onPress: () => sheetRef.current.open(),
        value: selectedValue,
      })}
      {!renderTouchable && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => sheetRef.current.open()}
        >
          <Text flex color="gray75">{value}</Text>
          <Icon
            name="chevron-down"
            size={scale(14)}
            color={Colors.gray50}
          />
        </TouchableOpacity>
      )}
      <BottomSheet sheetRef={sheetRef} buttonText="Confirm">
        {renderContentHeader && renderContentHeader()}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {optionTitle && <Text>{optionTitle}</Text>}
          <View style={styles.content}>
            {options.map((option) => (
              <Option
                key={option}
                label={option}
                value={selectedValue}
                onPress={setSelectedValue}
              />
            ))}
          </View>
        </ScrollView>
      </BottomSheet>
    </>
  );
};

Select.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  renderContentHeader: PropTypes.func,
  renderTouchable: PropTypes.func,
  optionTitle: PropTypes.string,
};

Select.defaultProps = {
  renderContentHeader: null,
  renderTouchable: null,
  optionTitle: null,
};

Option.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Select;
