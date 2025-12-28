import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Text, View } from "react-native";

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-full px-3 py-1",
    {
        variants: {
            variant: {
                default: "bg-primary",
                secondary: "bg-secondary",
                destructive: "bg-destructive",
                outline: "border border-border bg-transparent",
                income: "bg-income/20",
                expense: "bg-expense/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const badgeTextVariants = cva("text-xs font-semibold", {
    variants: {
        variant: {
            default: "text-primary-foreground",
            secondary: "text-secondary-foreground",
            destructive: "text-destructive-foreground",
            outline: "text-foreground",
            income: "text-income",
            expense: "text-expense",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
    children: React.ReactNode;
    className?: string;
    textClassName?: string;
    icon?: string;
}

export function Badge({
    children,
    variant,
    className,
    textClassName,
    icon,
}: BadgeProps) {
    return (
        <View className={cn(badgeVariants({ variant }), className)}>
            {icon && <Text className="mr-1">{icon}</Text>}
            <Text className={cn(badgeTextVariants({ variant }), textClassName)}>
                {children}
            </Text>
        </View>
    );
}

// Category badge with custom color
export interface CategoryBadgeProps {
    name: string;
    icon?: string;
    color?: string;
    className?: string;
}

export function CategoryBadge({
    name,
    icon,
    color = "#6b7280",
    className,
}: CategoryBadgeProps) {
    return (
        <View
            className={cn(
                "flex-row items-center rounded-full px-3 py-1",
                className
            )}
            style={{ backgroundColor: `${color}20` }}
        >
            {icon && <Text className="mr-1">{icon}</Text>}
            <Text className="text-xs font-semibold" style={{ color }}>
                {name}
            </Text>
        </View>
    );
}
