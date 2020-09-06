import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Stack from './navigation/Stack';

const cacheImages = (images) =>
	images.map((image) => {
		if (typeof image === 'string') {
			return Image.prefetch(image);
		} else {
			return Asset.fromModule(image).downloadAsync();
		}
	});

const cacheFonts = (fonts) =>
	fonts.map((font) => [Font.loadAsync(font), Font.loadAsync(font)]);

export default function App() {
	const [isReady, setIsReady] = useState(false);
	const loadAssetes = (aynsc = () => {
		const images = cacheImages([
			'https://images.unsplash.com/photo-1497514440240-3b870f7341f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1181&q=80',
			require('./assets/splash.png'),
		]);
		const fonts = cacheFonts([Ionicons.font]);
		return Promise.all([...images, ...fonts]);
	});
	const onFinish = () => setIsReady(true);
	return isReady ? (
		<>
			<NavigationContainer>
				<Stack />
			</NavigationContainer>
			<StatusBar barStyle="light-content" />
		</>
	) : (
		<AppLoading
			startAsync={loadAssetes}
			onFinish={onFinish}
			onError={console.error}
		/>
	);
}
