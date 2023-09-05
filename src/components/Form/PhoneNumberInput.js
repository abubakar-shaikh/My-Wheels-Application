import React, { useState } from 'react';
import { TouchableOpacity, FlatList, View, TextInput, StyleSheet, Platform, I18nManager,Text } from 'react-native';

// Internal Imports
import countries from '../../utils/CountriesList.json';
import { h3, h4, h5 } from '../../utils/Styles';
import BoldText from '../TextComponents/BoldText'
import RegularText from '../TextComponents/RegularText'

// External Imports
import Modal from 'react-native-modal'
import { Divider, Input } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons'



export default function CountryPicker({ placeholder, label, onSelectData, onChangeText, value, disabled, errorMessage, autoFocus, isError, phoneInputContainerStyle, containerStyle, inputContainerStyle, inputInnerContainerStyle,length, inputStyle, keyboardType, ...props }) {
    const [modalVisible, setModalVisible] = useState(props.modalVisible)
    const [countrCode, setCountryCode] = useState(props.initialValue.split(' ')[0])
    const [countryFlag, setCountryFlag] = useState(props.initialValue.split(' ')[1])
    const [country_with_Flag, setCountry_with_Flag] = useState(props.initialValue)
    const [data, setData] = useState(countries)
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    function renderData(data) {
        return (
            <TouchableOpacity
                onPress={() => {
                    onSelectData(data.item.dial_code)
                    setCountryCode(data.item.dial_code)
                    setCountryFlag(data.item.flag)
                    setCountry_with_Flag(data.item.flag + data.item.dial_code)
                    setModalVisible(false)
                }}
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BoldText text={data.item.flag} textStyle={{ marginRight: 10, ...h3 }} />
                    <RegularText text={data.item.dial_code} textStyle={{ color: '#111719', ...h5 }} />
                </View>

                <RegularText numberOfLines={1} text={data.item.name} textStyle={{ color: '#111719', ...h5 }} />
            </TouchableOpacity>
        )
    }

    function openModal() {

        const hanldeSearch = (val) => {
            if (val.length > 0) {
                const newData = countries.filter(dt => dt.name.toLowerCase().includes(val.toLowerCase()))
                setData(newData)
            }
            else {
                setData(countries)
            }
        }

        return (
            <Modal
                style={{ margin: 0 }}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating={true}
                isVisible={modalVisible}
                animationInTiming={500}
                animationOutTiming={500}
                onBackdropPress={() => (setModalVisible(false), setData(countries))}
            >

                <View style={{
                    flex: 1,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: wp(5),
                    borderTopRightRadius: wp(5),
                    height: Platform.OS == 'android' ? hp(50) : hp(60),
                    padding: wp(5)
                }}>
                    <TextInput
                        placeholder={'search Here'}
                        style={{
                            borderWidth: 1,
                            borderColor: "#E5E5E5",
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            ...h5,
                            fontFamily: 'Lato-Regular',
                            height: hp(6),
                            // paddingTop:10, 
                            color: '#111719',
                            textAlign:'left'
                        }}
                        // inputStyle={{ textAlign: I18nManager?.isRTL ? 'right' : 'left' }}
                        onChangeText={hanldeSearch}
                    />
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderData}
                    />
                </View>
            </Modal>
        )
    }

    return (
        <View style={phoneInputContainerStyle}>
            <RegularText text={label} textStyle={styles.labelStyle} />
            <View style={[styles.containerStyle, isError ? { borderWidth: 1, borderColor: '#EB5757' } : isFocused ? { borderWidth: 1, borderColor: '#486f4f' } : { borderWidth: 1, borderColor: '#E5E5E5' }]}>
                <TouchableOpacity onPress={() => { if (!props.isVan) { setModalVisible(true) } }} style={styles.inputCodeContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <BoldText text={countryFlag} textStyle={{ marginRight: 5, ...h4 }} />
                        <RegularText text={countrCode} textStyle={{ color: '#9796A1', ...h4 }} />
                    </View>
                    <Icon name='keyboard-arrow-down' color={'#9796A1'} size={wp(5)} />
                </TouchableOpacity>
                <Divider orientation="vertical" style={{ marginHorizontal: wp(1), backgroundColor: '#eeeeee' }} />
                <Input
                    keyboardType='phone-pad'
                    maxLength={length ? 10 : 13}
                    value={value}
                    style={{ fontFamily: 'Lato-Regular' }}
                    autoFocus={autoFocus}
                    containerStyle={[styles.inputMainContainerStyle, inputContainerStyle]}
                    inputContainerStyle={[styles.inputContainerStyle, inputInnerContainerStyle]}
                    inputStyle={[styles.inputStyle, inputStyle]}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disabled}
                />
                {openModal()}

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    labelStyle: {
        ...h5,
        color: '#9796A1',
        marginLeft: wp(2),
        marginBottom: hp(0.75),
        textAlign:'left'
    },
    containerStyle: {
        padding: 0,
        backgroundColor: "#fff",
        flexDirection: 'row',
        height: hp(7),
        paddingLeft: wp(2),
        paddingRight: wp(4),
        borderRadius: wp(4),
        shadowColor: "rgb(113, 113, 113)",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    inputCodeContainer: {
        height: '100%',
        width: '30%',
        borderTopLeftRadius: wp(4),
        borderBottomLeftRadius: wp(4),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(2)
    },
    inputMainContainerStyle: {
        borderBottomWidth: 0
    },
    inputContainerStyle: {
        padding: 0,
        height: hp(7),
        borderBottomWidth: 0
    },
    inputStyle: {
        height: hp(7),
        ...h4,
        textAlign:'left'
    }
})
