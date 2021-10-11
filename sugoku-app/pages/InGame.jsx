import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Alert,
	ImageBackground,
	ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchDataBoard,
	validate,
	solve,
	setLeaderboard,
} from "../store/action";
import Board from "../components/Board";
import CountDown from "react-native-countdown-component";
import AppLoading from "expo-app-loading";
import {
	useFonts,
	PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";

function InGame({ navigation }) {
	const { board, loading, initialBoard, status } = useSelector((state) => ({
		board: state.board,
		loading: state.loading,
		initialBoard: state.initialBoard,
		status: state.status,
	}));
	const route = useRoute();
	const dispatch = useDispatch();
	const { name, difficulty } = route.params;
	const [timer, setTimer] = useState();
	const [gratitude, setGratitude] = useState("");
	let [fontsLoaded] = useFonts({
		PressStart2P_400Regular,
	});

	useEffect(() => {
		if (difficulty === "hard") {
			setTimer(900);
		} else if (difficulty === "medium") {
			setTimer(1200);
		} else if (difficulty === "easy") {
			setTimer(1500);
		} else {
			setTimer(1200);
		}
	}, []);

	useEffect(() => {
		dispatch(fetchDataBoard(difficulty));
	}, []);

	const handleValidate = async () => {
		const result = await dispatch(validate({ board: board }));

		if (result === "solved") {
			Alert.alert(
				"Validate",
				`Are you sure you have done this right, ${name}?`,
				[
					{
						text: "YES",
						onPress: () => {
							dispatch(
								setLeaderboard({
									name: `${name} (${difficulty})`,
									difficulty,
									timer,
									status,
									gratitude,
								})
							);
							navigation.navigate("Finish", {
								name,
								difficulty,
								timer,
								status,
								gratitude,
							});
						},
					},
					{ text: "NO" },
				]
			);
		} else {
			Alert.alert(
				"Validate",
				`Are you sure you have done this right, ${name}?`,
				[
					{
						text: "YES",
						onPress: () => {
							Alert.alert(
								"Not There Yet",
								`Your game is not done yet, ${name}!`,
								""
							);
						},
					},
					{ text: "NO" },
				]
			);
		}
	};

	const onHandleResetBoard = () => {
		Alert.alert(
			"Reset Board",
			`Are you sure want to reset your board, ${name}?`,
			[
				{
					text: "YES",
					onPress: () => {
						dispatch(fetchDataBoard(difficulty));
					},
				},
				{ text: "NO" },
			]
		);
	};

	const onHandleSolveBoard = () => {
		Alert.alert("Solver", `Are you sure want to solve automaticly, ${name}?`, [
			{
				text: "YES",
				onPress: () => {
					dispatch(solve({ board: board }));
					setGratitude("ask for help");
				},
			},
			{ text: "NO" },
		]);
	};

	const giveUp = () => {
		Alert.alert(
			"Give up",
			`Are you sure want to give up and exit already, ${name}?`,
			[
				{
					text: "YES",
					onPress: () => {
						navigation.navigate("Home");
					},
				},
				{ text: "NO" },
			]
		);
	};

	if (loading) {
		return (
			<View>
				<ActivityIndicator
					size="large"
					color="#000000"
					style={{ marginTop: "50%" }}
				/>
				<Text
					style={{
						marginTop: "10%",
						fontFamily: "PressStart2P_400Regular",
						fontSize: 26,
						marginLeft: "22%",
						alignContent: "center",
						justifyContent: "center",
					}}
				>
					Loading...
				</Text>
			</View>
		);
	}

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	const image = {
		uri: "https://assets.kompasiana.com/items/album/2016/08/03/kampanye-malam-langit-gelap-57a209fddc93737a1c8d4db7.jpg?t=o&v=740&x=416",
	};

	return (
		<ScrollView style={styles.container}>
			<ImageBackground
				source={image}
				resizeMode="cover"
				style={{ flex: 1, justifyContent: "center" }}
			>
				<View style={{ flex: 1, alignItems: "center", marginTop: 60 }}>
					<Text
						style={{
							fontSize: 28,
							marginTop: 10,
							marginBottom: 10,
							color: "white",
							fontFamily: "PressStart2P_400Regular",
						}}
					>
						Sumoku App
					</Text>
					<View
						style={{
							alignItems: "center",
							flexDirection: "row",
							marginBottom: 10,
							justifyContent: "center",
						}}
					>
						<Text
							style={{
								marginRight: 15,
								fontSize: 12,
								color: "white",
								fontFamily: "PressStart2P_400Regular",
							}}
						>
							Good luck, {name}!
						</Text>
						<CountDown
							until={timer}
							onChange={(timer) => setTimer(timer)}
							onFinish={() =>
								Alert.alert(
									"Time is Out",
									"Sorry fellas, you can't resolve it within this time",
									[
										{
											onPress: () => {
												navigation.navigate("Home");
											},
										},
									]
								)
							}
							digitStyle={{
								backgroundColor: "#FFFF",
								borderWidth: 2,
								borderColor: "black",
							}}
							digitTxtStyle={{ color: "black" }}
							timeLabelStyle={{ color: "red", fontWeight: "bold" }}
							separatorStyle={{ color: "black" }}
							timeToShow={["M", "S"]}
							timeLabels={{ m: null, s: null }}
							size={20}
							showSeparator
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							marginBottom: 10,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{status === "solved" ? (
							<Text
								style={{
									marginRight: 90,
									fontFamily: "PressStart2P_400Regular",
									fontSize: 14,
									color: "green",
								}}
							>
								{status}
							</Text>
						) : (
							<Text
								style={{
									marginRight: 90,
									fontFamily: "PressStart2P_400Regular",
									fontSize: 14,
									color: "red",
								}}
							>
								{status}
							</Text>
						)}
						{difficulty ? (
							<Text
								style={{
									marginLeft: 90,
									fontFamily: "PressStart2P_400Regular",
									fontSize: 14,
									color: "white",
								}}
							>
								{difficulty}
							</Text>
						) : (
							<></>
						)}
					</View>
					<StatusBar style="auto" />
					{board.map((row, rowIndex) => {
						return (
							<Board
								row={row}
								key={rowIndex}
								board={board}
								initialBoard={initialBoard}
								rowIndex={rowIndex}
							/>
						);
					})}

					<View
						style={{
							width: 375,
							flexDirection: "row",
							marginTop: 30,
							marginLeft: 10,
							marginRight: 10,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								handleValidate(board);
							}}
							style={{
								width: 100,
								height: 30,
								borderWidth: 1,
								borderStyle: "solid",
								backgroundColor: "#BFA2DB",
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 10,
								marginRight: 10,
							}}
						>
							<Text
								style={{
									fontFamily: "PressStart2P_400Regular",
									fontSize: 10,
									marginTop: "4%",
								}}
							>
								Validate
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								onHandleSolveBoard(board);
							}}
							style={{
								width: 100,
								height: 30,
								borderWidth: 1,
								borderStyle: "solid",
								backgroundColor: "#BFA2DB",
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 10,
							}}
						>
							<Text
								style={{
									fontFamily: "PressStart2P_400Regular",
									fontSize: 10,
									marginTop: "4%",
								}}
							>
								Solve
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onHandleResetBoard}
							style={{
								width: 100,
								height: 30,
								borderWidth: 1,
								borderStyle: "solid",
								backgroundColor: "#BFA2DB",
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 10,
								marginLeft: 10,
							}}
						>
							<Text
								style={{
									fontFamily: "PressStart2P_400Regular",
									fontSize: 10,
									marginTop: "4%",
								}}
							>
								Reset Board
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						onPress={giveUp}
						style={{
							width: 150,
							height: 30,
							marginTop: "5%",
							borderWidth: 1,
							borderStyle: "solid",
							backgroundColor: "#BFA2DB",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 10,
							fontWeight: "bold",
							marginBottom: "18%",
						}}
					>
						<Text
							style={{
								fontFamily: "PressStart2P_400Regular",
								fontSize: 12,
								marginTop: "4%",
							}}
						>
							Go Back?
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default InGame;
