import { cn } from "@/lib/utils";
import * as React from "react";
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    Text,
    View,
} from "react-native";

export interface InputProps extends RNTextInputProps {
    label?: string;
    error?: string;
    containerClassName?: string;
}

export const Input = React.forwardRef<RNTextInput, InputProps>(
    ({ label, error, className, containerClassName, ...props }, ref) => {
        return (
            <View className={cn("mb-4", containerClassName)}>
                {label && (
                    <Text className="mb-2 text-sm font-medium text-foreground">
                        {label}
                    </Text>
                )}
                <RNTextInput
                    ref={ref}
                    className={cn(
                        "h-12 rounded-lg border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground",
                        "focus:border-ring",
                        error && "border-destructive",
                        className
                    )}
                    placeholderTextColor="#71717a"
                    {...props}
                />
                {error && (
                    <Text className="mt-1 text-sm text-destructive">{error}</Text>
                )}
            </View>
        );
    }
);

Input.displayName = "Input";

// Amount input specifically for currency
export interface AmountInputProps extends Omit<RNTextInputProps, "value" | "onChangeText"> {
    value: string;
    onChangeText: (value: string) => void;
    currencySymbol?: string;
    label?: string;
    error?: string;
}

export function AmountInput({
    value,
    onChangeText,
    currencySymbol = "$",
    label,
    error,
    className,
    ...props
}: AmountInputProps) {
    const handleChange = (text: string) => {
        // Remove non-numeric characters except decimal
        const cleaned = text.replace(/[^0-9.]/g, "");
        // Only allow one decimal point
        const parts = cleaned.split(".");
        const formatted = parts.length > 2
            ? parts[0] + "." + parts.slice(1).join("")
            : cleaned;
        onChangeText(formatted);
    };

    return (
        <View className="mb-4">
            {label && (
                <Text className="mb-2 text-sm font-medium text-foreground">
                    {label}
                </Text>
            )}
            <View className="flex-row items-center">
                <Text className="mr-2 text-3xl font-bold text-muted-foreground">
                    {currencySymbol}
                </Text>
                <RNTextInput
                    className={cn(
                        "flex-1 text-4xl font-bold text-foreground",
                        error && "text-destructive",
                        className
                    )}
                    value={value}
                    onChangeText={handleChange}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor="#71717a"
                    {...props}
                />
            </View>
            {error && (
                <Text className="mt-1 text-sm text-destructive">{error}</Text>
            )}
        </View>
    );
}
