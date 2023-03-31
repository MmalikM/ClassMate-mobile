import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsignmens } from "../stores/action/actionCreatorAsignmen";

export default function Dashboard() {
  const { asignmens } = useSelector((state) => state.asignmens);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsignmens());
  }, []);
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
       <View style={{ flex: 5, backgroundColor:'pink'}}>
        <ScrollView>
          {
            asignmens?.map((asignmen,index)=>{
              return(
                <View key={index}>
                  <Text>{asignmen.name}</Text>
                  <Text>{asignmen.ClassId}</Text>
                </View>
              )
            })
          }
        </ScrollView>
       </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Detail Asignmen Screen</Text>
        <Button title="back" onPress={() => navigation.navigate("Home")} />
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
