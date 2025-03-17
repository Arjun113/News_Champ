// This page handles the settings

import {SafeAreaView, useColorScheme, View, Text, Switch} from "react-native";
import {useState} from "react";
import {styles} from "@/app/index";
import {Picker} from '@react-native-picker/picker'

export default function Settings() {
    const colourScheme = useColorScheme();
    const [systemAppearance, setSystemAppearance] = useState<boolean>(true);
    const [systemLanguage, setSystemLanguage] = useState<string>();

    // Display area
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>System Appearance</Text>
                <Switch onValueChange={(value) => setSystemAppearance(value)}></Switch>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>System Language</Text>
                <Picker selectedValue={systemLanguage} onValueChange={(item, val) => setSystemLanguage(val)}>
                    <Picker.Item>English</Picker.Item>
                    <Picker.Item>Francais</Picker.Item>
                    <Picker.Item>Deutsch</Picker.Item>
                    <Picker.Item>Italian</Picker.Item>
                </Picker>
            </View>
        </SafeAreaView>
    )
}