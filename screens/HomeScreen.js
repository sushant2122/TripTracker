import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { PlusIcon, ArrowLeftOnRectangleIcon } from 'react-native-heroicons/outline';
import { signOut } from 'firebase/auth';
import { auth, tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import { query, getDocs, where } from 'firebase/firestore';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../Components/EmptyList';

function HomeScreen() {
    const navigation = useNavigation();
    const { user } = useSelector(state => state.user);
    const [trips, setTrips] = useState([]);
    const isFocused = useIsFocused();

    const fetchTrips = async () => {
        const q = query(tripsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {

            data.push({ ...doc.data(), id: doc.id })

        });
        setTrips(data);
    };

    useEffect(() => {
        if (isFocused) {
            fetchTrips();
        }
    }, [isFocused]);

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="p-4 flex-row justify-between items-center">
                <Text className="text-3xl font-bold text-black">
                    <Text className="text-orange-400">Trip</Text>Tracker
                </Text>
                <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                    <Text className="font-bold">
                        <ArrowLeftOnRectangleIcon size={15} color="black" /> Logout
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center bg-orange-400 rounded-xl mx-9 mb-4">
                <Image source={require('../assets/images/banner.png')} className="w-56 h-56" />
            </View>
            <View>
                <View className="flex-row justify-between items-center mx-4 mb-4">
                    <Text className="text-2xl font-bold text-black">
                        <Text className="text-orange-400">Recent </Text>Trips
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddTrip')} className="bg-white p-3 px-3 rounded-full items-center">
                        <Text className="font-bold">
                            <PlusIcon size={14} color="black" /> Add Trip
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="mx-4" style={{ height: 430 }}>
                    <FlatList
                        data={trips}
                        numColumns={2}
                        ListEmptyComponent={<EmptyList message={"You haven't recorded any trips yet."} />}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('TripExpenses', { ...item })} className="mx-1 bg-white p-4 rounded-2xl mb-4 shadow-md">
                                <View>
                                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                                    <Text className="text-lg font-bold text-black">{item.place}</Text>
                                    <Text className="text-sm font-bold text-black">{item.country}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView >
    );
}

export default HomeScreen;