import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import {
  BarChart,
} from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/action/actionCreatorUser";
import { useEffect, useState } from "react";
import { fetchReturnedStat } from "../stores/action/actionCreatorAsignmen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Statistik() {
  const dispatch = useDispatch();

  const { returned,loadingAsignmen } = useSelector((state) => state.asignmens);
  const [score, setScore] = useState({})
  const [data,setData] = useState({
    labels: ['a','b','c'],
        datasets: [
        {
          data:[60,70,90],
        },
      ],
  })

  //  const data ={
  //   labels: ['a','b','c'],
  //       datasets: [
  //       {
  //         data:[60,70,90],
  //       },
  //     ],
  //  }
  
  function changeData(result){ 
      let newData={
        labels: result.title||['a','b','c'],
        datasets: [
        {
          data: result.score||[60,70,90],
        },
      ],
      }
      setData(newData)
  }
  function changeStat(result){
    let newData = {
      min: result.min||'-',
      max: result.max||'-',
      avg: result.avg||'-',
      notice: result.notice||'',
    }
    setScore(newData)
  }

  useEffect(() => {
     dispatch(fetchReturnedStat())
  }, []);
  

  useEffect(()=>{
    changeData(returned)
    changeStat(returned)
  },[returned])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1.5, backgroundColor: "#ffffff", marginTop: 10 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {" "}
            Scoring Graph of Your Assignment{" "}
          </Text>
        </View>
        {loadingAsignmen?<Text>Loading ... </Text>
          :
          <BarChart
          data={data}
          width={380}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#1B4965",
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "#16425b",
            backgroundGradientToOpacity: 0.5,
            color: (opacity) => "#f1e3d3",
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
          }}
          style={{
            borderRadius: 10,
            alignSelf: "center",
            marginVertical: 20,
            flex: 7,
            
          }}
        />
        
        }
        <Text></Text>
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        <View style={{ flex: 2, marginTop: 10, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#BEE9E8",
              marginHorizontal: 5,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  fontStyle: "italic",
                  marginTop:15,
                  color:'#033f63'
                }}
              >
                Min Score
              </Text>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 70, marginBottom:15,  color:'#033f63' }}>{score.min}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#5FA8D3",
              marginHorizontal: 5,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  fontStyle: "italic",
                  marginTop:15,
                  color:'#daddd8'
                }}
              >
                Max Score
              </Text>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 70,marginBottom:15,color:'#daddd8'  }}>{score.max}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#CAE9FF",
          marginTop: 10,
          marginHorizontal: 50,
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 20, fontStyle: "italic", marginTop:15,color:'#102542' }}
          >
            Average Score
          </Text>
        </View>
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 70, color:'#102542' }}>{score.avg}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{marginBottom:20, fontSize:15, fontWeight:'500',color:'#102542' }}>{score.notice}</Text>
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
