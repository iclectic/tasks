import ShoppingListItem from "../components/ShoppingListItem";
import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimeStamp?: number;
};

export default function App() {
  const [shoppingList, setShoppingList] = 
    useState<ShoppingListItemType[]>([]);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: value },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter(item => item.id !== id);
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = ( id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return{
          ...item,
          completedAtTimeStamp: item.completedAtTimeStamp 
          ? undefined 
          : Date.now(),
        };
      }
      return item;
    });
    setShoppingList(newShoppingList);
  }

  return (
    <FlatList 
      data={shoppingList}
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      ListHeaderComponent={ 
        <TextInput 
        placeholder="E.g. Coffee" 
        style={styles.textInput} 
        value={value}
        onChangeText = {setValue}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        />
      }
      renderItem={({ item }) => ( 
        <ShoppingListItem 
          name={item.name} 
          onDelete={() => handleDelete(item.id)}  
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedAtTimeStamp)}
        />
      )}
     />
   );
   }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  }
});
