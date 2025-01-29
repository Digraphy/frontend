import {
	CommonTitleDto,
	FactoidDto,
	PreviewTitleDto,
	Relation,
	Sequence,
} from "@/dtos";

export const dummyPreviewTitles: { [id: number]: PreviewTitleDto } = {
	0: {
		id: 0,
		name: "Iron Man",
		type: "movie",
		smallPosterUrl:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
		releasedAtUtc: new Date("2008-04-30"),
	},
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
		name: "The Avengers",
		type: "movie",
		smallPosterUrl:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
		releasedAtUtc: new Date("2012-04-25"),
	},
	6: {
		id: 6,
		name: "Iron Man 3",
		type: "movie",
		smallPosterUrl:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg",
		releasedAtUtc: new Date("2013-04-18"),
	},
};

export const dummyCommonTitles: { [id: number]: CommonTitleDto } = {
	2: {
		...dummyPreviewTitles[2],
		largePosterUrl:
			"https://www.themoviedb.org/t/p/original/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg",
		description:
			"With the world now aware of his dual life as the armored superhero Iron Man, billionaire inventor Tony Stark faces pressure from the government, the press and the public to share his technology with the military. Unwilling to let go of his invention, Stark, with Pepper Potts and James 'Rhodey' Rhodes at his side, must forge new alliances – and confront powerful enemies.",
		tmdbId: 10138,
	},

	5: {
		...dummyPreviewTitles[5],
		largePosterUrl:
			"https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
		description:
			"When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
		tmdbId: 24428,
	},
};

export const dummyRelations: { [id: number]: Relation[] } = {
	5: [
		{
			title: dummyPreviewTitles[1],
			relevance: "could",
		},
		{
			title: dummyPreviewTitles[2],
			relevance: "should",
		},
		{
			title: dummyPreviewTitles[3],
			relevance: "should",
		},
		{
			title: dummyPreviewTitles[4],
			relevance: "should",
		},
	],
};

export const dummySequences: { [id: number]: Record<number, Sequence> } = {
	5: {
		[-1]: {
			previous: dummyPreviewTitles[4],
			next: dummyPreviewTitles[6],
		},
	},
};

export const dummyFactoids: { [id: number]: FactoidDto } = {
	1: {
		id: 1,
		description: "Factoid 1",
		topics: [],
	},
	2: {
		id: 2,
		description: "Factoid 2",
		topics: [],
	},
	3: {
		id: 3,
		description: "Factoid 3",
		topics: [],
	},
	4: {
		id: 4,
		description: "Factoid 4",
		topics: [],
	},
	5: {
		id: 5,
		description: "Factoid 5",
		topics: [],
	},
};
