import { useNavigation } from "@react-navigation/native";
import { Text, View ,StyleSheet, TouchableOpacity} from "react-native";


export default function CardAssignment({item}){
  const navigation=useNavigation()
  function goToDetail(id){
    navigation.navigate('Detail',{id})
  }

    return (

    <TouchableOpacity  onPress={()=> goToDetail(item?.Assignment._id) } >
        <View  style={styles.card} >
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.asignmenName}>{item?.Assignment?.name}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.asignmenClassId}>{item?.Assignment?.subject}</Text>  
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'blue'}}>({item?.status})</Text>
            </View>

        </View>  
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
       
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal:10, 
        width:170 , 
        height:120
      },
      asignmenName: {
        fontSize: 18,
        fontWeight: "bold",
        
      
      },
      asignmenClassId: {
    
        fontSize: 14,
        color: "#666",
      
      },

});