import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { TuTiColors } from "@/constants/theme";

interface NavigationButtonProps {
    title: string;
    onPress: () => void;
    variant ?: "primary" | "secondary" | "danger";
    style ?: ViewStyle;
}

export const NavigationButton = ({
    title,
    onPress,
    variant = "primary",
    style,
    }: NavigationButtonProps) => {
        return (
            <TouchableOpacity
            style={[styles.button, styles[variant], style]}
            onPress={onPress}
            activeOpacity={0.8}
            >
                <Text
                style={[styles.text, variant === "secondary" && styles.textSecondary]}
                >
                    {title}
                </Text>
            </TouchableOpacity>
);
};

const styles = StyleSheet.create({
    button: {
        minHeight: 54,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: TuTiColors.yellow,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
    },
    primary: {
        backgroundColor: TuTiColors.blue,
    },
    secondary: {
        backgroundColor: "transparent",
        borderColor: TuTiColors.blue,
    },
    danger: {
        backgroundColor: TuTiColors.danger,
    },
    text: {
        color: TuTiColors.white,
        fontSize: 16,
        fontWeight: "700",
    },
    textSecondary: {
        color: TuTiColors.blue,
    },
});