import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, Image, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const cacheImages = (images) =>
	images.map((image) => {
		if (typeof image === 'string') {
			return Image.prefetch(image);
		} else {
			return Asset.fromModule(image).downloadAsync();
		}
	});

const cacheFonts = (fonts = fonts.map((font) => Font.loadAsync(font)));

export default function App() {
	const [isReady, setIsReady] = useState(false);
	const loadAssetes = (aynsc = () => {
		const images = cacheImages([
			'https://images.unsplash.com/photo-1597549849205-602e7493cf9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
			require('./assets/splash.png'),
		]);
		const fonts = cacheFonts([Ionicons.font]);
		return Promise.all([...images, ...fonts]);
	});
	const onFinish = () => setIsReady(true);
	return isReady ? (
		<Text>Ready</Text>
	) : (
		<AppLoading
			startAsync={loadAssetes}
			onFinish={onFinish}
			onError={console.error}
		/>
	);
}
