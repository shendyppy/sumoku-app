import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setInputBoard } from "../store/action";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";

function Board(props) {
  const row = props.row;
  const rowIndex = props.rowIndex;
  const initialBoard = props.initialBoard;
  const board = props.board;
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const handleOnChangeInput = (value, row, col) => {
    dispatch(
      setInputBoard({
        value,
        row,
        col,
      })
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {row.map((col, colIndex) => {
        if (initialBoard[rowIndex][colIndex] === 0) {
          return (
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              key={colIndex}
              value={
                board[rowIndex][colIndex] === 0
                  ? ""
                  : `${board[rowIndex][colIndex]}`
              }
              style={{
                width: 40,
                height: 50,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "white",
                textAlign: "center",

                color: "white",
                fontFamily: "PressStart2P_400Regular",
              }}
              onChangeText={(value) => {
                handleOnChangeInput(Number(value), rowIndex, colIndex);
              }}
            />
          );
        } else {
          return (
            <TextInput
              key={colIndex}
              style={{
                color: "black",
                height: 50,
                width: 40,
                borderStyle: "solid",
                borderWidth: 1,
                textAlign: "center",
                justifyContent: "center",
                fontFamily: "PressStart2P_400Regular",
                backgroundColor: "#FFDEDE",
                borderColor: "white",
              }}
              editable={false}
            >
              {col}
            </TextInput>
          );
        }
      })}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Board;
