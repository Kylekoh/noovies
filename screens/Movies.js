import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { movieApi } from '../api';

export default () => {
	const [nowPlaying, setNowPlaying] = useState({
		movies: [],
		error: null,
	});
	const getData = async () => {
		const [nowPlaying, error] = await movieApi.nowPlaying();
		const [popluar, popularError] = await movieApi.popular();
		console.log(nowPlaying, error);
	};
	useEffect(() => {
		getData();
	});
	return (
		<View style={{ backgroundColor: 'black' }}>
			<Text>Movies</Text>
		</View>
	);
};
