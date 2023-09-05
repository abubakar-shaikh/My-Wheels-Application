import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Visa from 'svgs/visa.svg';
import MasterCard from 'svgs/mastercard.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../Card';
import Text from '../Text';
import Checkbox from './Checkbox';

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(14),
  },
  card: {
    padding: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: scale(14),
    flex: 1,
  },
  leftContainer: {
    minWidth: scale(40),
    minHeight: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PaymentSelect = ({ options, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getIcon = (option) => {
    if (option?.icon) {
      return (
        <Icon
          name={option.icon}
          color={option.iconColor}
          size={scale(24)}
        />
      );
    }
    return option?.cardType === 'visa' ? <Visa /> : <MasterCard />;
  };

  const onPaymentSelect = (index) => {
    setSelectedIndex(index);

    if (onSelect) {
      const selected = options[index];
      onSelect({
        title: selected?.title || selected?.cardNumber,
        subtitle: selected?.subtitle || 'Credit / Debit Card',
        Icon: getIcon(selected),
      });
    }
  };

  return (
    <>
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        return (
          <TouchableOpacity
            key={option?.cardNumber || option?.title}
            style={styles.container}
            onPress={() => onPaymentSelect(index)}
          >
            <Card style={styles.card}>
              <View style={styles.leftContainer}>
                {getIcon(option)}
              </View>
              <View style={styles.contentContainer}>
                <Text>{option?.title || option.bankName}</Text>
                {(option?.subtitle || option.cardNumberMasked) && (
                  <Text color="gray50">
                    {option?.subtitle || option.cardNumberMasked}
                  </Text>
                )}
              </View>
              <Checkbox
                value={isSelected}
                controlledExternally
              />
            </Card>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

PaymentSelect.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
};

PaymentSelect.defaultProps = {
  onSelect: null,
};

export default PaymentSelect;
