import React from 'react';
import { View, Text, Button } from 'react-native';

export default ({ navigation }) => {
	return (
		<View style={{ backgroundColor: 'black' }}>
			<Text>Movies</Text>
			<Button title="Moive" onPress={() => navigation.navigate('Detail')} />
		</View>
	);
};
