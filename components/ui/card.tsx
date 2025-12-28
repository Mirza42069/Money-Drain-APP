import { cn } from "@/lib/utils";
import * as React from "react";
import { Pressable, Text, View } from "react-native";

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    onPress?: () => void;
}

export function Card({ children, className, onPress }: CardProps) {
    const Wrapper = onPress ? Pressable : View;

    return (
        <Wrapper
            onPress={onPress}
            className={cn(
                "rounded-xl border border-border bg-card p-4",
                onPress && "active:opacity-80",
                className
            )}
        >
            {children}
        </Wrapper>
    );
}

export interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return <View className={cn("mb-3", className)}>{children}</View>;
}

export interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <Text className={cn("text-lg font-semibold text-card-foreground", className)}>
            {children}
        </Text>
    );
}

export interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
    return (
        <Text className={cn("text-sm text-muted-foreground", className)}>
            {children}
        </Text>
    );
}

export interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return <View className={cn("", className)}>{children}</View>;
}

export interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
    return (
        <View className={cn("mt-4 flex-row items-center", className)}>
            {children}
        </View>
    );
}
