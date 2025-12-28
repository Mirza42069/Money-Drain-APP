import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { H3, Money, Muted, Text } from "@/components/ui/text";
import { getMonthlyStats, type MonthlyStats } from "@/lib/database";
import { cn, formatCurrency } from "@/lib/utils";

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export default function StatsScreen() {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [stats, setStats] = useState<MonthlyStats>({
        income: 0,
        expense: 0,
        balance: 0,
        categoryBreakdown: [],
    });

    const loadStats = useCallback(async () => {
        try {
            const data = await getMonthlyStats(year, month);
            setStats(data);
        } catch (error) {
            console.error("Failed to load stats:", error);
        }
    }, [year, month]);

    useFocusEffect(
        useCallback(() => {
            loadStats();
        }, [loadStats])
    );

    const changeMonth = (delta: number) => {
        Haptics.selectionAsync();
        let newMonth = month + delta;
        let newYear = year;

        if (newMonth > 12) {
            newMonth = 1;
            newYear++;
        } else if (newMonth < 1) {
            newMonth = 12;
            newYear--;
        }

        setMonth(newMonth);
        setYear(newYear);
    };

    const maxCategoryAmount = Math.max(
        ...stats.categoryBreakdown.map((c) => c.total),
        1
    );

    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerClassName="p-4 pb-8"
        >
            {/* Month Selector */}
            <Animated.View
                entering={FadeInDown.delay(100).duration(300)}
                className="mb-6"
            >
                <View className="flex-row items-center justify-between rounded-lg bg-secondary p-2">
                    <Pressable
                        onPress={() => changeMonth(-1)}
                        className="p-2"
                        hitSlop={20}
                    >
                        <Ionicons name="chevron-back" size={24} color="#fafafa" />
                    </Pressable>
                    <View className="items-center">
                        <Text className="text-lg font-semibold">
                            {MONTHS[month - 1]} {year}
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => changeMonth(1)}
                        className="p-2"
                        hitSlop={20}
                        disabled={year === now.getFullYear() && month === now.getMonth() + 1}
                    >
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={
                                year === now.getFullYear() && month === now.getMonth() + 1
                                    ? "#52525b"
                                    : "#fafafa"
                            }
                        />
                    </Pressable>
                </View>
            </Animated.View>

            {/* Summary Cards */}
            <Animated.View
                entering={FadeInDown.delay(150).duration(300)}
                className="flex-row gap-3 mb-6"
            >
                <Card className="flex-1">
                    <CardContent className="items-center py-4">
                        <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-income/20">
                            <Ionicons name="arrow-down" size={20} color="#22c55e" />
                        </View>
                        <Muted className="mb-1">Income</Muted>
                        <Text className="text-xl font-bold text-income">
                            +{formatCurrency(stats.income)}
                        </Text>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardContent className="items-center py-4">
                        <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-expense/20">
                            <Ionicons name="arrow-up" size={20} color="#ef4444" />
                        </View>
                        <Muted className="mb-1">Expenses</Muted>
                        <Text className="text-xl font-bold text-expense">
                            -{formatCurrency(stats.expense)}
                        </Text>
                    </CardContent>
                </Card>
            </Animated.View>

            {/* Balance Card */}
            <Animated.View
                entering={FadeInDown.delay(200).duration(300)}
                className="mb-6"
            >
                <Card>
                    <CardContent className="flex-row items-center justify-between py-4">
                        <View>
                            <Muted className="mb-1">Net Balance</Muted>
                            <Money
                                className={cn(
                                    "text-3xl",
                                    stats.balance >= 0 ? "text-income" : "text-expense"
                                )}
                            >
                                {stats.balance >= 0 ? "+" : ""}
                                {formatCurrency(stats.balance)}
                            </Money>
                        </View>
                        <View
                            className={cn(
                                "h-12 w-12 items-center justify-center rounded-full",
                                stats.balance >= 0 ? "bg-income/20" : "bg-expense/20"
                            )}
                        >
                            <Ionicons
                                name={stats.balance >= 0 ? "trending-up" : "trending-down"}
                                size={24}
                                color={stats.balance >= 0 ? "#22c55e" : "#ef4444"}
                            />
                        </View>
                    </CardContent>
                </Card>
            </Animated.View>

            {/* Comparison Bar */}
            {(stats.income > 0 || stats.expense > 0) && (
                <Animated.View
                    entering={FadeInDown.delay(250).duration(300)}
                    className="mb-6"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Income vs Expenses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <View className="mb-2 flex-row items-center">
                                <View className="mr-3 h-3 w-3 rounded-full bg-income" />
                                <Text className="flex-1">Income</Text>
                                <Text className="font-mono font-semibold">
                                    {formatCurrency(stats.income)}
                                </Text>
                            </View>
                            <Progress
                                value={(stats.income / (stats.income + stats.expense)) * 100}
                                color="#22c55e"
                                className="mb-4"
                            />

                            <View className="mb-2 flex-row items-center">
                                <View className="mr-3 h-3 w-3 rounded-full bg-expense" />
                                <Text className="flex-1">Expenses</Text>
                                <Text className="font-mono font-semibold">
                                    {formatCurrency(stats.expense)}
                                </Text>
                            </View>
                            <Progress
                                value={(stats.expense / (stats.income + stats.expense)) * 100}
                                color="#ef4444"
                            />
                        </CardContent>
                    </Card>
                </Animated.View>
            )}

            {/* Category Breakdown */}
            <Animated.View entering={FadeInDown.delay(300).duration(300)}>
                <H3 className="mb-3">Spending by Category</H3>

                {stats.categoryBreakdown.length === 0 ? (
                    <Card className="items-center py-8">
                        <Ionicons name="pie-chart-outline" size={48} color="#71717a" />
                        <Muted className="mt-2">No expenses this month</Muted>
                    </Card>
                ) : (
                    <View className="gap-2">
                        {stats.categoryBreakdown.map((category, index) => (
                            <Animated.View
                                key={category.category}
                                entering={FadeInDown.delay(350 + index * 50).duration(300)}
                            >
                                <Card>
                                    <CardContent className="py-3">
                                        <View className="mb-2 flex-row items-center">
                                            <View
                                                className="mr-3 h-8 w-8 items-center justify-center rounded-full"
                                                style={{ backgroundColor: `${category.categoryColor}20` }}
                                            >
                                                <Text>{category.categoryIcon}</Text>
                                            </View>
                                            <View className="flex-1">
                                                <Text className="font-medium">{category.category}</Text>
                                                <Muted className="text-xs">
                                                    {category.count} transaction{category.count > 1 ? "s" : ""}
                                                </Muted>
                                            </View>
                                            <Text className="font-mono font-semibold text-expense">
                                                -{formatCurrency(category.total)}
                                            </Text>
                                        </View>
                                        <Progress
                                            value={(category.total / maxCategoryAmount) * 100}
                                            color={category.categoryColor}
                                        />
                                    </CardContent>
                                </Card>
                            </Animated.View>
                        ))}
                    </View>
                )}
            </Animated.View>
        </ScrollView>
    );
}
