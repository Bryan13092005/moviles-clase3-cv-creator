import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TuTiColors } from "../constants/theme";
import { CVData } from "../types/cv.types";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const { personalInfo, experiences, education } = cvData;
  const hasContent =
    Boolean(personalInfo.fullName.trim()) ||
    experiences.length > 0 ||
    education.length > 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.paper}>
        <View style={styles.header}>
          <View style={styles.headerIdentity}>
            {personalInfo.photoUri ? (
              <Image source={{ uri: personalInfo.photoUri }} style={styles.profileImage} />
            ) : null}
            <Text style={styles.name}>{personalInfo.fullName || "Tu Nombre"}</Text>
          </View>
          <View style={styles.contactInfo}>
            {personalInfo.email ? <Text style={styles.contactText}>{personalInfo.email}</Text> : null}
            {personalInfo.phone ? <Text style={styles.contactText}>{personalInfo.phone}</Text> : null}
            {personalInfo.location ? <Text style={styles.contactText}>{personalInfo.location}</Text> : null}
          </View>
        </View>

        {personalInfo.summary ? (
          <View style={styles.section}>
            <SectionHeading title="Resumen profesional" />
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        ) : null}

        {personalInfo.hBlandas ? (
          <View style={styles.section}>
            <SectionHeading title="Habilidades blandas" />
            <Text style={styles.summaryText}>{personalInfo.hBlandas}</Text>
          </View>
        ) : null}

        {experiences.length > 0 ? (
          <View style={styles.section}>
            <SectionHeading title="Experiencia laboral" />
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.endDate || "Actual"}
                </Text>
                {exp.description ? (
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View style={styles.section}>
            <SectionHeading title="Educación" />
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                {edu.field ? <Text style={styles.itemSubtitle}>{edu.field}</Text> : null}
                <Text style={styles.itemInstitution}>{edu.institution}</Text>
                {edu.graduationYear ? (
                  <Text style={styles.itemDate}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {!hasContent ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Tu CV aparecerá aquí</Text>
            <Text style={styles.emptyText}>
              Completa tus datos, experiencia o formación para empezar a construirlo.
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

function SectionHeading({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionAccent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TuTiColors.background,
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 36,
    alignItems: "center",
  },
  paper: {
    width: "100%",
    maxWidth: 680,
    minHeight: 520,
    backgroundColor: TuTiColors.white,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#172033",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    backgroundColor: TuTiColors.blue,
    borderBottomWidth: 6,
    borderBottomColor: TuTiColors.yellow,
    paddingHorizontal: 22,
    paddingVertical: 24,
    marginBottom: 22,
  },
  headerIdentity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
  },
  profileImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: TuTiColors.yellow,
  },
  name: {
    fontSize: 29,
    lineHeight: 34,
    fontWeight: "900",
    color: TuTiColors.white,
    flex: 1,
  },
  contactInfo: {
    gap: 5,
  },
  contactText: {
    fontSize: 13,
    color: TuTiColors.white,
  },
  section: {
    marginHorizontal: 22,
    marginBottom: 22,
  },
  sectionHeading: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: TuTiColors.blue,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  sectionAccent: {
    height: 4,
    width: 50,
    borderRadius: 3,
    backgroundColor: TuTiColors.yellow,
  },
  summaryText: {
    fontSize: 14,
    color: TuTiColors.text,
    lineHeight: 21,
  },
  item: {
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: TuTiColors.border,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: TuTiColors.text,
    marginBottom: 3,
  },
  itemSubtitle: {
    fontSize: 14,
    color: TuTiColors.blue,
    fontWeight: "600",
    marginBottom: 3,
  },
  itemInstitution: {
    fontSize: 13,
    color: TuTiColors.muted,
    marginBottom: 3,
  },
  itemDate: {
    fontSize: 12,
    color: TuTiColors.muted,
    fontStyle: "italic",
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 13,
    color: TuTiColors.text,
    lineHeight: 19,
    marginTop: 5,
  },
  emptyState: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyTitle: {
    color: TuTiColors.blue,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 8,
  },
  emptyText: {
    color: TuTiColors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
});
