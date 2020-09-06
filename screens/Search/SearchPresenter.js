import React from 'react';
import styled from 'styled-components/native';
import Input from '../../components/Input';
import HorizontalSlider from '../../components/HorizontalSlider';
import Horizontal from '../../components/Horizontal';

const Container = styled.ScrollView`
	background-color: black;
`;

const Text = styled.Text``;

export default ({ movies, shows, keyword, onSubmit, onChange }) => (
	<Container>
		<Input
			placeholder="Write a keyword"
			value={keyword}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
		<HorizontalSlider title={'Movie results'}>
			{movies.map((movie) => (
				<Horizontal />
			))}
		</HorizontalSlider>
		<HorizontalSlider title={'TV results'}>
			{shows.map((show) => (
				<Horizontal />
			))}
		</HorizontalSlider>
	</Container>
);
