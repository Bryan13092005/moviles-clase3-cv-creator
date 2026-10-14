import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Experience } from "../types/cv.types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TuTiColors } from "../constants/theme";

type ExperienceField = "company" | "position" | "startDate" | "endDate";
type ExperienceErrors = Partial<Record<ExperienceField, string>>;
type ExperienceFormData = Omit<Experience, "id">;

const parseExperienceDate = (value: string) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;

  const [, dayText, monthText, yearText] = match;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
};

const getExperienceErrors = (formData: ExperienceFormData): ExperienceErrors => {
  const errors: ExperienceErrors = {};
  if (!formData.company.trim()) errors.company = "La empresa es obligatoria.";
  if (!formData.position.trim()) errors.position = "El cargo es obligatorio.";

  const startDate = formData.startDate.trim()
    ? parseExperienceDate(formData.startDate)
    : null;
  const endDateText = formData.endDate.trim();
  const isCurrentPosition = /^actual$/i.test(endDateText);
  const endDate =
    endDateText && !isCurrentPosition ? parseExperienceDate(endDateText) : null;

  if (!formData.startDate.trim()) {
    errors.startDate = "La fecha de inicio es obligatoria.";
  } else if (!startDate) {
    errors.startDate = "Ingresa una fecha válida (DD/MM/AAAA).";
  }

  if (endDateText && !isCurrentPosition && !endDate) {
    errors.endDate = "Ingresa una fecha válida (DD/MM/AAAA).";
  } else if (startDate && endDate && endDate < startDate) {
    errors.endDate = "La fecha de fin no puede ser anterior a la fecha de inicio.";
  }

  return errors;
};

