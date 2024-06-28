import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../Components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Components/Loading';
import { setUserLoading } from '../redux/Slices/user';
import Snackbar from 'react-native-snackbar';
function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { userLoading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSignup = async () => {
        if (email && password) {
            try {
                dispatch(setUserLoading(true));
                await createUserWithEmailAndPassword(auth, email, password);
                dispatch(setUserLoading(false));
                navigation.navigate('Signin');
            } catch (e) {
                dispatch(setUserLoading(false));
                Snackbar.show({
                    text: 'please enter correct credentials',
                    backgroundColor: 'red'
                });
                //Alert.alert("Error!", "Please enter correct credentials.", [{ text: "OK" }], { cancelable: true });
            }
        } else {
            //Alert.alert("Sign up details", "Enter your email and password.", [{ text: "OK" }], { cancelable: true });
            Snackbar.show({
                text: 'email and password are required',
                backgroundColor: 'red'
            });
        }
    };

    return (
        <SafeAreaView className="mx-4 mt-1">
            <View>
                <View className="flex-row items-center justify-center">
                    <Text className="font-bold text-2xl">
                        <Text className="text-orange-400">Sign </Text>up
                    </Text>
                </View>
                <View className="flex-row justify-center">
                    <Image className="w-80 h-80" source={require('../assets/images/signup.png')} />
                </View>
                <View className="flex">
                    <Text className="font-bold text-xl mb-2">Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={value => setEmail(value)}
                        className="p-4 border border-orange-400 rounded-full mb-4 bg-white"
                    />
                    <Text className="font-bold text-xl mb-2">Password</Text>
                    <TextInput
                        value={password}
                        secureTextEntry
                        onChangeText={value => setPassword(value)}
                        className="p-4 border border-orange-400 rounded-full mb-4 bg-white"
                    />
                </View>
                <View>
                    {userLoading ? (
                        <Loading />
                    ) : (
                        <View className="flex-row justify-center">
                            <TouchableOpacity onPress={handleSignup} className="bg-orange-400 p-4 rounded-full mt-6 w-80">
                                <Text className="font-bold text-center text-white text-lg">
                                    Sign up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SignupScreen;