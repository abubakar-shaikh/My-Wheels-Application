import React from 'react';
import {
    Container,
    NavBar,
    Avatar,
    Button,
    KeyboardAvoidingView,
    TextField,
    Text,
    Heart,
} from 'components';
import PropTypes from 'prop-types';
import {
    TouchableOpacity, ImageBackground, StyleSheet, View, onPress, ScrollView
} from 'react-native';
import { getScreenWidth } from 'utils/size';
import { scale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from 'themes/colors';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: scale(14),
        backgroundColor: '#fff'
    },
    imageContainer: {
        width: getScreenWidth() / 3,
        aspectRatio: 1 / 1,
        borderRadius: scale(8),
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    info: {
        paddingHorizontal: scale(10),
        paddingVertical: scale(5),
        flex: 1,
    },
    bg: {
        flex: 1
    },
    moreicon: { alignItems: 'center', justifyContent: 'center', padding: scale(10), backgroundColor: 'whitesmoke', borderRadius: 10 }
});

const Savedads = ({ navigation }) => {
    return (
        <Container backgroundColor="white">
            <NavBar
                title="Saves Ads"
                onLeftIconPress={() => navigation.goBack()}
            />
            <View style={{ flex: 1, backgroundColor: 'whitesmoke', padding: scale(10) }}>
                <View style={{ backgroundColor: '#fff', borderRadius: scale(10), padding: scale(5) }}>
                    <View
                        style={styles.container}
                        onPress={onPress}
                    >
                        <View style={styles.imageContainer}>
                            <ImageBackground
                                source={require('images/kia.jpg')}
                                style={styles.bg}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text weight="medium" color="gray75">KIA Picanto 2021</Text>
                            <Text color="gray100" weight="medium" font="h3">PKR  2,400,000</Text>
                            <View style={styles.row}>
                                <MaterialIcons name='location-pin' size={25} color={colors.primaryAlt} />
                                <Text color="gray50">Karachi</Text>
                            </View>
                            <Text color="gray50">2022 | 25 km | Petrol</Text>
                            <Heart />
                        </View>
                    </View>
                   
                </View>
            </View>
        </Container>

    )
}

Savedads.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Savedads;


