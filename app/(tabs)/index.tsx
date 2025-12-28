import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeOutLeft,
  LinearTransition,
} from "react-native-reanimated";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3, Money, Muted, Text } from "@/components/ui/text";
import {
  deleteTransaction,
  getBalance,
  getTransactions,
  type Transaction,
} from "@/lib/database";
import { formatCurrency, formatRelativeDate } from "@/lib/utils";

export default function HomeScreen() {
  const [balance, setBalance] = useState({ income: 0, expense: 0, balance: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [balanceData, transactionsData] = await Promise.all([
        getBalance(),
        getTransactions(20),
      ]);
      setBalance(balanceData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleDelete = (id: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteTransaction(id);
            await loadData();
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-24"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fafafa"
          />
        }
      >
        {/* Balance Card */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(400)}
          className="px-4 pt-4"
        >
          <Card className="bg-gradient-to-br border-zinc-800">
            <CardContent>
              <Muted className="mb-1">Total Balance</Muted>
              <Money
                className={
                  balance.balance >= 0 ? "text-income" : "text-expense"
                }
              >
                {formatCurrency(balance.balance)}
              </Money>

              <View className="mt-4 flex-row justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <View className="mr-2 h-2 w-2 rounded-full bg-income" />
                    <Muted>Income</Muted>
                  </View>
                  <Text className="text-lg font-semibold text-income">
                    +{formatCurrency(balance.income)}
                  </Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <View className="mr-2 h-2 w-2 rounded-full bg-expense" />
                    <Muted>Expenses</Muted>
                  </View>
                  <Text className="text-lg font-semibold text-expense">
                    -{formatCurrency(balance.expense)}
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(400)}
          className="flex-row gap-3 px-4 pt-4"
        >
          <Button
            variant="secondary"
            className="flex-1"
            onPress={() => router.push("/add-transaction?type=income")}
            icon={<Ionicons name="arrow-down" size={18} color="#22c55e" />}
          >
            <Text className="text-income font-semibold">Income</Text>
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onPress={() => router.push("/add-transaction?type=expense")}
            icon={<Ionicons name="arrow-up" size={18} color="#ef4444" />}
          >
            <Text className="text-expense font-semibold">Expense</Text>
          </Button>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(400)}
          className="px-4 pt-6"
        >
          <View className="mb-3 flex-row items-center justify-between">
            <H3>Recent Transactions</H3>
            {transactions.length > 0 && (
              <Muted>{transactions.length} items</Muted>
            )}
          </View>

          {transactions.length === 0 ? (
            <Card className="items-center py-8">
              <Ionicons name="wallet-outline" size={48} color="#71717a" />
              <Muted className="mt-2">No transactions yet</Muted>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onPress={() => router.push("/add-transaction")}
              >
                Add your first transaction
              </Button>
            </Card>
          ) : (
            <Animated.View layout={LinearTransition}>
              {transactions.map((transaction, index) => (
                <Animated.View
                  key={transaction.id}
                  entering={FadeInDown.delay(index * 50).duration(300)}
                  exiting={FadeOutLeft.duration(200)}
                  layout={LinearTransition}
                >
                  <Pressable
                    onLongPress={() => handleDelete(transaction.id)}
                    delayLongPress={500}
                  >
                    <Card className="mb-2">
                      <CardContent className="flex-row items-center">
                        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-secondary">
                          <Text className="text-lg">
                            {transaction.categoryIcon}
                          </Text>
                        </View>
                        <View className="flex-1">
                          <Text className="font-medium">
                            {transaction.category}
                          </Text>
                          <View className="flex-row items-center gap-2">
                            <Muted className="text-xs">
                              {formatRelativeDate(transaction.date)}
                            </Muted>
                            {transaction.note && (
                              <Muted className="text-xs" numberOfLines={1}>
                                • {transaction.note}
                              </Muted>
                            )}
                          </View>
                        </View>
                        <Text
                          className={`text-lg font-semibold ${transaction.type === "income"
                              ? "text-income"
                              : "text-expense"
                            }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </Text>
                      </CardContent>
                    </Card>
                  </Pressable>
                </Animated.View>
              ))}
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>

      {/* FAB */}
      <Animated.View
        entering={FadeInDown.delay(400).duration(400)}
        className="absolute bottom-20 right-4"
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          onPress={() => router.push("/add-transaction")}
        >
          <Ionicons name="add" size={28} color="#09090b" />
        </Button>
      </Animated.View>
    </View>
  );
}
