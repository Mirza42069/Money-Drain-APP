import { DEFAULT_CATEGORIES } from "./utils";

export interface Transaction {
    id: number;
    amount: number;
    type: "income" | "expense";
    category: string;
    categoryIcon: string;
    categoryColor: string;
    note: string;
    date: string;
}

export interface CategoryStat {
    category: string;
    categoryIcon: string;
    categoryColor: string;
    total: number;
    count: number;
}

export interface MonthlyStats {
    income: number;
    expense: number;
    balance: number;
    categoryBreakdown: CategoryStat[];
}

// In-memory storage for web
let webTransactions: Transaction[] = [];
let webCategories: { id: number; name: string; color: string; icon: string; type: string }[] = [];
let nextTransactionId = 1;

/**
 * Initialize the database (web version - in-memory)
 */
export async function initDatabase(): Promise<void> {
    webCategories = DEFAULT_CATEGORIES.map((cat, index) => ({
        id: index + 1,
        name: cat.name,
        color: cat.color,
        icon: cat.icon,
        type: cat.type,
    }));
    console.log("Web mode: Using in-memory storage");
}

/**
 * Add a new transaction
 */
export async function addTransaction(
    amount: number,
    type: "income" | "expense",
    category: string,
    categoryIcon: string,
    categoryColor: string,
    note: string = ""
): Promise<number> {
    const newTransaction: Transaction = {
        id: nextTransactionId++,
        amount,
        type,
        category,
        categoryIcon,
        categoryColor,
        note,
        date: new Date().toISOString(),
    };
    webTransactions.unshift(newTransaction);
    return newTransaction.id;
}

/**
 * Get all transactions with optional pagination
 */
export async function getTransactions(
    limit: number = 50,
    offset: number = 0
): Promise<Transaction[]> {
    return webTransactions.slice(offset, offset + limit);
}

/**
 * Get transactions for a specific month
 */
export async function getTransactionsByMonth(
    year: number,
    month: number
): Promise<Transaction[]> {
    return webTransactions.filter((t) => {
        const d = new Date(t.date);
        return d.getFullYear() === year && d.getMonth() + 1 === month;
    });
}

/**
 * Delete a transaction
 */
export async function deleteTransaction(id: number): Promise<void> {
    webTransactions = webTransactions.filter((t) => t.id !== id);
}

/**
 * Get total balance
 */
export async function getBalance(): Promise<{
    income: number;
    expense: number;
    balance: number;
}> {
    const income = webTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    const expense = webTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
}

/**
 * Get monthly statistics
 */
export async function getMonthlyStats(
    year: number,
    month: number
): Promise<MonthlyStats> {
    const monthTransactions = webTransactions.filter((t) => {
        const d = new Date(t.date);
        return d.getFullYear() === year && d.getMonth() + 1 === month;
    });

    const income = monthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    const expense = monthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const categoryMap = new Map<string, CategoryStat>();
    monthTransactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            const existing = categoryMap.get(t.category);
            if (existing) {
                existing.total += t.amount;
                existing.count += 1;
            } else {
                categoryMap.set(t.category, {
                    category: t.category,
                    categoryIcon: t.categoryIcon,
                    categoryColor: t.categoryColor,
                    total: t.amount,
                    count: 1,
                });
            }
        });

    const categoryBreakdown = Array.from(categoryMap.values()).sort(
        (a, b) => b.total - a.total
    );

    return { income, expense, balance: income - expense, categoryBreakdown };
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<
    { id: number; name: string; color: string; icon: string; type: string }[]
> {
    return webCategories;
}

/**
 * Add a custom category
 */
export async function addCategory(
    name: string,
    color: string,
    icon: string,
    type: "income" | "expense"
): Promise<number> {
    const newCat = { id: webCategories.length + 1, name, color, icon, type };
    webCategories.push(newCat);
    return newCat.id;
}

/**
 * Delete a category
 */
export async function deleteCategory(id: number): Promise<void> {
    webCategories = webCategories.filter((c) => c.id !== id);
}
