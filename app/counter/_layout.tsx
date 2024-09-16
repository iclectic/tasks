import { Stack } from 'expo-router';
import { Pressable, Text } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { theme } from '../../theme';
import { Link } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen 
              name="index" 
              options={{ 
                title: "Counter", 
                headerRight: () => { 
                   return (
                    <Link href="/counter/history" asChild>
                     <Pressable hitSlop={20}>
                     <Octicons 
                      name="history" 
                      size={32} 
                      color={theme.colorGrey} 
                    />
                     </Pressable>
                    </Link>
                );
                },
            }} />
        </Stack>
    );
}