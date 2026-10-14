import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Experience } from "../types/cv.types";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';

type DateField = "startDate" | "endDate";

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
};

const parseDate = (value: string) => {
  const [day, month, year] = value.split("/").map(Number);
  return day && month && year ? new Date(year, month - 1, day) : new Date();
};

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();

  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [activeDatePicker, setActiveDatePicker] = useState<DateField | null>(
    null
  );

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
          onValueChange={(_, selectedDate) => {
            setFormData((current) => ({
              ...current,
              [field]: formatDate(selectedDate),
            }));

            if (Platform.OS === "android") {
              setActiveDatePicker(null);
            }
          }}
          onDismiss={() => setActiveDatePicker(null)}
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

  const handleAdd = () => {
    if (!formData.company || !formData.position || !formData.startDate) {
      Alert.alert(
        "Error",
        "Por favor completa al menos empresa, cargo y fecha de inicio"
      );
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

    Alert.alert("Éxito", "Experiencia agregada correctamente");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
      },
    ]);
  };

  return (
    <KeyboardAwareScrollView
          style={styles.container}
        contentContainerStyle={styles.contentContainer}
          enableOnAndroid={true}
          extraScrollHeight={50}
          keyboardShouldPersistTaps="handled"
        >
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Agregar Nueva Experiencia</Text>

        <InputField
          label="Empresa *"
          placeholder="Nombre de la empresa"
          value={formData.company}
          onChangeText={(text) => setFormData({ ...formData, company: text })}
        />

        <InputField
          label="Cargo *"
          placeholder="Tu posición"
          value={formData.position}
          onChangeText={(text) => setFormData({ ...formData, position: text })}
        />

        <InputField
          label="Fecha de Inicio *"
          placeholder="Selecciona una fecha"
          value={formData.startDate}
          onChangeText={(text) =>
            setFormData({ ...formData, startDate: text })
          }
          editable={Platform.OS === "web"}
          showSoftInputOnFocus={Platform.OS === "web"}
          onPressIn={() => setActiveDatePicker("startDate")}
        />
        {renderDatePicker("startDate")}

        <InputField
          label="Fecha de Fin"
          placeholder="Selecciona una fecha (opcional)"
          value={formData.endDate}
          onChangeText={(text) => setFormData({ ...formData, endDate: text })}
          editable={Platform.OS === "web"}
          showSoftInputOnFocus={Platform.OS === "web"}
          onPressIn={() => setActiveDatePicker("endDate")}
        />
        {renderDatePicker("endDate")}

        <InputField
          label="Descripción"
          placeholder="Describe tus responsabilidades y logros..."
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: "top", borderWidth: 1,borderColor: "#ddd", borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: "#fff", }}
        />

        <NavigationButton title="Agregar Experiencia" onPress={handleAdd} />

        {cvData.experiences.length > 0 && (
          <>
            <Text style={styles.listTitle}>Experiencias Agregadas</Text>
            {cvData.experiences.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{exp.position}</Text>
                  <Text style={styles.cardSubtitle}>{exp.company}</Text>
                  <Text style={styles.cardDate}>
                    {exp.startDate} - {exp.endDate || "Actual"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(exp.id)}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
        <View style={{paddingBottom:50}}>
        <NavigationButton
          title="Volver"
          onPress={() => router.back()}
          variant="secondary"
          style={{ marginTop: 16 }}
        />
        </View>
      </View>
    </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: "#95a5a6",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    paddingBottom:50
  },
  datePickerDone: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  datePickerDoneText: {
    color: "#2c3e50",
    fontSize: 16,
    fontWeight: "600",
  },
});
