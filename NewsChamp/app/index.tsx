import {Text, View, StyleSheet, SafeAreaView, FlatList, ScrollView, Pressable} from "react-native";
import {Colors} from "@/constants/appearances";
import {Appearance, useColorScheme} from "react-native";
import {Link} from "expo-router";
import {fetchPerCategory, fetchAllCategories} from "@/scripts/fetchNews";
import {useEffect, useState} from "react";

export default function Index() {
    const colourScheme = useColorScheme();
    const [currentCols, setCurrentCols] = useState(Colors.light);  // Default to light theme
    const [categories, setCategories] = useState([]);
    const [currCategory, setCurrCategory] = useState(null);
    const [data, setData] = useState([]);

    // Detect Light/Dark Mode
    useEffect(() => {
        if (colourScheme === 'light') {
            setCurrentCols(Colors.light);
        } else {
            setCurrentCols(Colors.dark);
        }
    }, [colourScheme]);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await fetchAllCategories();
            setCategories(fetchedCategories);
        };
        fetchCategories();
    }, []);

    // Fetch data when category changes
    useEffect(() => {
        const fetchData = async () => {
            if (currCategory) {
                const fetchedData = await fetchPerCategory(currCategory);
                setData(fetchedData);
            }
        };
        fetchData();
    }, [currCategory]);

    return (
        <SafeAreaView>
            {/* Header */}
            <View style={styles.container}>
                <Text style={styles.text}>News</Text>
                <Link to="/settings">Settings</Link>
            </View>

            {/* Scroll for categories */}
            <ScrollView horizontal style={styles.scrollContainer}>
                {categories.map((item, index) => (
                    <Pressable
                        key={index}
                        style={styles.categoryButton}
                        onPress={() => setCurrCategory(item)} // Set the selected category
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            {/* Conditional rendering for category selection */}
            {currCategory === null ? (
                <Text>No category selected. Please select a category to view relevant news.</Text>
            ) : (
                <ScrollView>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <Pressable key={index} style={styles.newsItem} onPress={() => {/* Add your onPress logic here */}}>
                                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.description}>{item.description}</Text>
                                </View>
                            </Pressable>
                        ))
                    ) : (
                        <Text>Loading news...</Text>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    loading: {
        marginTop: 20,
    },
    newsItem: {
        backgroundColor: '#f4f4f4',
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
        elevation: 3, // For shadow on Android
        shadowColor: '#000', // For shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    content: {
        flexDirection: 'row', // Title and image side by side
        alignItems: 'center', // Align vertically to the center
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15, // Space between the image and text
    },
    textContainer: {
        flex: 1, // Makes text container take the remaining space
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});