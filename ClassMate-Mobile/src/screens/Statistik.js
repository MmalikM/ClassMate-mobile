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
  const [data,setData] = useState({
    labels: ['a','b','c'],
        datasets: [
        {
          data:[60,70,90],
        },
      ],
  })
  let max = "50";
  let min = "50";
  let notice = "sudah lelah ";

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

  useEffect(() => {
     dispatch(fetchReturnedStat())
  }, []);
  

  useEffect(()=>{
    changeData(returned)
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
            backgroundGradientTo: "#0353a4",
            backgroundGradientToOpacity: 0.5,
            color: (opacity) => "#ffffff",
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
              <Text style={{ fontWeight: "bold", fontSize: 70 }}>{min}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#5FA8D3",
              marginHorizontal: 5,
              borderRadius: 20,
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
              <Text style={{ fontWeight: "bold", fontSize: 70 }}>{max}</Text>
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
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 20, fontStyle: "italic" }}
          >
            {" "}
            Average Score{" "}
          </Text>
        </View>
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 70 }}>70</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{notice}</Text>
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
