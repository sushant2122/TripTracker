import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../Components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import { addDoc } from 'firebase/firestore';
import Loading from '../Components/Loading';
import Snackbar from 'react-native-snackbar';
function AddTripScreen() {
    const [place, setPlace] = useState('');
    const [country, setCountry] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.user);

    const handleCountryChange = (value) => {
        const stringValue = value.replace(/[^a-zA-Z ]/g, ''); // Allow only letters and spaces
        setCountry(stringValue);
    };

    const handleAddTrip = async () => {
        if (place && country) {
            setLoading(true);
            try {
                let doc = await addDoc(tripsRef, {
                    place,
                    country,
                    userId: user.uid
                });
                setLoading(false);
                if (doc && doc.id) {
                    navigation.goBack();
                }
            } catch (error) {
                setLoading(false);
                //  Alert.alert("Error", "Failed to add trip.", [{ text: "OK" }], { cancelable: true });
                Snackbar.show({
                    text: 'Failed to add trip.',
                    backgroundColor: 'red'
                });
            }
        } else {
            //Alert.alert("Fill details", "Please enter the details.", [{ text: "OK" }], { cancelable: true });
            Snackbar.show({
                text: 'Please enter all the trip details',
                backgroundColor: 'red'
            });
        }
    };

    return (
        <SafeAreaView className="mx-4 mt-1">
            <View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-bold text-2xl">
                        <Text className="text-orange-400">Add </Text>Trip
                    </Text>
                    <BackButton />
                </View>
                <View className="flex-row justify-center">
                    <Image className="w-80 h-80" source={require('../assets/images/9.png')} />
                </View>
                <View className="flex">
                    <Text className="font-bold text-2xl mb-2"> Where on Earth?</Text>
                    <TextInput
                        value={place}
                        onChangeText={value => setPlace(value)}
                        className="p-3 border border-orange-400 rounded-full mb-4 bg-white"
                    />
                    <Text className="font-bold text-2xl mb-2"> Which country?</Text>
                    <TextInput
                        value={country}
                        onChangeText={handleCountryChange}
                        className="p-3 border border-orange-400 rounded-full mb-4 bg-white"
                    />
                </View>
                <View>
                    {loading ? (
                        <Loading />
                    ) : (
                        <View className="flex-row justify-center">
                            <TouchableOpacity
                                onPress={handleAddTrip}
                                className="bg-orange-400 p-4 rounded-full mt-6 w-80"
                            >
                                <Text className="font-bold text-center text-white text-lg">
                                    Add Trip
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default AddTripScreen;