"use client";

import {
	CommonTitleDto,
	DependencyOrderTitleDto,
	PreviewTitleDto,
	Relation,
	RelationRelevance,
	Sequence,
	SequentialOrderTitleDto,
	TitleDto,
} from "@/dtos";
import { createContext, useCallback, useContext, useState } from "react";

const dummyTitle: CommonTitleDto = {
	id: 0,
	name: "The Avengers",
	type: "movie",
	smallPosterUrl:
		"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
	releasedAtUtc: new Date("2012-04-25"),
	largePosterUrl:
		"https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
	description:
		"When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
	tmdbId: 24428,
};

const dummyFilms: { [id: number]: PreviewTitleDto } = {
	1: {
		id: 1,
		name: "The Incredible Hulk",
		type: "movie",
		smallPosterUrl:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
		releasedAtUtc: new Date("2008-06-12"),
	},
	2: {
		id: 2,
		name: "Iron Man 2",
		type: "movie",
		smallPosterUrl:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg",
		releasedAtUtc: new Date("2010-05-07"),
	},
	3: {
		id: 3,
		name: "Thor",
		type: "movie",
		smallPosterUrl:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg",
		releasedAtUtc: new Date("2011-05-06"),
	},
	4: {
		id: 4,
		name: "Captain America: The First Avenger",
		type: "movie",
		smallPosterUrl:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
		releasedAtUtc: new Date("2011-07-22"),
	},
	5: {
		id: 5,
		name: "Iron Man 3",
		type: "movie",
		smallPosterUrl:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg",
		releasedAtUtc: new Date("2013-04-18"),
	},
};

const dummyRelations: {
	title: PreviewTitleDto;
	relevance: RelationRelevance;
}[] = [
	{
		title: dummyFilms[1],
		relevance: "could",
	},
	{
		title: dummyFilms[2],
		relevance: "should",
	},
	{
		title: dummyFilms[3],
		relevance: "should",
	},
	{
		title: dummyFilms[4],
		relevance: "should",
	},
];

const dummySequences: {
	[orderId: number]: Sequence;
} = {
	[-1]: {
		previous: dummyFilms[4],
		next: dummyFilms[5],
	},
};

interface TitleContextType {
	title: CommonTitleDto;
	setTitle: (titleId: TitleDto["id"]) => void;
	getRelations: () => Promise<DependencyOrderTitleDto>;
	getSequences: (orderId: number) => Promise<SequentialOrderTitleDto>;
}

export const TitleContext = createContext<TitleContextType>({
	title: {
		id: -1,
		name: "",
		type: "movie",
	},
	setTitle: () => {},
	getRelations: async () => ({
		id: -1,
		name: "",
		type: "movie",
		order: "relational",
		relations: [],
	}),
	getSequences: async () => ({
		id: -1,
		name: "",
		type: "movie",
		order: "sequential",
		orderId: -1,
		previous: undefined,
		next: undefined,
	}),
});

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
	const [title, setTitle] = useState<CommonTitleDto>({
		id: -1,
		name: "",
		type: "movie",
	});

	const [relations, setRelations] = useState<Relation[] | null>(null);

	// An orderId of -1 is reserved for the release order
	const [sequences, setSequences] = useState<Record<number, Sequence>>({});

	const setTitleById = useCallback<TitleContextType["setTitle"]>(
		// biome-ignore lint/correctness/noUnusedVariables: TODO: implement
		async (titleId: TitleDto["id"]) => {
			// const response = await fetch(`/api/title/${titleId}`);
			// const title = (await response.json()) as CommonTitleDto;
			const title = dummyTitle;
			setTitle(title);
		},
		[],
	);

	const getRelations = useCallback<
		TitleContextType["getRelations"]
	>(async () => {
		if (relations === null) {
			// const response = await fetch(`/api/relations/${title.id}`);
			// const fetchedRelations = (await response.json()) as {
			// 	title: PreviewTitleDto;
			// 	relevance: RelationRelevance;
			// }[];
			const fetchedRelations = dummyRelations; // placeholder
			setRelations(fetchedRelations);
		}
		return {
			...title,
			order: "relational",
			relations: relations ?? [],
		};
	}, [title, relations]);

	const getSequences = useCallback<TitleContextType["getSequences"]>(
		async (orderId: number) => {
			if (!sequences[orderId]) {
				// const response = await fetch(`/api/sequences/${title.id}?orderId=${orderId}`);
				// const fetchedSequences = (await response.json()) as {
				// 	previous?: PreviewTitleDto;
				// 	next?: PreviewTitleDto;
				// };
				const fetchedSequences = dummySequences[-1]; // placeholder
				setSequences((prevSequences) => ({
					...prevSequences,
					[orderId]: fetchedSequences,
				}));
			}
			return {
				...title,
				order: "sequential",
				orderId,
				previous: sequences[orderId]?.previous,
				next: sequences[orderId]?.next,
			};
		},
		[title, sequences],
	);

	return (
		<TitleContext.Provider
			value={{
				title,
				setTitle: setTitleById,
				getRelations,
				getSequences,
			}}
		>
			{children}
		</TitleContext.Provider>
	);
};

export const useTitleContext = () => useContext(TitleContext);
