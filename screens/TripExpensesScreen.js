import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../Components/BackButton';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../Components/EmptyList';
import ExpenseCard from '../Components/ExpenseCard';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import { useIsFocused } from '@react-navigation/native';
import { query, getDocs, where } from 'firebase/firestore';
import { expensesRef } from '../config/firebase';
import { useState } from 'react';



function TripExpensesScreen(props) {
    const { id, place, country } = props.route.params;
    const navigation = useNavigation();
    const [expenses, setExpenses] = useState([]);
    const isFocused = useIsFocused();

    const fetchExpenses = async () => {
        const q = query(expensesRef, where("tripId", "==", id));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {

            data.push({ ...doc.data(), id: doc.id })

        });
        setExpenses(data);
    };

    useEffect(() => {
        if (isFocused) {
            fetchExpenses();
        }

    }, [isFocused]);


    return (
        <SafeAreaView>
            <View className="flex">
                <View className="flex-row justify-between items-center m-3">
                    <View className="flex-row items-center justify-between">
                        <Text className="font-bold text-2xl">
                            <Text className="text-orange-400">Trip </Text>Expenses
                        </Text>
                    </View>
                    <BackButton />
                </View>
                <View className="flex-row justify-center items-center m-1  bg-orange-200  rounded-full mx-9 ">
                    <View>
                        <Text className="font-bold text-xl"> {place}</Text>
                        <Text className=" text-sm text-center"> {country}</Text>
                    </View>

                </View>

                <View className="flex-row justify-center bg-orange-200 rounded-xl mx-9 mb-4">

                    <Image source={require('../assets/images/6.png')} className="w-80 h-80" />
                </View>
                <View>
                    <View className="flex-row justify-between items-center mx-4 mb-4">
                        <Text className={`${colors.heading} font-bold text-2xl shadow-sm`}>
                            <Text className="text-orange-400">Expenses</Text>
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddExpense', { id, place, country })} className="bg-white p-2 px-3 rounded-full items-center">
                            <Text className="font-bold">Add Expenses</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mx-4 " style={{ height: 430 }}>
                        <FlatList
                            data={expenses}
                            ListEmptyComponent={<EmptyList message={"No expenses added."} />}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) =>
                                <ExpenseCard item={item} />}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default TripExpensesScreen;