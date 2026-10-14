import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
} from "react-native";
import { TuTiColors } from "@/constants/theme";

interface InputFieldProps extends TextInputProps {
    label: string;
    error ?: string;
}
export const InputField = ({
    label,
    error,
    style,
    onFocus,
    onBlur,
    ...props
}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, style, isFocused && styles.inputFocused, error && styles.inputError]}
                placeholderTextColor={TuTiColors.muted}
                onFocus={(event) => {
                    setIsFocused(true);
                    onFocus?.(event);
                }}
                onBlur={(event) => {
                    setIsFocused(false);
                    onBlur?.(event);
                }}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
);
};

const styles = StyleSheet.create ({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: TuTiColors.blue,
        marginBottom: 8,
    },
    input: {
        minHeight: 52,
        borderWidth: 1,
        borderColor: TuTiColors.border,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: TuTiColors.text,
        backgroundColor: TuTiColors.white,
    },
    inputFocused: {
        borderWidth: 2,
        borderColor: TuTiColors.blue,
    },
    inputError: {
        borderColor: TuTiColors.danger,
    },
    errorText: {
        color: TuTiColors.danger,
        fontSize: 12,
        marginTop: 4,
    },
});