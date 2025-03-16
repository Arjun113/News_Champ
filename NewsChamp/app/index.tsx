import {Text, View, StyleSheet, SafeAreaView, FlatList, ScrollView, Pressable} from "react-native";
import {Colors} from "@/constants/appearances";
import {Appearance, useColorScheme} from "react-native";
import {Link} from "expo-router";
import {fetchPerCategory, fetchAllCategories} from "@/scripts/fetchNews";
import {useState} from "react";

// Detect Light/Dark Mode and adjust colour themes
const colourScheme = useColorScheme();
let currentCols;
if (colourScheme === "light") {
    currentCols = Colors.light;
}
else {
    currentCols = Colors.dark;
}

const styles = StyleSheet.create(currentCols)
const categories: string[] = await fetchAllCategories();
const [currCategory, setCurrCategory] = useState();

export default function Index() {
    return (
        <SafeAreaView>

            // Header
            <View style={styles.container}>
                <Text style={styles.text}>News</Text>
                <Link href={'/settings'}>Settings</Link>
            </View>

            // Scroll for categories
            <ScrollView horizontal style={styles.container}>
                categories.map(item => (
                    <Pressable style={styles.text} onPress={}>
                        <Text>item</Text>
                    </Pressable>
            )
            </ScrollView>

            <ScrollView>

            </ScrollView>

        </SafeAreaView>
    );
}