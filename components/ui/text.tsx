import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

const textVariants = cva("text-foreground", {
    variants: {
        variant: {
            h1: "text-4xl font-bold tracking-tight",
            h2: "text-3xl font-bold tracking-tight",
            h3: "text-2xl font-semibold",
            h4: "text-xl font-semibold",
            body: "text-base",
            lead: "text-xl text-muted-foreground",
            large: "text-lg font-semibold",
            small: "text-sm",
            muted: "text-sm text-muted-foreground",
            money: "text-4xl font-bold tracking-tight font-mono",
        },
    },
    defaultVariants: {
        variant: "body",
    },
});

export interface TextProps
    extends RNTextProps,
    VariantProps<typeof textVariants> {
    className?: string;
}

export function Text({ variant, className, ...props }: TextProps) {
    return (
        <RNText className={cn(textVariants({ variant }), className)} {...props} />
    );
}

// Convenience components
export function H1(props: Omit<TextProps, "variant">) {
    return <Text variant="h1" {...props} />;
}

export function H2(props: Omit<TextProps, "variant">) {
    return <Text variant="h2" {...props} />;
}

export function H3(props: Omit<TextProps, "variant">) {
    return <Text variant="h3" {...props} />;
}

export function H4(props: Omit<TextProps, "variant">) {
    return <Text variant="h4" {...props} />;
}

export function Lead(props: Omit<TextProps, "variant">) {
    return <Text variant="lead" {...props} />;
}

export function Large(props: Omit<TextProps, "variant">) {
    return <Text variant="large" {...props} />;
}

export function Small(props: Omit<TextProps, "variant">) {
    return <Text variant="small" {...props} />;
}

export function Muted(props: Omit<TextProps, "variant">) {
    return <Text variant="muted" {...props} />;
}

export function Money(props: Omit<TextProps, "variant">) {
    return <Text variant="money" {...props} />;
}
