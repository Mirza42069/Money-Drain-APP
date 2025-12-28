import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
}

/**
 * Format a date string
 */
export function formatDate(date: string | Date): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(d);
}

/**
 * Format a date as relative time (e.g., "2 days ago")
 */
export function formatRelativeDate(date: string | Date): string {
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffTime = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return formatDate(d);
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Default expense categories with colors and icons
 */
export const DEFAULT_CATEGORIES = [
    { id: "1", name: "Food & Dining", color: "#ef4444", icon: "🍔", type: "expense" },
    { id: "2", name: "Transportation", color: "#f97316", icon: "🚗", type: "expense" },
    { id: "3", name: "Shopping", color: "#eab308", icon: "🛍️", type: "expense" },
    { id: "4", name: "Entertainment", color: "#22c55e", icon: "🎮", type: "expense" },
    { id: "5", name: "Bills & Utilities", color: "#3b82f6", icon: "📱", type: "expense" },
    { id: "6", name: "Health", color: "#a855f7", icon: "💊", type: "expense" },
    { id: "7", name: "Education", color: "#ec4899", icon: "📚", type: "expense" },
    { id: "8", name: "Other", color: "#6b7280", icon: "📦", type: "expense" },
    { id: "9", name: "Salary", color: "#10b981", icon: "💰", type: "income" },
    { id: "10", name: "Freelance", color: "#14b8a6", icon: "💻", type: "income" },
    { id: "11", name: "Investments", color: "#06b6d4", icon: "📈", type: "income" },
    { id: "12", name: "Gifts", color: "#8b5cf6", icon: "🎁", type: "income" },
] as const;

export type Category = (typeof DEFAULT_CATEGORIES)[number];
