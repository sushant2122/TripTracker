import React from 'react'
import { ActivityIndicator, View } from 'react-native'

function Loading() {
    return (
        <>
            <View className="flex-row justify-center py-8">
                <ActivityIndicator size='large' color='orange' />
            </View>

        </>
    )
}

export default Loading
