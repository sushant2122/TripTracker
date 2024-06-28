import React from 'react'
import { Image, Text, View } from 'react-native'

function EmptyList({ message }) {
    return (
        <>
            <View className="flex-col justify-center items-center my-5 space-y-3">
                <Image source={require('../assets/images/empty.png')} className="w-36 h-36 shadow" />
                <Text className="font-bold text-gray-400">
                    {message || 'data not found'}
                </Text>
            </View>
        </>
    )
}

export default EmptyList
