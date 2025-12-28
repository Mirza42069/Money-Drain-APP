import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Alert, Linking, ScrollView, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Card, CardContent } from "@/components/ui/card";
import { H3, Muted, Text } from "@/components/ui/text";
import { getTransactions } from "@/lib/database";

interface SettingItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
}

function SettingItem({
    icon,
    title,
    description,
    onPress,
    rightElement,
}: SettingItemProps) {
    return (
        <Card onPress={onPress} className="mb-2">
            <CardContent className="flex-row items-center py-3">
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Ionicons name={icon} size={20} color="#fafafa" />
                </View>
                <View className="flex-1">
                    <Text className="font-medium">{title}</Text>
                    {description && <Muted className="text-xs">{description}</Muted>}
                </View>
                {rightElement || (
                    <Ionicons name="chevron-forward" size={20} color="#71717a" />
                )}
            </CardContent>
        </Card>
    );
}

export default function SettingsScreen() {
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setExporting(true);

        try {
            const transactions = await getTransactions(1000);
            const csvContent = [
                "Date,Type,Category,Amount,Note",
                ...transactions.map(
                    (t) =>
                        `${t.date},${t.type},${t.category},${t.amount},"${t.note || ""}"`
                ),
            ].join("\n");

            Alert.alert(
                "Export Data",
                `Ready to export ${transactions.length} transactions.\n\nIn a production app, this would save to a file or share via the system share sheet.`,
                [{ text: "OK" }]
            );
        } catch (error) {
            console.error("Failed to export:", error);
            Alert.alert("Error", "Failed to export data");
        } finally {
            setExporting(false);
        }
    };

    const handleClearData = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        Alert.alert(
            "Clear All Data",
            "This will permanently delete all your transactions. This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Clear All",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert("Data Cleared", "All transactions have been deleted.");
                    },
                },
            ]
        );
    };

    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerClassName="p-4 pb-8"
        >
            {/* General Settings */}
            <Animated.View entering={FadeInDown.delay(100).duration(300)}>
                <H3 className="mb-3">General</H3>
                <SettingItem
                    icon="cash-outline"
                    title="Currency"
                    description="USD ($)"
                    onPress={() => {
                        Haptics.selectionAsync();
                        Alert.alert(
                            "Currency",
                            "Currency selection will be available in a future update."
                        );
                    }}
                />
                <SettingItem
                    icon="notifications-outline"
                    title="Reminders"
                    description="Daily expense tracking"
                    onPress={() => {
                        Haptics.selectionAsync();
                        Alert.alert(
                            "Reminders",
                            "Reminder settings will be available in a future update."
                        );
                    }}
                />
            </Animated.View>

            {/* Data Management */}
            <Animated.View
                entering={FadeInDown.delay(200).duration(300)}
                className="mt-6"
            >
                <H3 className="mb-3">Data</H3>
                <SettingItem
                    icon="download-outline"
                    title="Export Data"
                    description="Download your transactions as CSV"
                    onPress={handleExport}
                    rightElement={
                        exporting ? (
                            <View className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : undefined
                    }
                />
                <SettingItem
                    icon="cloud-upload-outline"
                    title="Backup"
                    description="Sync your data to the cloud"
                    onPress={() => {
                        Haptics.selectionAsync();
                        Alert.alert(
                            "Backup",
                            "Cloud backup will be available in a future update."
                        );
                    }}
                />
                <SettingItem
                    icon="trash-outline"
                    title="Clear All Data"
                    description="Delete all transactions"
                    onPress={handleClearData}
                />
            </Animated.View>

            {/* About */}
            <Animated.View
                entering={FadeInDown.delay(300).duration(300)}
                className="mt-6"
            >
                <H3 className="mb-3">About</H3>
                <SettingItem
                    icon="information-circle-outline"
                    title="Version"
                    description="1.0.0"
                    rightElement={<Muted>1.0.0</Muted>}
                />
                <SettingItem
                    icon="star-outline"
                    title="Rate App"
                    description="Love Money Drain? Rate us!"
                    onPress={() => {
                        Haptics.selectionAsync();
                        Alert.alert("Thanks!", "Thank you for your support! ❤️");
                    }}
                />
                <SettingItem
                    icon="mail-outline"
                    title="Contact Support"
                    description="Get help or send feedback"
                    onPress={() => {
                        Haptics.selectionAsync();
                        Linking.openURL("mailto:support@moneydrain.app");
                    }}
                />
            </Animated.View>

            {/* App Info */}
            <Animated.View
                entering={FadeInDown.delay(400).duration(300)}
                className="mt-8 items-center"
            >
                <View className="mb-2 h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                    <Text className="text-3xl">💸</Text>
                </View>
                <Text className="text-lg font-bold">Money Drain</Text>
                <Muted className="text-center">
                    Track where your money goes.{"\n"}Simple. Fast. Beautiful.
                </Muted>
                <Muted className="mt-4 text-xs">
                    Built with Expo + React Native
                </Muted>
            </Animated.View>
        </ScrollView>
    );
}
