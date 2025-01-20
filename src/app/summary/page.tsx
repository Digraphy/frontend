"use client";

import { MiniPoster } from "@/components/title-page-components";
import { FactoidDto, PreviewTitleDto } from "@/dtos";
import { dummyFactoids, dummyPreviewTitles } from "@/util/dummyData";
import styled from "styled-components";

const PageContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-inline: 3rem;
`;

const HeaderBox = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	height: 10rem;
`;

const CardStyle = styled.div`
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-width: 100%;
	padding: 1rem;
`;

const CardFooter = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	max-height: 5rem;
	max-width: 100%;

	img {
		height: inherit;
		width: 1rem;
	}
`;

const CardContainer = styled.div`
	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(3, 1fr);
`;

const FactoidContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

interface CardProps {
	title: PreviewTitleDto;
	factoids: FactoidDto[];
}

const Card: React.FC<CardProps> = ({ title, factoids }) => {
	return (
		<CardStyle>
			<FactoidContainer>
				{factoids.map((factoid) => (
					<p key={factoid.id}>{factoid.description}</p>
				))}
			</FactoidContainer>
			<CardFooter>
				<MiniPoster src={title.smallPosterUrl} alt={"Poster"} />
				<p>
					{title.name} ({title.releasedAtUtc?.getFullYear() || "XXXX"})
				</p>
			</CardFooter>
		</CardStyle>
	);
};

export default function Summary() {
	const requiredFilm = dummyPreviewTitles[1];
	const selectedFilm = dummyPreviewTitles[2];

	return (
		<PageContainer>
			<HeaderBox>
				<MiniPoster src={requiredFilm.smallPosterUrl} alt={requiredFilm.name} />
				<p>
					What to know about {requiredFilm.name} (
					{requiredFilm.releasedAtUtc?.getFullYear() || "XXXX"}) for{" "}
					{selectedFilm.name} (
					{selectedFilm.releasedAtUtc?.getFullYear() || "XXXX"})
				</p>
				<MiniPoster src={selectedFilm.smallPosterUrl} alt={selectedFilm.name} />
			</HeaderBox>
			<CardContainer>
				<Card
					title={dummyPreviewTitles[1]}
					factoids={[dummyFactoids[1], dummyFactoids[2]]}
				/>
				<Card
					title={dummyPreviewTitles[2]}
					factoids={[dummyFactoids[1], dummyFactoids[3]]}
				/>
				<Card title={dummyPreviewTitles[3]} factoids={[dummyFactoids[1]]} />
			</CardContainer>
		</PageContainer>
	);
}
