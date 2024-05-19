import React, { useState } from 'react'
import { Text, StyleSheet, View , Image , TextInput , TouchableOpacity, Alert} from 'react-native';

import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(appFirebase)

export default function Login (props) {
  //Se crea la variabl esatdo
  const [email, setEmail] = useState()
  const [password, setPassword] =useState()

  const logueo = async()=> {
    try{
      await signInWithEmailAndPassword(auth, email, password)
      Alert.alert('Iniciando sesion', 'Accediendo...')
      props.navigation.navigate('ChatScreen')
    }
    catch (error){
      console.log(error);
      Alert.alert('Error', 'Usuario o contraseña incorrecto')
    }
  }
    return (
      <View style={styles.panel}>
        <View>
            <Image source={require('../assets/AstridBot.jpg')} style={styles.perfil}/> 
        </View>

        <View >
            <Text style={styles.subtitle}>AstridBot</Text>
        </View>

        <View style={styles.tarjeta}>
          <View style={styles.cajaTexto}>
            <TextInput placeholder='correo@gmail.com' style={{fontSize:17 , paddingHorizontal:15}}
            onChangeText={(text)=>setEmail(text)}/>
          </View>

          <View style={styles.cajaTexto}>
            <TextInput 
            placeholder='Password' 
            style={{fontSize:17 , paddingHorizontal:15}}
            onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>
          </View>

          <View style={styles.panelBoton}>
            <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
              <Text style={styles.textoBoton}>Iniciar sesión</Text>
            </TouchableOpacity>
            <Text style={styles.formLink}>Olvido su contraseña?</Text>
          </View>
        </View>




        <View >
            <Text style={styles.subtitle}>No estas registrado? Registrase</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'White'
  },
  perfil:{
    width:100,
    height:100,
    borderRadius:50,
    borderColor: '#FFF'
  },
  tarjeta:{
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius:4,
    elevation:5,
  },
  cajaTexto: {
    paddingVertical: 20,
    backgroundColor: '#cccccc40',
    borderRadius: 30,
    marginVertical: 10,
  },
  panelBoton: {
    alignItems: 'center',
  },
  cajaBoton:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  textoBoton:{
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  subtitle: {
    paddingVertical: 10,
    fontSize: 15,
    color: 'black',
  },
  formLink: {
    fontSize: 15,
    paddingVertical: 10,
    color: 'black',
    textAlign: 'center',
  },
})