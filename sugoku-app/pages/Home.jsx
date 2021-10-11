import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Picker,
	Alert,
	ImageBackground,
} from "react-native";
import AppLoading from "expo-app-loading";
import {
	useFonts,
	PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";

function Home({ navigation }) {
	const [name, setName] = useState("");
	const [difficulty, setDifficulty] = useState("");
	let [fontsLoaded] = useFonts({
		PressStart2P_400Regular,
	});

	const image = {
		uri: "https://asset.kompas.com/crops/VP-b18Z7mbTBLyT63uw5xgF0xTQ=/7x527:3105x2592/750x500/data/photo/2021/05/17/60a2154bab34b.jpg",
	};

	const handleOnChangeInput = (name) => {
		setName(name);
	};

	const handleSubmit = () => {
		if (!name) {
			Alert.alert("Please enter your name!");
		} else if (!difficulty) {
			Alert.alert("Select the difficulty first!");
		} else {
			navigation.navigate("InGame", {
				name,
				difficulty,
			});
			setName("");
			setDifficulty("");
		}
	};

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={image}
				resizeMode="cover"
				style={{ flex: 1, justifyContent: "center" }}
			>
				<StatusBar style="auto" />

				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							fontSize: 24,
							fontFamily: "PressStart2P_400Regular",
							textAlign: "center",
							marginBottom: 10,
						}}
					>
						Welcome to Sumoku App!
					</Text>
					<Text
						style={{
							fontSize: 14,
							fontFamily: "PressStart2P_400Regular",
							textAlign: "center",
						}}
					>
						Enter Your Name:
					</Text>
					<TextInput
						value={name}
						style={{
							padding: 7,
							width: 200,
							height: 50,
							borderWidth: 1,
							justifyContent: "space-around",
							alignItems: "center",
							marginTop: 10,
							fontSize: 16,
							borderRadius: 10,
							backgroundColor: "white",
						}}
						onChangeText={(name) => {
							handleOnChangeInput(name);
						}}
					/>
					<Text
						style={{
							marginTop: 20,
							fontSize: 14,
							fontFamily: "PressStart2P_400Regular",
							textAlign: "center",
						}}
					>
						Select Difficulty:
					</Text>
					<View
						style={{
							height: 50,
							width: 200,
							borderWidth: 1,
							borderRadius: 10,
							borderStyle: "solid",
							borderColor: "black",
							alignItems: "center",
							backgroundColor: "white",
						}}
					>
						<Picker
							style={{
								height: 50,
								width: 200,
								borderStyle: "solid",
								borderColor: "black",
							}}
							selectedValue={difficulty}
							onValueChange={(difficulty) => setDifficulty(difficulty)}
						>
							<Picker.Item label="Select" value="" />
							<Picker.Item label="Random" value="random" />
							<Picker.Item label="Easy" value="easy" />
							<Picker.Item label="Medium" value="medium" />
							<Picker.Item label="Hard" value="hard" />
						</Picker>
					</View>
					<TouchableOpacity
						onPress={handleSubmit}
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
								marginTop: "4%",
								fontSize: 14,
								color: "white",
								fontFamily: "PressStart2P_400Regular",
							}}
						>
							Get Start!
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

export default Home;
