import React, { useState } from 'react';
import { View, Text, Dimensions, PanResponder, Animated } from 'react-native';
import styled from 'styled-components/native';
import { apiImage } from '../../api';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const Container = styled.View`
	flex: 1;
	background-color: black;
	align-items: center;
`;

const Poster = styled.Image`
	overflow: hidden;
	border-radius: 20px;
	width: 100%;
	height: 100%;
`;

const styles = {
	top: 80,
	height: HEIGHT / 1.5,
	width: '90%',
	position: 'absolute',
};

export default ({ results }) => {
	const [topIndex, setTopIndex] = useState(0);
	const nextCard = () => setTopIndex((currentValue) => currentValue + 1);
	const position = new Animated.ValueXY();
	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (evt, { dx, dy }) => {
			position.setValue({ x: dx, y: dy });
		},
		onPanResponderRelease: (evt, { dx, dy }) => {
			if (dx >= 300) {
				// discard to the right
				Animated.spring(position, {
					toValue: {
						x: WIDTH,
						y: dy + 100,
					},
				}).start(nextCard);
			} else if (dx <= -250) {
				// discard to the left
				Animated.spring(position, {
					toValue: {
						x: -WIDTH - 100,
						y: dy,
					},
				}).start(nextCard);
			} else {
				Animated.spring(position, {
					toValue: {
						x: 0,
						y: 0,
					},
				}).start();
			}
		},
	});

	const rotationValues = position.x.interpolate({
		inputRange: [-255, 0, 255],
		outputRange: ['-8deg', '0deg', '8deg'],
		extrapolate: 'clamp',
	});

	const secondCartOpacity = position.x.interpolate({
		inputRange: [-255, 0, 255],
		outputRange: [1, 0.8, 1],
		extrapolate: 'clamp',
	});

	const secondCardScale = position.x.interpolate({
		inputRange: [-255, 0, 255],
		outputRange: [1, 0.8, 1],
		extrapolate: 'clamp',
	});

	return (
		<Container>
			{results.map((result, index) => {
				if (index < topIndex) {
					return null;
				} else if (index === topIndex) {
					return (
						<Animated.View
							style={{
								...styles,
								zIndex: 1,
								transform: [
									{ rotate: rotationValues },
									...position.getTranslateTransform(),
								],
							}}
							key={result.id}
							{...panResponder.panHandlers}
						>
							<Poster source={{ uri: apiImage(result.poster_path) }} />
						</Animated.View>
					);
				} else if (index === topIndex + 1) {
					return (
						<Animated.View
							style={{
								...styles,
								zIndex: -index,
								opacity: secondCartOpacity,
								transform: [{ scale: secondCardScale }],
							}}
							key={result.id}
							{...panResponder.panHandlers}
						>
							<Poster source={{ uri: apiImage(result.poster_path) }} />
						</Animated.View>
					);
				} else {
					return (
						<Animated.View
							style={{
								...styles,
								zIndex: -index,
								opacity: 0,
							}}
							key={result.id}
							{...panResponder.panHandlers}
						>
							<Poster source={{ uri: apiImage(result.poster_path) }} />
						</Animated.View>
					);
				}
			})}
		</Container>
	);
};
