import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { TuTiColors } from "../constants/theme";
import { Education } from "../types/cv.types";

export default function EducationScreen() {
  const router = useRouter();
  const { cvData, addEducation, deleteEducation } = useCVContext();

  const [formData, setFormData] = useState<Omit<Education, "id">>({
    institution: "",
    degree: "",
    field: "",
    graduationYear: "",
  });

  const handleAdd = () => {
    if (!formData.institution.trim() || !formData.degree.trim()) {
      Alert.alert("Información incompleta", "Completa al menos la institución y el título.");
      return;
    }

    addEducation({
      id: Date.now().toString(),
      ...formData,
    });
    setFormData({
      institution: "",
      degree: "",
      field: "",
      graduationYear: "",
    });
    Alert.alert("Éxito", "Educación agregada correctamente.");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Eliminar educación", "¿Estás seguro de eliminar esta educación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteEducation(id),
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.intro}>
        <View style={styles.accentLine} />
        <Text style={styles.title}>Tu formación te impulsa</Text>
        <Text style={styles.description}>
          Comparte los estudios y conocimientos que respaldan tu camino profesional.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.cardHeading}>Nueva formación</Text>
        <InputField
          label="Institución *"
          placeholder="Nombre de la universidad o institución"
          value={formData.institution}
          onChangeText={(text) => setFormData({ ...formData, institution: text })}
        />
        <InputField
          label="Título o grado *"
          placeholder="Ej. Licenciatura, Maestría"
          value={formData.degree}
          onChangeText={(text) => setFormData({ ...formData, degree: text })}
        />
        <InputField
          label="Área de estudio"
          placeholder="Ej. Ingeniería en Sistemas"
          value={formData.field}
          onChangeText={(text) => setFormData({ ...formData, field: text })}
        />
        <InputField
          label="Año de graduación"
          placeholder="Ej. 2023"
          value={formData.graduationYear}
          onChangeText={(text) => setFormData({ ...formData, graduationYear: text })}
          keyboardType="numeric"
        />
        <NavigationButton title="Agregar educación" onPress={handleAdd} />
      </View>

      {cvData.education.length > 0 && (
        <View style={styles.listSection}>
          <Text style={styles.listTitle}>Formación agregada</Text>
          {cvData.education.map((edu) => (
            <View key={edu.id} style={styles.educationCard}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{edu.degree}</Text>
                {edu.field ? <Text style={styles.cardSubtitle}>{edu.field}</Text> : null}
                <Text style={styles.cardInstitution}>{edu.institution}</Text>
                {edu.graduationYear ? (
                  <Text style={styles.cardDate}>{edu.graduationYear}</Text>
                ) : null}
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Eliminar formación de ${edu.institution}`}
                style={styles.deleteButton}
                onPress={() => handleDelete(edu.id)}
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
    </ScrollView>
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
  listSection: {
    marginTop: 24,
  },
  listTitle: {
    color: TuTiColors.blue,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 12,
  },
  educationCard: {
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
  cardInstitution: {
    fontSize: 13,
    color: TuTiColors.muted,
  },
  cardDate: {
    fontSize: 12,
    color: TuTiColors.muted,
    marginTop: 3,
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
  backButton: {
    marginTop: 16,
  },
});
