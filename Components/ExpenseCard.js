import React from 'react'
import { View, Text } from 'react-native'
import { CategoryBG } from '../theme'


function ExpenseCard({ item }) {
    return (
        <>
            <View style={{ backgroundColor: CategoryBG[item.category] }} className="flex-row justify-between p-3  rounded-full m-2 items-center">
                <View>
                    <Text className="font-bold text-base">{item.thing}</Text>
                    <Text className="font-bold text-xs ">{item.category}</Text>

                </View>
                <View>
                    <Text className="font-bold text-lg text-gray "> ${item.amount}</Text>
                </View>
            </View>
        </>
    )
}

export default ExpenseCard
