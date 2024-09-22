import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";

export default function CounterScreen() {
  const handleRequestPermission = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log(result);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.8} 
        onPress={handleRequestPermission}
      >
         <Text style={styles.buttonText}>Request Permission</Text>
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
