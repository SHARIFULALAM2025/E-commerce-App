import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import "./global.css";

export default function App() {

  useEffect(() => {

    GoogleSignin.configure({
      webClientId: '891958582372-n16f86t6k2u8fighq4fjv7offu2c7sts.apps.googleusercontent.com',
    });
  }, []);
  //891958582372-n16f86t6k2u8fighq4fjv7offu2c7sts.apps.googleusercontent.com
  const googleLogin = async () => {
    try {
      // ১. ইউজারের ডিভাইস থেকে গুগল একাউন্ট সিলেক্ট করা
      const { idToken } = await GoogleSignin.signIn();

      // ২. গুগল টোকেন দিয়ে একটি ক্রেডেনশিয়াল তৈরি করা
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // ৩. ফায়ারবেসে সাইন-ইন করা
      const userCredential = await auth().signInWithCredential(googleCredential);

      console.log("Logged in with Google:", userCredential.user.email);
      alert("Login Successful: " + userCredential.user.displayName);

    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-sky-500 font-bold italic mb-10 text-xl">
        i am shariful alam
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        className="flex-row items-center bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm"
        onPress={googleLogin}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
          className="w-6 h-6 mr-3"
        />
        <Text className="text-gray-700 font-semibold text-base">
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}