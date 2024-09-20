import ShoppingListItem from "../components/ShoppingListItem";
import { StyleSheet, TextInput, FlatList, View, Text, LayoutAnimation } from "react-native";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "shopping-list";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimeStamp?: number;
  lastUpdatedTimeStamp: number;
};

export default function App() {
  const [shoppingList, setShoppingList] = 
    useState<ShoppingListItemType[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingList(data);  
      }
    };
    fetchInitial();
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toTimeString(), 
          name: value, 
          lastUpdatedTimeStamp: Date.now(), 
        },
        ...shoppingList,
      ];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, newShoppingList);
      setValue("");
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter(item => item.id !== id);
    saveToStorage(storageKey, shoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = ( id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          lastUpdatedTimeStamp: Date.now(),
          completedAtTimeStamp: item.completedAtTimeStamp 
          ? undefined 
          : Date.now(),
        };
      }
      return item;
    });
    saveToStorage(storageKey, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList 
      data={orderShoppingList(shoppingList)}
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


   function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
        return item2.completedAtTimeStamp - item1.completedAtTimeStamp;
      }
  
      if (item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
        return 1;
      }
  
      if (!item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
        return -1;
      }
  
      if (!item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
        return item2.lastUpdatedTimeStamp - item1.lastUpdatedTimeStamp;
      }
  
      return 0;
    });
  }
   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
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
