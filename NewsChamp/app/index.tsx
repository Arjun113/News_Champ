import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Linking,
    View,
    Image,
    ScrollView
} from 'react-native';
import {
    PaperProvider,
    Appbar,
    Searchbar,
    Chip,
    Card,
    Text,
    ActivityIndicator,
    MD3LightTheme
} from 'react-native-paper';
import {Colors} from "@/constants/appearances";
import {Link} from "expo-router";
import {fetchPerCategory, fetchAllCategories} from "@/scripts/fetchNews";
import {NewsItem} from "@/interfaces/dataFile";
import { WebView } from 'react-native-webview';


export default function Index() {

    const findCategories = async () => {
        const categories: string[] = await fetchAllCategories();
        setCategories(categories);
    }

    // Variable declarations
    const [theme, setTheme] = useState(MD3LightTheme);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [currCategory, setCurrCategory] = useState<string>('');
    const [currData, setData] = useState<NewsItem[]>([]);
    const [categoryCorrespondingData,  setCategoryCorrespondingData] = useState<NewsItem[]>([]);


    const renderSingleArticle = ( item: NewsItem ) =>(
        <Card onPress={() => {/* Open link logic here */}} style={{ marginVertical: 8 }}>
            {item.imageURL && <Card.Cover source={{ uri: item.imageURL }} />}
            <Card.Title title={item.title} />
            <Card.Content>
                <Text variant="bodyMedium">{item.description}</Text>
            </Card.Content>
        </Card>
    );

    const triggerSearch = (query: string) => {
        const lower = query.toLowerCase();
        const filtered = currData.filter(item =>
            item.title.toLowerCase().includes(lower) ||
            item.category?.toLowerCase().includes(lower) ||
            item.description?.toLowerCase().includes(lower)
        );
        setCategoryCorrespondingData(filtered);
    };

    return (
        <PaperProvider theme={theme}>
            {/* App Bar */}
            <Appbar.Header mode="center-aligned">
                <Appbar.Content title="NewsChamp" titleStyle={{ textAlign: 'center' }} />
                <Appbar.Action icon="cog-outline" onPress={() => {
                    // Insert navigation or settings logic here
                    console.log('Settings button pressed');
                }} />
            </Appbar.Header>

            {/* Category Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                {categories.map(cat => (
                    <Chip
                        key={cat}
                        selected= {currCategory === cat} // Replace with: category === cat
                        onPress={() => {
                            setCurrCategory(cat);
                            const pullData = async () => {
                                const data = await fetchPerCategory(cat);
                                setCategoryCorrespondingData(data);
                            }
                        }}
                        style={{ marginRight: 8 }}
                    >
                        {cat}
                    </Chip>
                ))}
            </ScrollView>

            {/* Search Bar */}
            <Searchbar
                placeholder="Search articles"
                value={searchQuery} // Replace with: searchQuery
                onChangeText={(text) => {
                    setSearchQuery(text);
                    triggerSearch(text);
                }}
                style={{ margin: 10 }}
            />

            {/* Loading State */}
            {loading ? ( // Replace `false` with: loading
                <ActivityIndicator animating={true} style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={categoryCorrespondingData} // Replace with: filteredArticles or articles
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderSingleArticle}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                />
            )}
        </PaperProvider>
    );
}