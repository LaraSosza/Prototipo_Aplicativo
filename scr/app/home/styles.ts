import { Input } from "@/components/input";
import { StyleSheet } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export const styles = StyleSheet.create({
     container:{
        flex: 1,
     },
     header:{
      width: "100%",
      height: 132,
      backgroundColor: "#4442F0",
      justifyContent: "flex-end",
      paddingHorizontal: 24,
      zIndex: 1,

     },
     input:{
      marginBottom: -27,
     },
     section: {
      fontSize:18,
      backgroundColor: "blue",
      width:34,
      height:34,
      color: "white",
      textAlign: "center",
      textAlignVertical: "center",
      borderRadius: 12,
      marginTop: 32,
     },
     contentList:{
      padding:24,
      gap: 12,
      paddingTop:64,
     },
     separator:{
      width:"100%",
      height: 1,
      backgroundColor: "gray_300",
      marginTop: 12,
     }


})