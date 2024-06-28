import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
function BackButton() {
    const navigation = useNavigation();
    return (
        <>
            <TouchableOpacity onPress={() => navigation.goBack()} className="mx-3 text-black">
                <ChevronLeftIcon size="30" color="orange" />

            </TouchableOpacity>
        </>
    )
}

export default BackButton
