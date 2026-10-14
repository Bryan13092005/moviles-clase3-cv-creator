import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCVContext } from "../context/CVContext";
import { TuTiColors } from "../constants/theme";

export default function HomeScreen() {
  const router = useRouter();
  const { cvData } = useCVContext();

  const isPersonalInfoComplete = Boolean(
    cvData.personalInfo.fullName.trim() && cvData.personalInfo.email.trim()
  );
  const hasExperience = cvData.experiences.length > 0;
  const hasEducation = cvData.education.length > 0;
  const completedSections = [isPersonalInfoComplete, hasExperience, hasEducation]
    .filter(Boolean).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>TU TALENTO, EN PRIMER PLANO</Text>
        <Text style={styles.title}>Tu CV{"\n"}Profesional</Text>
        <Text style={styles.heroDescription}>
          Completa tus datos y crea una presentación que hable bien de ti.
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(completedSections / 3) * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{completedSections} de 3 secciones completas</Text>
      </View>

      <Text style={styles.sectionHeading}>Construye tu perfil</Text>
      <SectionCard
        number="01"
        title="Información personal"
        description="Cuéntanos quién eres y cómo contactarte."
        status={isPersonalInfoComplete ? "✓ Completado" : "Pendiente"}
        complete={isPersonalInfoComplete}
        action="Editar"
        onPress={() => router.push("/personal-info")}
      />
      <SectionCard
        number="02"
        title="Experiencia laboral"
        description="Destaca tus logros y trayectoria."
        status={hasExperience ? `✓ ${cvData.experiences.length} agregada(s)` : "Pendiente"}
        complete={hasExperience}
        action={hasExperience ? "Editar" : "Agregar"}
        onPress={() => router.push("/experience")}
      />
      <SectionCard
        number="03"
        title="Educación"
        description="Añade tus estudios y formación."
        status={hasEducation ? `✓ ${cvData.education.length} agregada(s)` : "Pendiente"}
        complete={hasEducation}
        action={hasEducation ? "Editar" : "Agregar"}
        onPress={() => router.push("/education")}
      />

      <TouchableOpacity
        style={styles.previewButton}
        onPress={() => router.push("/preview")}
        activeOpacity={0.85}
      >
        <Text style={styles.previewButtonTitle}>Ver vista previa</Text>
        <Text style={styles.previewButtonHint}>Revisa cómo se verá tu CV  →</Text>
      </TouchableOpacity>
      <Text style={styles.footerNote}>Puedes actualizar tu información cuando quieras.</Text>
    </ScrollView>
  );
}

function SectionCard({
  number,
  title,
  description,
  status,
  complete,
  action,
  onPress,
}: {
  number: string;
  title: string;
  description: string;
  status: string;
  complete: boolean;
  action: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.cardTopRow}>
        <Text style={styles.sectionNumber}>{number}</Text>
        <View style={[styles.statusBadge, complete ? styles.completeBadge : styles.pendingBadge]}>
          <Text style={[styles.statusText, complete ? styles.completeText : styles.pendingText]}>
            {status}
          </Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      <TouchableOpacity style={styles.editButton} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.editButtonText}>{action}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TuTiColors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 36,
    maxWidth: 640,
    width: "100%",
    alignSelf: "center",
  },
  hero: {
    backgroundColor: TuTiColors.blue,
    borderColor: TuTiColors.yellow,
    borderWidth: 2,
    borderRadius: 28,
    padding: 22,
    marginBottom: 28,
  },
  eyebrow: {
    color: TuTiColors.yellow,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    color: TuTiColors.white,
    marginBottom: 10,
  },
  heroDescription: {
    color: "#E5E7FF",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
  },
  progressTrack: {
    height: 7,
    borderRadius: 8,
    backgroundColor: "#454BB8",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 8,
    backgroundColor: TuTiColors.yellow,
  },
  progressLabel: {
    color: TuTiColors.white,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 9,
  },
  sectionHeading: {
    color: TuTiColors.blue,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },
  sectionCard: {
    backgroundColor: TuTiColors.white,
    borderLeftWidth: 4,
    borderLeftColor: TuTiColors.yellow,
    borderRadius: 18,
    padding: 17,
    marginBottom: 13,
    shadowColor: "#172033",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  sectionNumber: {
    color: TuTiColors.blue,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  completeBadge: {
    backgroundColor: "#DCFCE7",
  },
  pendingBadge: {
    backgroundColor: "#FFF9B8",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  completeText: {
    color: "#15803D",
  },
  pendingText: {
    color: TuTiColors.blue,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: TuTiColors.text,
    marginBottom: 4,
  },
  sectionDescription: {
    color: TuTiColors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  editButton: {
    alignSelf: "flex-start",
    minWidth: 100,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: TuTiColors.yellow,
    backgroundColor: TuTiColors.blue,
    alignItems: "center",
  },
  editButtonText: {
    color: TuTiColors.white,
    fontSize: 13,
    fontWeight: "700",
  },
  previewButton: {
    backgroundColor: TuTiColors.yellow,
    borderRadius: 20,
    padding: 18,
    marginTop: 8,
    alignItems: "center",
  },
  previewButtonTitle: {
    color: TuTiColors.blue,
    fontSize: 17,
    fontWeight: "800",
  },
  previewButtonHint: {
    color: TuTiColors.blue,
    fontSize: 12,
    marginTop: 4,
  },
  footerNote: {
    color: TuTiColors.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 16,
  },
});

