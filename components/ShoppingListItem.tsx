import { 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    Alert, 
    Pressable
        } 
        from "react-native";
import { theme } from "../theme";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;

}

export default function ShoppingListItem({ name, isCompleted, onDelete, onToggleComplete}: Props) {
    const handleDelete = () => {
        Alert.alert(
          `Are you sure you want to delete this ${name}?`, 
          "It will be be gone for good",
          [
            {
              text: "Yes",
              onPress: () => onDelete(),
              style: "destructive",
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
      };

    return (
        <Pressable 
        style={[styles.itemContainer, 
          isCompleted ? styles.completedContainer: 
          undefined,
        ]}
        onPress={onToggleComplete}
        >
        <Text style={[
                styles.itemText, 
                isCompleted ? styles.completedText: undefined,
              ]}
              >
          {name} 
        </Text>
        <TouchableOpacity  
        onPress={handleDelete} 
        activeOpacity={0.8}
      >
      <MaterialCommunityIcons 
        name="close-octagon-outline" 
        size={24} 
        color={isCompleted ? theme.colorGrey : theme.colorRed} 
      />
      </TouchableOpacity>
      </Pressable>
    );
} 


const styles = StyleSheet.create({

    itemContainer: {
      borderBottomWidth: 1, 
      borderBottomColor: theme.colorLightGrey, 
      paddingHorizontal: 18, 
      paddingVertical: 16, 
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    completedContainer: {
      backgroundColor: theme.colorLightGrey,
      borderBottomColor: theme.colorLightGrey,
    },

    itemText: {
      fontSize: 18, 
      fontWeight: "200"
    },
    completedText: {
      textDecorationLine: "line-through",
      textDecorationColor: theme.colorGrey,
      color: theme.colorGrey,
    },
   
  });