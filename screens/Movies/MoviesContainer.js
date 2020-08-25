import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { movieApi } from '../../api';
import MoviesPresenter from './MoviesPresenter';

export default () => {
	const [movies, setMovies] = useState({
		loading: true,
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
			loading: false,
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

	return <MoviesPresenter {...movies} />;
};
