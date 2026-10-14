import { Stack } from 'expo-router';
import { CVProvider } from '../context/CVContext';
import { TuTiColors } from '../constants/theme';

export default function RootLayout() {
  return(
    <CVProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: TuTiColors.blue,
          },
          headerTintColor: TuTiColors.yellow,
          headerTitleStyle: {
            color: TuTiColors.white,
            fontWeight: "800",
          },
          contentStyle: { backgroundColor: TuTiColors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Crear CV' }} />
        <Stack.Screen name="personal-info" options={{ title: 'Información personal' }} />
        <Stack.Screen name="experience" options={{ title: 'Experiencia laboral' }} />
        <Stack.Screen name="education" options={{ title: 'Educación' }} />
        <Stack.Screen
          name="preview"
          options={{ title: 'Vista previa', presentation: 'modal' }}
        />
      </Stack>
    </CVProvider>
  );
}