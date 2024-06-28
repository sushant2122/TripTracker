import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../Components/BackButton'
import { useNavigation } from '@react-navigation/native';
import { Categories } from '../constraints';
import { expensesRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import { addDoc } from 'firebase/firestore';
import Loading from '../Components/Loading';
import Snackbar from 'react-native-snackbar';
function AddExpenseScreen(props) {
    let { id } = props.route.params;
    const [thing, setThing] = useState();
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.user);


    const handleThingChange = (value) => {
        const stringValue = value.replace(/[^a-zA-Z ]/g, ''); // Allow only letters and spaces
        setThing(stringValue);
    };

    const handleAmountChange = (value) => {
        const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
        setAmount(numericValue);
    };
    const Handleaddtrip = async () => {
        if (thing && amount && category) {
            //nice
            // navigation.goBack();
            setLoading(true);
            try {
                let doc = await addDoc(expensesRef, {
                    thing,
                    amount,
                    category,
                    tripId: id
                });
                setLoading(false);
                if (doc && doc.id) {
                    navigation.goBack();
                }
            } catch (error) {
                setLoading(false);
                // Alert.alert("Error", "Failed to add trip.", [{ text: "OK" }], { cancelable: true });
                Snackbar.show({
                    text: 'Failed to add expenses.',
                    backgroundColor: 'red'
                });
            }
        }
        else {
            //not good
            // Alert.alert("Fill details", "Please enter the expenses details.", [{ text: "OK" }], {
            //      cancelable: true,
            // });
            Snackbar.show({
                text: 'Enter all the expenses details.',
                backgroundColor: 'red'
            });
        }
    }
    return (
        <>
            <SafeAreaView className="mx-4">
                <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-2xl font-bold">
                        <Text className="text-orange-400">
                            Add </Text>
                        Expense
                    </Text>

                    <BackButton />
                </View>
                <View className="flex-row justify-center">
                    <Image className="w-60 h-60" source={require('../assets/images/expenseBanner.png')} />
                </View>
                <View className="flex">
                    <Text className="font-bold  text-2xl mb-2"> For What?</Text>
                    <TextInput value={thing} onChangeText={handleThingChange} className=" p-2 border border-orange-400 rounded-full mb-4 bg-white" />
                    <Text className="font-bold  text-2xl mb-2"> How Much?</Text>
                    <TextInput value={amount} onChangeText={handleAmountChange} className=" p-2 border border-orange-400 rounded-full mb-4 bg-white" />
                    <Text className="font-bold  text-2xl mb-2"> Category</Text>
                    <View className="flex-row flex-wrap items-center">
                        {

                            Categories.map(cat => {
                                let bgColor = 'bg-white';
                                let textColor = 'black';
                                if (cat.value == category) {
                                    bgColor = 'bg-orange-400'
                                    textColor = 'text-white'
                                }
                                return (


                                    <TouchableOpacity onPress={() => setCategory(cat.value)}
                                        key={cat.value} className={`${bgColor} p-2 rounded-full m-2 border  border-orange-300  `}>
                                        <Text className={`font-bold px-1 ${textColor}`}>{cat.title}</Text>
                                    </TouchableOpacity>


                                )
                            })
                        }
                    </View>
                </View>
                <View>
                    {loading ? (
                        <Loading />
                    ) : (
                        <View className="flex-row justify-center">

                            <TouchableOpacity onPress={Handleaddtrip} className="bg-orange-400 p-4 rounded-full mt-6 w-80">
                                <Text className="font-bold text-center text-white text-lg">
                                    Add Expense
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>



            </SafeAreaView>

        </>
    )
}

export default AddExpenseScreen
