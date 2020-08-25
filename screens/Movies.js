import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { movieApi } from '../api';

export default () => {
	const [movies, setMovies] = useState({
		nowPlaying: [],
		nowPlayingError: null,
		popluar: [],
		popularError: null,
		upcoming: [],
		upcomingError: null,
	});

	const getData = async () => {
		const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
		const [popluar, popularError] = await movieApi.popular();
		const [upcoming, upcomingError] = await movieApi.upcoming();
		setMovies({
			nowPlaying,
			popluar,
			upcoming,
			nowPlayingError,
			popularError,
			upcomingError,
		});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: 'black' }}>
			<Text style={{ color: 'white' }}>{movies.nowPlaying?.length}</Text>
		</View>
	);
};
