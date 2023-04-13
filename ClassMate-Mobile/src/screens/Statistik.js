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
    let notice = "linggard, blajarnya perlu di tingkatkan"

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
     
      <View style={{ flex: 2, backgroundColor: "#ffffff", marginTop:10 }}>
        <View style={{ flex:1,justifyContent:'center', alignItems:'center'}}>
         <Text  > Score Grafik of your Assignment </Text>
        </View>
          <BarChart
            data={data}
            width={380}
            height={200}
            chartConfig = {{
              backgroundGradientFrom: "#55a630",
              backgroundGradientFromOpacity: 1,
              backgroundGradientTo: "yellow",
              backgroundGradientToOpacity: 0.5,
              color: opacity => '#3c096c',
              strokeWidth: 2, 
              barPercentage: 0.5,
              useShadowColorFromDataset: false 
            }}
            style={{borderRadius:10, alignSelf:'center', marginVertical:20, flex:7 }}
          />
      </View>
      <View style={{ flex: 1, backgroundColor: "red", marginTop:10, }}>
       <View style={{ flex: 1, marginTop:10,}}>
        <Text>jadi begindang</Text>
       </View>
       <View style={{ flex: 2, backgroundColor: "blue", marginTop:10,flexDirection:'row' }}>
          <View style={{ flex: 1, backgroundColor: "pink" }}>
            <View style={{flex:1}} > 
              <Text>minimun</Text>
             </View>
            <View style={{flex:4}} > 
               <Text>{min}</Text>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "orange" }}>
          <View style={{flex:1}} > 
              <Text>maximum</Text>
             </View>
            <View style={{flex:4}} > 
              <Text>{max}</Text>
            </View>
          </View>     
       </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "red", marginTop:10 }}>
          <View style={{flex:1}}  >
            <Text> Avg </Text>
          </View>
          <View style={{flex:3}} >
            <Text>{avg}</Text>
          </View>
          <View style={{flex:1}} >
            <Text>{notice}</Text>
          </View>

      </View>
     
      
     
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFFE7",
    flex: 1,
    padding: 20,
  },
});
