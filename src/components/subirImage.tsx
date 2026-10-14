import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface SubirImageProps {
  imageUri: string | null;
  onImageSelected: (uri: string) => void;
  onImageRemoved?: () => void;
}

export const SubirImage: React.FC<SubirImageProps> = ({
  imageUri,
  onImageSelected,
  onImageRemoved,
}) => {
  // Solicitar permisos y tomar foto con la cámara
  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso requerido",
        "Se necesita acceso a la cámara para tomar una foto de perfil."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImageSelected(result.assets[0].uri);
    }
  };

  // Solicitar permisos y elegir de la galería
  const seleccionarDeGaleria = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso requerido",
        "Se necesita acceso a la galería para seleccionar una imagen."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImageSelected(result.assets[0].uri);
    }
  };

  // Mostrar diálogo de opciones
  const mostrarOpciones = () => {
    Alert.alert(
      "Foto de Perfil",
      "¿De dónde deseas obtener la imagen?",
      [
        { text: "Cámara", onPress: tomarFoto },
        { text: "Galería", onPress: seleccionarDeGaleria },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Foto de Perfil</Text>

      <View style={styles.avatarContainer}>
        {imageUri ? (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: imageUri }} style={styles.avatarImage} />
            {onImageRemoved && (
              <TouchableOpacity
                style={styles.removeBadge}
                onPress={onImageRemoved}
              >
                <Text style={styles.removeText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.placeholderButton}
            onPress={mostrarOpciones}
            activeOpacity={0.8}
          >
            <Text style={styles.cameraIcon}>📷</Text>
            <Text style={styles.placeholderText}>Agregar Foto</Text>
          </TouchableOpacity>
        )}
      </View>

      {imageUri && (
        <TouchableOpacity style={styles.changeButton} onPress={mostrarOpciones}>
          <Text style={styles.changeButtonText}>Cambiar Foto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0B13A5", // Azul corporativo TuTi
    marginBottom: 12,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#FFF000", // Amarillo promocional TuTi
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  placeholderButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  cameraIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  placeholderText: {
    fontSize: 12,
    color: "#0B13A5",
    fontWeight: "600",
  },
  removeBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#DC2626",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  removeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  changeButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#0B13A5",
    borderRadius: 20, // Estilo Píldora
  },
  changeButtonText: {
    color: "#FFF000",
    fontSize: 14,
    fontWeight: "bold",
  },
});