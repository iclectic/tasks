import { Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {useState, useEffect} from "react";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Duration, isBefore, intervalToDuration } from "date-fns";

// 10 seconds from now 
const timestamp = Date.now() + 10 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
}

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  console.log(status);


  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
            isOverdue 
                ? { start: timestamp, end: Date.now()} 
                : {
                   start: Date.now(),
                   end: timestamp,
            },
      );
      setStatus({ isOverdue, distance });
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
