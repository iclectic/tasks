import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from "../theme";

export default function Layout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean}}>
            <Tabs.Screen 
             name="index" 
             options={{ 
                title: "Shopping List",
                tabBarIcon: ({ color, size }) => {
                    return <FontAwesome5 name="list-ul" size={size} color={color} />; 
                    },
             }} 
            />
            <Tabs.Screen 
                name="counter" 
                options={{ 
                    title: "Counter", 
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="clock" size={size} color={color} />
                    ),
                }} 
                />
            <Tabs.Screen 
                name="idea" 
                options=
                {{ 
                    title: "Idea",
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="lightbulb-on-outline" size={size} color={color} />
                    )
                }} 
                />
        </Tabs>
    );
}