import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'


function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <>
            <SafeAreaView className="m-4">
                <View>
                    <View className="flex-row justify-center my-3">
                        <Image source={require('../assets/images/welcome.png')} className="h-80 w-80 shadow" />
                    </View>
                    <View>
                        <View className="flex-row justify-center mt-20 mb-10">
                            <Text className='font-bold text-4xl shadow-sm'>
                                <Text className="text-orange-400">Trip</Text>Tracker
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Signin')} className="bg-orange-400 p-3 rounded-full m-4 mt-15
                        ">
                            <Text className="font-bold text-white text-center text-lg">Sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')} className="bg-orange-400 p-3 rounded-full
                        m-4">
                            <Text className="font-bold text-white text-center text-lg">Sign up</Text>
                        </TouchableOpacity>

                    </View>

                </View>


            </SafeAreaView>


        </>
    )
}

export default WelcomeScreen
