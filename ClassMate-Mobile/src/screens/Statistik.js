import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/action/actionCreatorUser";
import { useEffect } from "react";
import { fetchAsignmens } from "../stores/action/actionCreatorAsignmen";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Statistik() {
    const dispatch = useDispatch()
    const { asignmens } = useSelector((state) => state.asignmens);
    let max=99
    let min =60
    let avg=70
    let notice = "linggard, belajarnya perlu di tingkatkan"

    useEffect(() => {
        dispatch(fetchAsignmens()).catch((error) => console.log(error));
        //logic
        
      }, []);


  const data = {
    labels: ["tugas1", "tugas2", "tugas3", "tugas4", "tugas5", "tugas6","tugas7"],
    datasets: [
      {
        data: [60, 70, 90, 80, 99, 75,80],
      },
    ],
  };

console.log(asignmens);

  return (
    <View style={styles.container}>
     
      <View style={{ flex: 1.5, backgroundColor: "#ffffff", marginTop:10 }}>
        <View style={{ flex:1,justifyContent:'center', alignItems:'center'}}>
         <Text style={{fontWeight:'bold', fontSize:20}} > Scoring Graph of Your Assignment </Text>
        </View>
          <BarChart
            data={data}
            width={380}
            height={200}
            chartConfig = {{
              backgroundGradientFrom: "#1B4965",
              backgroundGradientFromOpacity: 1,
              backgroundGradientTo: "62B6CB",
              backgroundGradientToOpacity: 0.5,
              color: opacity => '#ffffff',
              strokeWidth: 2, 
              barPercentage: 0.5,
              useShadowColorFromDataset: false 
            }}
            style={{borderRadius:10, alignSelf:'center', marginVertical:20, flex:7 }}
          />
          <Text></Text>
      </View>
      <View style={{ flex: 1, marginTop:10, }}>
      
       <View style={{ flex: 2, marginTop:10,flexDirection:'row' }}>
          <View style={{ flex: 1, backgroundColor: "#BEE9E8", marginHorizontal:5,borderRadius:20 }}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}} > 
              <Text style={{fontWeight:'bold', fontSize:20,fontStyle:'italic' }} >Min Score</Text>
             </View>
            <View style={{flex:3,justifyContent:'center', alignItems:'center'}} > 
               <Text style={{fontWeight:'bold', fontSize:70 }}>{min}</Text>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#5FA8D3" ,marginHorizontal:5,borderRadius:20}}>
          <View style={{flex:1,justifyContent:'center', alignItems:'center'}} > 
              <Text style={{fontWeight:'bold', fontSize:20,fontStyle:'italic' }}>Max Score</Text>
             </View>
            <View style={{flex:3,justifyContent:'center', alignItems:'center'}} > 
              <Text style={{fontWeight:'bold', fontSize:70 }}>{max}</Text>
            </View>
          </View>     
       </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "#CAE9FF", marginTop:10, marginHorizontal:50, borderRadius:30 }}>
          <View style={{flex:1,justifyContent:'center', alignItems:'center'}}  >
            <Text style={{fontWeight:'bold', fontSize:20,fontStyle:'italic' }}  > Average Score </Text>
          </View>
          <View style={{flex:3,justifyContent:'center', alignItems:'center'}} >
            <Text style={{fontWeight:'bold', fontSize:70 }}>{avg}</Text>
          </View>
          <View style={{flex:1,justifyContent:'center', alignItems:'center'}} >
            <Text >{notice}</Text>
          </View>

      </View>
        
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 20,
  },
});
