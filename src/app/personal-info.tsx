import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { InputField } from "@/components/InputField";
import { NavigationButton } from "@/components/NavigationButton";
import { useCVContext } from "@/context/CVContext";
import { PersonalInfo } from "@/types/cv.types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TuTiColors } from "@/constants/theme";
import { SubirImage } from "@/components/subirImage";

type PersonalInfoField = "fullName" | "email" | "phone";
type PersonalInfoErrors = Partial<Record<PersonalInfoField, string>>;

const validateField = (field: PersonalInfoField, value: string) => {
    if (field === "fullName") {
        if (!value.trim()) return "El nombre es obligatorio.";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
            return "El nombre solo debe contener letras.";
        }
    }

    if (field === "email") {
        if (!value.trim()) return "El correo electrónico es obligatorio.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Ingresa un correo electrónico válido.";
        }
    }

    if (field === "phone" && value && !/^\d{10}$/.test(value)) {
        return "El teléfono debe tener exactamente 10 dígitos.";
    }

    return undefined;
};

export default function PersonalInfoScreen() {
    const router = useRouter();
    const { cvData, updatePersonalInfo } = useCVContext();

    const [formData, setFormData] = useState<PersonalInfo>(cvData.personalInfo);
    const [errors, setErrors] = useState<PersonalInfoErrors>({});

    const handleFieldChange = (field: PersonalInfoField, value: string) => {
        setFormData((current) => ({ ...current, [field]: value }));
        const error = validateField(field, value);
        setErrors((current) => {
            const next = { ...current };
            if (error) next[field] = error;
            else delete next[field];
            return next;
        });
    };

    const handleSave = () => {
        const nextErrors: PersonalInfoErrors = {
            fullName: validateField("fullName", formData.fullName),
            email: validateField("email", formData.email),
            phone: validateField("phone", formData.phone),
        };
        setErrors(nextErrors);

        if (Object.values(nextErrors).some(Boolean)) {
            if (!formData.fullName.trim() || !formData.email.trim()) {
                Alert.alert("Información incompleta", "Por favor ingresa tu nombre y correo.");
            }
            return;
        }

        updatePersonalInfo(formData);
        Alert.alert("Éxito", "Información guardada correctamente.", [
            { text: "Listo", onPress: () => router.back() },
        ]);
    };

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.intro}>
                <View style={styles.accentLine} />
                <Text style={styles.title}>Empecemos por ti</Text>
                <Text style={styles.description}>
                    Estos datos ayudarán a que las personas te conozcan y puedan contactarte.
                </Text>
            </View>
            <View style={styles.formCard}>
                <SubirImage
                    imageUri={formData.photoUri || null}
                    onImageSelected={(uri) => setFormData({ ...formData, photoUri: uri })}
                    onImageRemoved={() => setFormData({ ...formData, photoUri: "" })}
                />

                <InputField
                    label="Nombre completo *"
                    placeholder="Ej. Bryan Salvador"
                    value={formData.fullName}
                    onChangeText={(text) => handleFieldChange("fullName", text)}
                    error={errors.fullName}
                    autoCapitalize="words"
                />
                <InputField
                    label="Correo electrónico *"
                    placeholder="nombre@correo.com"
                    value={formData.email}
                    onChangeText={(text) => handleFieldChange("email", text)}
                    error={errors.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <InputField
                    label="Teléfono"
                    placeholder="0999999999"
                    value={formData.phone}
                    onChangeText={(text) => handleFieldChange("phone", text)}
                    error={errors.phone}
                    keyboardType="phone-pad"
                />
                <InputField
                    label="Ubicación"
                    placeholder="Ciudad, sector"
                    value={formData.location}
                    onChangeText={(text) => setFormData({ ...formData, location: text })}
                />
                <InputField
                    label="Resumen profesional"
                    placeholder="Describe brevemente tu perfil, fortalezas y objetivos."
                    value={formData.summary}
                    onChangeText={(text) => setFormData({ ...formData, summary: text })}
                    multiline
                    numberOfLines={4}
                    style={styles.multilineInput}
                />

                <InputField
                    label="Habilidades blandas"
                    placeholder="Describe tus habilidades blandas."
                    value={formData.hBlandas}
                    onChangeText={(text) => setFormData({ ...formData, hBlandas: text })}
                    multiline
                    numberOfLines={4}
                    style={styles.multilineInput}
                />
                <NavigationButton title="Guardar información" onPress={handleSave} />
                <NavigationButton title="Cancelar" onPress={() => router.back()} variant="secondary" />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TuTiColors.background,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 36,
        maxWidth: 640,
        width: "100%",
        alignSelf: "center",
    },
    intro: {
        backgroundColor: TuTiColors.white,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 18,
        padding: 18,
        elevation: 2,
        shadowColor: "#172033",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },
    accentLine: {
        height: 5,
        backgroundColor: TuTiColors.yellow,
        marginHorizontal: -18,
        marginTop: -18,
        marginBottom: 16,
    },
    title: {
        color: TuTiColors.blue,
        fontSize: 23,
        fontWeight: "800",
        marginBottom: 6,
    },
    description: {
        color: TuTiColors.muted,
        fontSize: 14,
        lineHeight: 21,
    },
    formCard: {
        backgroundColor: TuTiColors.white,
        borderRadius: 20,
        padding: 18,
        elevation: 2,
        shadowColor: "#172033",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },
    multilineInput: {
        minHeight: 112,
        textAlignVertical: "top",
    },
});