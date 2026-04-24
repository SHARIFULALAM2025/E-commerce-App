import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import "./global.css";

export default function App() {

  useEffect(() => {
    // গুগল সাইন-ইন কনফিগারেশন
    GoogleSignin.configure({
      webClientId: '891958582372-n16f86t6k2u8fighq4fjv7offu2c7sts.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      // ১. প্লে সার্ভিস চেক করা (অ্যান্ড্রয়েডের জন্য খুবই জরুরি)
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // ২. আগের কোনো সেশন থাকলে সাইন আউট করে নেওয়া (যাতে বাটন হ্যাং না হয়)
      await GoogleSignin.signOut().catch(() => { });

      // ৩. গুগল সাইন-ইন শুরু
      const signInResult = await GoogleSignin.signIn();

      // ৪. ID Token বের করা
      const idToken = signInResult.data ? signInResult.data.idToken : signInResult.idToken;

      if (!idToken) {
        throw new Error('গুগল থেকে কোন ID Token পাওয়া যায়নি!');
      }

      // ৫. ফায়ারবেস ক্রেডেনশিয়াল তৈরি ও লগইন
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      Alert.alert("Success", `Welcome ${userCredential.user.displayName}!`);

    } catch (error) {
      // নির্দিষ্ট এরর হ্যান্ডলিং (বাটন কাজ না করার কারণ বুঝতে সাহায্য করবে)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("ইউজার সাইন-ইন ক্যান্সেল করেছে");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("সাইন-ইন অলরেডি প্রসেসিং এ আছে");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Error", "গুগল প্লে সার্ভিস পাওয়া যায়নি");
      } else {
        console.log("Full Error: ", error);
        Alert.alert('Login Failed', error.message);
      }
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
        onPress={onGoogleButtonPress}
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