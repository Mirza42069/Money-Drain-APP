import { cn } from "@/lib/utils";
import * as React from "react";
import { View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export interface ProgressProps {
    value: number; // 0-100
    className?: string;
    indicatorClassName?: string;
    color?: string;
}

export function Progress({
    value,
    className,
    indicatorClassName,
    color,
}: ProgressProps) {
    const width = useSharedValue(0);

    React.useEffect(() => {
        width.value = withTiming(Math.min(100, Math.max(0, value)), {
            duration: 500,
        });
    }, [value]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${width.value}%`,
    }));

    return (
        <View
            className={cn(
                "h-2 w-full overflow-hidden rounded-full bg-secondary",
                className
            )}
        >
            <Animated.View
                className={cn("h-full rounded-full bg-primary", indicatorClassName)}
                style={[animatedStyle, color ? { backgroundColor: color } : undefined]}
            />
        </View>
    );
}
