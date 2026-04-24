
import { Text, View, TouchableOpacity, Image } from 'react-native';
import "./global.css"

export default function App() {

  const googleLogin = () => {
    console.log("Google Login Pressed");
  }
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">

      <Text className="text-sky-500 font-bold italic mb-10 text-xl">
        i am shariful alam
      </Text>

      {/* Google Login Button */}
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