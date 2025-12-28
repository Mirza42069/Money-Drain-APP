import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AmountInput, Input } from "@/components/ui/input";
import { H3, Text } from "@/components/ui/text";
import { addTransaction, getCategories } from "@/lib/database";
import { cn } from "@/lib/utils";

type TransactionType = "income" | "expense";

interface Category {
    id: number;
    name: string;
    color: string;
    icon: string;
    type: string;
}

export default function AddTransactionScreen() {
    const { type: initialType } = useLocalSearchParams<{ type?: string }>();

    const [type, setType] = useState<TransactionType>(
        (initialType as TransactionType) || "expense"
    );
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [note, setNote] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        // Reset selected category when type changes
        setSelectedCategory(null);
    }, [type]);

    const loadCategories = async () => {
        try {
            const cats = await getCategories();
            setCategories(cats);
        } catch (err) {
            console.error("Failed to load categories:", err);
        }
    };

    const filteredCategories = categories.filter((cat) => cat.type === type);

    const handleSave = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        if (!selectedCategory) {
            setError("Please select a category");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await addTransaction(
                parseFloat(amount),
                type,
                selectedCategory.name,
                selectedCategory.icon,
                selectedCategory.color,
                note
            );
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.back();
        } catch (err) {
            console.error("Failed to save transaction:", err);
            setError("Failed to save transaction");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-background"
        >
            <ScrollView
                className="flex-1"
                contentContainerClassName="p-4 pb-8"
                keyboardShouldPersistTaps="handled"
            >
                {/* Type Toggle */}
                <Animated.View
                    entering={FadeInDown.delay(100).duration(300)}
                    className="mb-6"
                >
                    <View className="flex-row rounded-lg bg-secondary p-1">
                        <Pressable
                            onPress={() => {
                                setType("expense");
                                Haptics.selectionAsync();
                            }}
                            className={cn(
                                "flex-1 items-center rounded-md py-3",
                                type === "expense" && "bg-expense/20"
                            )}
                        >
                            <Text
                                className={cn(
                                    "font-semibold",
                                    type === "expense" ? "text-expense" : "text-muted-foreground"
                                )}
                            >
                                Expense
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setType("income");
                                Haptics.selectionAsync();
                            }}
                            className={cn(
                                "flex-1 items-center rounded-md py-3",
                                type === "income" && "bg-income/20"
                            )}
                        >
                            <Text
                                className={cn(
                                    "font-semibold",
                                    type === "income" ? "text-income" : "text-muted-foreground"
                                )}
                            >
                                Income
                            </Text>
                        </Pressable>
                    </View>
                </Animated.View>

                {/* Amount Input */}
                <Animated.View
                    entering={FadeInDown.delay(150).duration(300)}
                    className="mb-6"
                >
                    <AmountInput
                        value={amount}
                        onChangeText={setAmount}
                        label="Amount"
                        error={error && !amount ? "Required" : undefined}
                    />
                </Animated.View>

                {/* Category Selection */}
                <Animated.View entering={FadeInDown.delay(200).duration(300)}>
                    <H3 className="mb-3">Category</H3>
                    <View className="flex-row flex-wrap gap-2">
                        {filteredCategories.map((category) => (
                            <Pressable
                                key={category.id}
                                onPress={() => {
                                    setSelectedCategory(category);
                                    Haptics.selectionAsync();
                                }}
                            >
                                <Card
                                    className={cn(
                                        "flex-row items-center px-4 py-3",
                                        selectedCategory?.id === category.id &&
                                        "border-2 border-primary"
                                    )}
                                >
                                    <Text className="mr-2 text-lg">{category.icon}</Text>
                                    <Text className="font-medium">{category.name}</Text>
                                </Card>
                            </Pressable>
                        ))}
                    </View>
                    {error && !selectedCategory && (
                        <Text className="mt-2 text-sm text-destructive">
                            Please select a category
                        </Text>
                    )}
                </Animated.View>

                {/* Note Input */}
                <Animated.View
                    entering={FadeInDown.delay(250).duration(300)}
                    className="mt-6"
                >
                    <Input
                        label="Note (optional)"
                        placeholder="Add a note..."
                        value={note}
                        onChangeText={setNote}
                    />
                </Animated.View>

                {/* Error Message */}
                {error && (
                    <Animated.View entering={FadeInDown.duration(200)}>
                        <Text className="mt-2 text-center text-destructive">{error}</Text>
                    </Animated.View>
                )}
            </ScrollView>

            {/* Save Button */}
            <Animated.View
                entering={FadeInDown.delay(300).duration(300)}
                className="p-4 pb-8"
            >
                <Button
                    onPress={handleSave}
                    loading={loading}
                    className={type === "income" ? "bg-income" : "bg-expense"}
                >
                    <Text className="font-semibold text-white">
                        {type === "income" ? "Add Income" : "Add Expense"}
                    </Text>
                </Button>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}
