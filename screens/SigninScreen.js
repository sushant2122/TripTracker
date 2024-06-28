import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Components/Loading';
import { setUserLoading, setUser } from '../redux/Slices/user';
import Snackbar from 'react-native-snackbar';

function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userLoading } = useSelector(state => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (email && password) {
            try {
                dispatch(setUserLoading(true));
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                dispatch(setUser(userCredential.user));
                dispatch(setUserLoading(false));
                navigation.navigate('Home');
            } catch (e) {
                dispatch(setUserLoading(false));
                //Alert.alert("Error!", "Please enter correct credentials.", [{ text: "OK" }], { cancelable: true });
                Snackbar.show({
                    text: 'Please! enter correct credentials',
                    backgroundColor: 'red'
                });
            }
        } else {
            // Alert.alert("Fill details", "Enter your email and password.", [{ text: "OK" }], { cancelable: true });
            Snackbar.show({
                text: 'email and password required',
                backgroundColor: 'red'
            });
        }
    };

    return (
        <SafeAreaView className="mx-4 mt-1">
            <View>
                <View className="flex-row items-center justify-center">
                    <Text className="font-bold text-2xl">
                        <Text className="text-orange-400">Sign </Text>in
                    </Text>
                </View>
                <View className="flex-row justify-center">
                    <Image className="w-80 h-80" source={require('../assets/images/login.png')} />
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
                    <TouchableOpacity className="flex-row">
                        <Text className="font-bold">Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {userLoading ? (
                        <Loading />
                    ) : (
                        <View className="flex-row justify-center">
                            <TouchableOpacity onPress={handleLogin} className="bg-orange-400 p-4 rounded-full mt-6 w-80">
                                <Text className="font-bold text-center text-white text-lg">
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SigninScreen;