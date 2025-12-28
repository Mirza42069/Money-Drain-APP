import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as Haptics from "expo-haptics";
import * as React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const buttonVariants = cva(
    "flex-row items-center justify-center rounded-lg active:opacity-80",
    {
        variants: {
            variant: {
                default: "bg-primary",
                secondary: "bg-secondary",
                destructive: "bg-destructive",
                outline: "border border-border bg-transparent",
                ghost: "bg-transparent",
            },
            size: {
                default: "h-12 px-6 py-3",
                sm: "h-9 px-4 py-2",
                lg: "h-14 px-8 py-4",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const buttonTextVariants = cva("font-semibold text-center", {
    variants: {
        variant: {
            default: "text-primary-foreground",
            secondary: "text-secondary-foreground",
            destructive: "text-destructive-foreground",
            outline: "text-foreground",
            ghost: "text-foreground",
        },
        size: {
            default: "text-base",
            sm: "text-sm",
            lg: "text-lg",
            icon: "text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
    children?: React.ReactNode;
    className?: string;
    textClassName?: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
    haptic?: boolean;
    icon?: React.ReactNode;
}

export function Button({
    children,
    className,
    textClassName,
    variant,
    size,
    onPress,
    disabled = false,
    loading = false,
    haptic = true,
    icon,
}: ButtonProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.97, { damping: 10, stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 10, stiffness: 400 });
    };

    const handlePress = () => {
        if (haptic) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress?.();
    };

    return (
        <AnimatedPressable
            style={animatedStyle}
            className={cn(
                buttonVariants({ variant, size }),
                disabled && "opacity-50",
                className
            )}
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === "default" ? "#09090b" : "#fafafa"}
                />
            ) : (
                <>
                    {icon && <View className="mr-2">{icon}</View>}
                    {typeof children === "string" ? (
                        <Text className={cn(buttonTextVariants({ variant, size }), textClassName)}>
                            {children}
                        </Text>
                    ) : (
                        children
                    )}
                </>
            )}
        </AnimatedPressable>
    );
}
