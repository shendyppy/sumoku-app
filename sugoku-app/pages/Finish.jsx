import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import fancyTimeFormat from "../helpers/fancyTime";
import Leaderboard from "react-native-leaderboard";
import { useSelector } from "react-redux";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";

function Finish({ navigation }) {
  const { leaderboard } = useSelector((state) => ({
    leaderboard: state.leaderboard,
  }));
  const route = useRoute();
  const { name, difficulty, status, timer, gratitude } = route.params;
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const handleToHome = () => {
    navigation.navigate("Home");
  };

  const image = {
    uri: "https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/2018/08/28/633244414.jpg",
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const newFormat = fancyTimeFormat(timer);

  const state = {
    data: leaderboard,
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <StatusBar style="auto" />

          <Text
            style={{
              fontFamily: "PressStart2P_400Regular",
              fontSize: 20,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Congratulations, {name}!
          </Text>
          <Text
            style={{
              fontFamily: "PressStart2P_400Regular",
              fontSize: 14,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            You've done it in {difficulty} difficulty
          </Text>
          <Text
            style={{
              fontFamily: "PressStart2P_400Regular",
              fontSize: 14,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            You've done it with{" "}
            <Text
              style={{
                fontFamily: "PressStart2P_400Regular",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
                color: "green",
              }}
            >
              {status}
            </Text>{" "}
            status
          </Text>
          {gratitude === "ask for help" ? (
            <Text
              style={{
                fontFamily: "PressStart2P_400Regular",
                fontSize: 16,
                marginBottom: 10,
                textAlign: "center",
                color: "red",
              }}
            >
              But actually you {gratitude}!
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "PressStart2P_400Regular",
                fontSize: 16,
                marginBottom: 10,
                textAlign: "center",
                color: "green",
              }}
            >
              With {newFormat} left you've done this, good job!
            </Text>
          )}
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20,
            maxHeight: 500,
          }}
        >
          <Text
            style={{
              fontFamily: "PressStart2P_400Regular",
              fontSize: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            Leaderboard
          </Text>

          <Leaderboard
            style={{ marginTop: 50, marginBottom: 50 }}
            data={state.data}
            sortBy="timer"
            labelBy="name"
          />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={handleToHome}
            style={{
              width: 200,
              height: 50,
              marginTop: "5%",
              borderWidth: 1,
              borderStyle: "solid",
              backgroundColor: "#BFA2DB",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              fontWeight: "bold",
            }}
          >
            <Text
              style={{
                fontFamily: "PressStart2P_400Regular",
                fontSize: 16,
                marginTop: "4%",
              }}
            >
              Play Again?
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Finish;
