import * as SQLite from "expo-sqlite";
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

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize the database
 */
export async function initDatabase(): Promise<void> {
    db = await SQLite.openDatabaseAsync("moneydrain.db");

    // Create transactions table
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
      category TEXT NOT NULL,
      categoryIcon TEXT,
      categoryColor TEXT,
      note TEXT,
      date TEXT DEFAULT (datetime('now'))
    );
  `);

    // Create categories table
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      color TEXT,
      icon TEXT,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL
    );
  `);

    // Insert default categories if none exist
    const existingCategories = await db.getAllAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM categories"
    );

    if (existingCategories[0].count === 0) {
        for (const cat of DEFAULT_CATEGORIES) {
            await db.runAsync(
                "INSERT INTO categories (name, color, icon, type) VALUES (?, ?, ?, ?)",
                [cat.name, cat.color, cat.icon, cat.type]
            );
        }
    }
}

/**
 * Get database instance
 */
function getDb(): SQLite.SQLiteDatabase {
    if (!db) {
        throw new Error("Database not initialized. Call initDatabase() first.");
    }
    return db;
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
    const database = getDb();
    const result = await database.runAsync(
        `INSERT INTO transactions (amount, type, category, categoryIcon, categoryColor, note) 
     VALUES (?, ?, ?, ?, ?, ?)`,
        [amount, type, category, categoryIcon, categoryColor, note]
    );
    return result.lastInsertRowId;
}

/**
 * Get all transactions with optional pagination
 */
export async function getTransactions(
    limit: number = 50,
    offset: number = 0
): Promise<Transaction[]> {
    const database = getDb();
    return database.getAllAsync<Transaction>(
        `SELECT * FROM transactions ORDER BY date DESC LIMIT ? OFFSET ?`,
        [limit, offset]
    );
}

/**
 * Get transactions for a specific month
 */
export async function getTransactionsByMonth(
    year: number,
    month: number
): Promise<Transaction[]> {
    const database = getDb();
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;

    return database.getAllAsync<Transaction>(
        `SELECT * FROM transactions 
     WHERE date >= ? AND date < ?
     ORDER BY date DESC`,
        [startDate, endDate]
    );
}

/**
 * Delete a transaction
 */
export async function deleteTransaction(id: number): Promise<void> {
    const database = getDb();
    await database.runAsync("DELETE FROM transactions WHERE id = ?", [id]);
}

/**
 * Get total balance
 */
export async function getBalance(): Promise<{
    income: number;
    expense: number;
    balance: number;
}> {
    const database = getDb();

    const incomeResult = await database.getFirstAsync<{ total: number }>(
        "SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE type = 'income'"
    );

    const expenseResult = await database.getFirstAsync<{ total: number }>(
        "SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE type = 'expense'"
    );

    const income = incomeResult?.total ?? 0;
    const expense = expenseResult?.total ?? 0;

    return {
        income,
        expense,
        balance: income - expense,
    };
}

/**
 * Get monthly statistics
 */
export async function getMonthlyStats(
    year: number,
    month: number
): Promise<MonthlyStats> {
    const database = getDb();
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;

    const incomeResult = await database.getFirstAsync<{ total: number }>(
        `SELECT COALESCE(SUM(amount), 0) as total FROM transactions 
     WHERE type = 'income' AND date >= ? AND date < ?`,
        [startDate, endDate]
    );

    const expenseResult = await database.getFirstAsync<{ total: number }>(
        `SELECT COALESCE(SUM(amount), 0) as total FROM transactions 
     WHERE type = 'expense' AND date >= ? AND date < ?`,
        [startDate, endDate]
    );

    const categoryBreakdown = await database.getAllAsync<CategoryStat>(
        `SELECT 
      category,
      categoryIcon,
      categoryColor,
      SUM(amount) as total,
      COUNT(*) as count
     FROM transactions 
     WHERE type = 'expense' AND date >= ? AND date < ?
     GROUP BY category
     ORDER BY total DESC`,
        [startDate, endDate]
    );

    const income = incomeResult?.total ?? 0;
    const expense = expenseResult?.total ?? 0;

    return {
        income,
        expense,
        balance: income - expense,
        categoryBreakdown,
    };
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<
    { id: number; name: string; color: string; icon: string; type: string }[]
> {
    const database = getDb();
    return database.getAllAsync(
        "SELECT * FROM categories ORDER BY type, name"
    );
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
    const database = getDb();
    const result = await database.runAsync(
        "INSERT INTO categories (name, color, icon, type) VALUES (?, ?, ?, ?)",
        [name, color, icon, type]
    );
    return result.lastInsertRowId;
}

/**
 * Delete a category
 */
export async function deleteCategory(id: number): Promise<void> {
    const database = getDb();
    await database.runAsync("DELETE FROM categories WHERE id = ?", [id]);
}
