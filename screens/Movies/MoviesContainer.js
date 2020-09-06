import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { movieApi } from '../../api';
import MoviesPresenter from './MoviesPresenter';

export default () => {
	const [refreshing, setRefreshing] = useState(false);
	const [movies, setMovies] = useState({
		loading: true,
		nowPlaying: [],
		nowPlayingError: null,
		popular: [],
		popularError: null,
		upcoming: [],
		upcomingError: null,
	});

	const getData = async () => {
		const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
		const [popular, popularError] = await movieApi.popular();
		const [upcoming, upcomingError] = await movieApi.upcoming();
		setMovies({
			loading: false,
			nowPlaying,
			popular,
			upcoming,
			nowPlayingError,
			popularError,
			upcomingError,
		});
	};
	useEffect(() => {
		getData();
	}, []);

	return <MoviesPresenter refreshFn={getData} {...movies} />;
};
