import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
    )
}
//usually where you add all your providers (<AuthProvider>)
//slot will be replaced by the content of the page