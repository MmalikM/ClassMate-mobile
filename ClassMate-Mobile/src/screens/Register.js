import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown'
import { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import axios from "axios";
import { register } from "../stores/action/actionCreatorUser";

export default function Login() {
  const kelasList = [{id:1,name:'x'},{id:2,name:'xi'},{id:3,name:'xii'}]
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const fetchClass = async () =>{
    const {data} = await axios.get("http://localhost:3000/students/class")
    setListClass(data)
    console.log(listClass);
  }

  const [listClass,setListClass] = useState([])

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    fetchClass()
  },[])

  const submitRegister = async () =>{
    try {
      const input = {email,name,password,Class:kelas,address}
      console.log(input);
      const data = await dispatch(register(input))
      console.log(data.access_token);
      setEmail('')
      setName('')
      setAddress('')
      setKelas('')
      setPassword('')
      setListClass([])
      navigation.navigate('Dashboard')

    } catch (error) {
      throw error
    }
  }

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 8, backgroundColor: "pink" }}>
        <SafeAreaView>
        <TextInput
            name="name"
            style={styles.input}
            onChangeText={setName}
            placeholder="input name"
            value={name}
          />
          <TextInput
            keyboardType="email-address"
            name="email"
            style={styles.input}
            onChangeText={setEmail}
            placeholder="input email"
            value={email}
          />
          <TextInput
            name="password"
            style={styles.input}
            onChangeText={setPassword}
            placeholder="input password"
            keyboardType="numeric"
            value={password}
          />
          <TextInput
            name="address"
            style={styles.input}
            onChangeText={setAddress}
            placeholder="input address"
            value={address}
          />
        <View style={{alignItems: "center",justifyContent: "center"}}>
          <SelectDropdown 
            defaultButtonText="Choose Class"
            dropdownStyle={{borderColor:"red"}}
            data={listClass}
            onSelect={({name,_id}) => {
              setKelas(_id)
            }}
            buttonTextAfterSelection={({name}) => {
              return name
            }}
            rowTextForSelection={({name}) => {
              return name
            }}
          />
        </View>
          
        </SafeAreaView>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            paddingVertical: 14,
            margin: 20,
            borderRadius: 15,
          }}
          onPress={()=> submitRegister()}
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Register</Text>
        </TouchableOpacity>
      </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FCFFE7",
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
