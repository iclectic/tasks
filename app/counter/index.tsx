import { Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {useState, useEffect} from "react";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";



export default function CounterScreen() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsElapsed(val => val + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I'm a notification from your app 📬",
        },
        trigger: {
          seconds: 5,
        }
      })
    } else { 
      if(Device.isDevice) {
      Alert.alert(
        "Unable to schedule notification",
        "Enable the notification permission for Expo Go in settings",
      );
     }
    }
  };

  return (
    <View style={styles.container}>
      <Text>{secondsElapsed}</Text>
      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.8} 
        onPress={scheduleNotification}
      >
         <Text style={styles.buttonText}>Schedule notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    padding: 12,
    backgroundColor: theme.colorBlack,
    borderRadius: 6,
  },
  buttonText: {
   
    fontWeight: "bold",
    color: theme.colorWhite,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
