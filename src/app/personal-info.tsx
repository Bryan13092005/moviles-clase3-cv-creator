import React, {useState, useEffect} from "react";
import{View, StyleSheet,ScrollView,Alert} from 'react-native'
import { useRouter } from "expo-router";
import { InputField } from "@/components/InputField";
import { NavigationButton } from "@/components/NavigationButton";
import { useCVContext } from "@/context/CVContext";
import { PersonalInfo } from "@/types/cv.types";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function  PersonalInfoScreen(){
    const router=useRouter();
    const {cvData,updatePersonalInfo}=useCVContext();

    const [formData,setFormData]=useState<PersonalInfo>(cvData.personalInfo);

    useEffect(()=>{
        setFormData(cvData.personalInfo);
    },[cvData.personalInfo])

    const handleSave=()=>{
        if(!formData.fullName || !formData.email){
            Alert.alert("Error","Por favor ingresa tu nombre y correo");
            return;
        }

        updatePersonalInfo(formData);
        Alert.alert("Éxito","Información guardada corectamnete",[{text:'OK',onPress:()=>{router.back()}}
        ]);
    }

    return(
        <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <InputField label="Nombre Completo *" placeholder="Bryan Salvador" value={formData.fullName} onChangeText={(text)=>setFormData({...formData, fullName:text})}/>

                <InputField label="Email *" placeholder="bryan.salvador@epn.edu.ec" value={formData.email} onChangeText={(text)=>setFormData({...formData, email:text})} keyboardType="email-address" autoCapitalize="none"/>

                <InputField label="Telefono" placeholder="+593 0999999999" value={formData.phone} onChangeText={(text)=>setFormData({...formData, phone:text})} keyboardType="phone-pad"/>

                <InputField label="Ubicación" placeholder="Solanda" value={formData.location} onChangeText={(text)=>setFormData({...formData, location:text})}/>

                <InputField label="Resumen Profesional" placeholder="Describe en pocas palabras tu perfil profesional" value={formData.summary} onChangeText={(text)=>setFormData({...formData, summary:text})}
                multiline numberOfLines={4} style={{ height:100,textAlignVertical:'top', borderWidth: 1,borderColor: "#ddd", borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: "#fff",}}/>

                <NavigationButton title="Guardar Información Personal" onPress={handleSave}/>

                <NavigationButton title="Cancelar" onPress={()=>{router.back();}} variant="secondary"/>
            </View>
        </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    contentContainer: {
    padding: 20,
  },
});