export default function ExperienceScreen() {
  const router = useRouter();
  type DateField = "startDate" | "endDate";
  const { cvData, addExperience, deleteExperience } = useCVContext();
  const [activeDatePicker, setActiveDatePicker] = useState<DateField | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [errors, setErrors] = useState<ExperienceErrors>({});

  const handleFieldChange = (field: ExperienceField, value: string) => {
    const nextFormData = { ...formData, [field]: value };
    setFormData(nextFormData);
    const validation = getExperienceErrors(nextFormData);
    const fieldsToUpdate: ExperienceField[] =
      field === "startDate" ? ["startDate", "endDate"] : [field];

    setErrors((current) => {
      const next = { ...current };
      fieldsToUpdate.forEach((fieldToUpdate) => {
        const error = validation[fieldToUpdate];
        if (error) next[fieldToUpdate] = error;
        else delete next[fieldToUpdate];
      });
      return next;
    });
  };

  const handleAdd = () => {
    const nextErrors = getExperienceErrors(formData);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      if (
        !formData.company.trim() ||
        !formData.position.trim() ||
        !formData.startDate.trim()
      ) {
        Alert.alert(
          "Información incompleta",
          "Completa empresa, cargo y fecha de inicio."
        );
      }
      return;
    }

    const newExperience: Experience = {
      id: Date.now().toString(),
      ...formData,
    };

    addExperience(newExperience);

    // Limpiar formulario
    setFormData({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setErrors({});

    Alert.alert("Éxito", "Experiencia agregada correctamente.");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Eliminar experiencia", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
      },
    ]);
  };


  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}/${date.getFullYear()}`;
  };

  const parseDate = (value: string) => {
    return parseExperienceDate(value) ?? new Date();
  };

  const renderDatePicker = (field: DateField) => {
    if (Platform.OS === "web" || activeDatePicker !== field) {
      return null;
    }

    return (
      <View>
        <DateTimePicker
          value={parseDate(formData[field])}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            if (selectedDate) {
              handleFieldChange(field, formatDate(selectedDate));
            }

            if (Platform.OS === "android") {
              setActiveDatePicker(null);
            }
          }}
        />
        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={styles.datePickerDone}
            onPress={() => setActiveDatePicker(null)}
          >
            <Text style={styles.datePickerDoneText}>Listo</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid
      extraScrollHeight={50}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.intro}>
        <View style={styles.accentLine} />
        <Text style={styles.title}>Tu experiencia cuenta</Text>
        <Text style={styles.description}>
          Añade tus trabajos y enfócate en los logros que mejor representan tu talento.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.cardHeading}>Nueva experiencia</Text>
        <InputField
          label="Empresa *"
          placeholder="Nombre de la empresa"
          value={formData.company}
          onChangeText={(text) => handleFieldChange("company", text)}
          error={errors.company}
        />
        <InputField
          label="Cargo *"
          placeholder="Tu posición"
          value={formData.position}
          onChangeText={(text) => handleFieldChange("position", text)}
          error={errors.position}
        />
        {Platform.OS === "web" ? (
          <InputField
            label="Fecha de inicio *"
            placeholder="DD/MM/AAAA"
            value={formData.startDate}
            onChangeText={(text) => handleFieldChange("startDate", text)}
            error={errors.startDate}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveDatePicker("startDate")}
          >
            <View pointerEvents="none">
              <InputField
                label="Fecha de inicio *"
                placeholder="Selecciona una fecha"
                value={formData.startDate}
                editable={false}
                error={errors.startDate}
              />
            </View>
          </TouchableOpacity>
        )}
        {renderDatePicker("startDate")}
        {Platform.OS === "web" ? (
          <InputField
            label="Fecha de fin"
            placeholder="DD/MM/AAAA o Actual"
            value={formData.endDate}
            onChangeText={(text) => handleFieldChange("endDate", text)}
            error={errors.endDate}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveDatePicker("endDate")}
          >
            <View pointerEvents="none">
              <InputField
                label="Fecha de fin"
                placeholder="Selecciona una fecha (opcional)"
                value={formData.endDate}
                editable={false}
                error={errors.endDate}
              />
            </View>
          </TouchableOpacity>
        )}
        {renderDatePicker("endDate")}
        <InputField
          label="Descripción"
          placeholder="Describe tus responsabilidades y logros."
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={4}
          style={styles.multilineInput}
        />
        <NavigationButton title="Agregar experiencia" onPress={handleAdd} />
      </View>

      {cvData.experiences.length > 0 && (
        <View style={styles.listSection}>
          <Text style={styles.listTitle}>Experiencias agregadas</Text>
          {cvData.experiences.map((exp) => (
            <View key={exp.id} style={styles.experienceCard}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{exp.position}</Text>
                <Text style={styles.cardSubtitle}>{exp.company}</Text>
                <Text style={styles.cardDate}>
                  {exp.startDate} - {exp.endDate || "Actual"}
                </Text>
                {exp.description ? (
                  <Text style={styles.cardDescription}>{exp.description}</Text>
                ) : null}
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Eliminar experiencia en ${exp.company}`}
                style={styles.deleteButton}
                onPress={() => handleDelete(exp.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <NavigationButton
        title="Volver"
        onPress={() => router.back()}
        variant="secondary"
        style={styles.backButton}
      />
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
  cardHeading: {
    color: TuTiColors.blue,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 16,
  },
  multilineInput: {
    minHeight: 112,
    textAlignVertical: "top",
  },
  listSection: {
    marginTop: 24,
  },
  listTitle: {
    color: TuTiColors.blue,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 12,
  },
  experienceCard: {
    backgroundColor: TuTiColors.white,
    borderLeftWidth: 4,
    borderLeftColor: TuTiColors.blue,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#172033",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TuTiColors.text,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 14,
    color: TuTiColors.blue,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: TuTiColors.muted,
  },
  cardDescription: {
    fontSize: 13,
    color: TuTiColors.text,
    lineHeight: 19,
    marginTop: 8,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: TuTiColors.danger,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  deleteButtonText: {
    color: TuTiColors.white,
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "500",
  },
  datePickerDone: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: TuTiColors.blue,
  },
  datePickerDoneText: {
    color: TuTiColors.white,
    fontWeight: "700",
  },
  backButton: {
    marginTop: 16,
  },
});
