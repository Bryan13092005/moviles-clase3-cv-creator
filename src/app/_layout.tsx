import { Stack } from 'expo-router';
import { CVProvider } from '../context/CVContext';

export default function RootLayout(){
  return(
    <CVProvider>
      <Stack
        screenOptions={{
          headerStyle:{
            backgroundColor:"#3498db",
          },
          headerTintColor:"#fff",
          headerTitleStyle:{
            fontWeight:"bold",
          },
        }}
      >
        <Stack.Screen name='index'
        options={{title:'Crear CV'}}/>
        <Stack.Screen name='Personal-info'
        options={{title:'Información Personal'}}/>
        <Stack.Screen name='experience'
        options={{title:'Exeriencia Laboral'}}/>
        <Stack.Screen name='education'
        options={{title:'Educación'}}/>
        <Stack.Screen name='preview'
        options={{title:'Vistra Previa',
          presentation:"modal"
        }}/>
      </Stack>
    </CVProvider>
  );
}