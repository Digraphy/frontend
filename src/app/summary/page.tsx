"use client";

import { MiniPoster } from "@/components/title-page-components";
import { useTitleContext } from "@/contexts";
import { CommonTitleDto, FactoidDto, PreviewTitleDto } from "@/dtos";
import { dummyFactoids, dummyPreviewTitles } from "@/util/dummyData";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-inline: 3rem;
`;

const HeaderBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;

	gap: 1rem;
	height: 10rem;
	align-items: center;

	img {
		height: inherit;
		width: auto;
		justify-self: center;
	}
`;

const Description = styled.div`
	color: #a6a6a6;
	font-size: 1.2rem;
	line-height: 1.5;
`;

const FilmName = styled.span`
	color: #ffffff;
	font-weight: bold;
`;

const FilmYear = styled.span`
	color: #ffffff;
	font-style: italic;
`;

const CardStyle = styled.div`
	background-color: rgb(255 255 255 / 0.1);
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
					<FilmName>{title.name}</FilmName>{" "}
					<FilmYear>({title.releasedAtUtc?.getFullYear() || "XXXX"})</FilmYear>
				</p>
			</CardFooter>
		</CardStyle>
	);
};

export default function Summary() {
	const {
		title: selectedFilm,
		setTitle,
		// getFactoids,
		getTitleById,
	} = useTitleContext();
	const [requiredFilm, setRequiredFilm] = useState<CommonTitleDto | null>(null);
	// const [factoids, setFactoids] = useState<Record<number, FactoidDto[]> | null>(
	// 	null,
	// );

	useEffect(() => {
		setTitle(1);
		// getFactoids(1).then(setFactoids);
		getTitleById(2).then(setRequiredFilm);
	}, [setTitle, getTitleById]);
	// }, [setTitle, getTitleById, getFactoids]);

	if (!requiredFilm) {
		return <div>Loading...</div>;
	}

	return (
		<PageContainer>
			<HeaderBox>
				<MiniPoster src={requiredFilm.smallPosterUrl} alt={requiredFilm.name} />
				<Description>
					What to know about <FilmName>{requiredFilm.name} </FilmName>
					<FilmYear>
						({requiredFilm.releasedAtUtc?.getFullYear() || "XXXX"})
					</FilmYear>{" "}
					for <FilmName>{selectedFilm.name} </FilmName>
					<FilmYear>
						({selectedFilm.releasedAtUtc?.getFullYear() || "XXXX"})
					</FilmYear>
				</Description>
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
