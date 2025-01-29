"use client";

import {
	CommonTitleDto,
	DependencyOrderTitleDto,
	FactoidDto,
	Relation,
	Sequence,
	SequentialOrderTitleDto,
	TitleDto,
} from "@/dtos";
import {
	dummyCommonTitles,
	dummyFactoids,
	dummyRelations,
	dummySequences,
} from "@/util/dummyData";
import { createContext, useCallback, useContext, useState } from "react";

interface TitleContextType {
	title: CommonTitleDto;
	setTitle: (titleId: TitleDto["id"]) => void;
	getFactoids: (
		titleId?: TitleDto["id"],
	) => Promise<Record<number, FactoidDto[]>>;
	getRelations: (titleId?: TitleDto["id"]) => Promise<DependencyOrderTitleDto>;
	getSequences: (
		orderId?: number,
		titleId?: TitleDto["id"],
	) => Promise<SequentialOrderTitleDto>;
	getTitleById: (titleId: TitleDto["id"]) => Promise<CommonTitleDto>;
}

const placeholderTitle: CommonTitleDto = {
	id: -1,
	name: "",
	type: "movie",
};

export const TitleContext = createContext<TitleContextType>({
	title: placeholderTitle,
	setTitle: () => {},
	getFactoids: async () => ({}),
	getRelations: async () => ({
		...placeholderTitle,
		order: "relational",
		relations: [],
	}),
	getSequences: async () => ({
		...placeholderTitle,
		order: "sequential",
		orderId: -1,
		previous: undefined,
		next: undefined,
	}),
	getTitleById: async () => placeholderTitle,
});

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
	const [title, setTitle] = useState<CommonTitleDto>(placeholderTitle);

	const [relations, setRelations] = useState<Relation[] | null>(null);
	// An orderId of -1 is reserved for the release order
	const [sequences, setSequences] = useState<Record<number, Sequence>>({});
	const [factoids, setFactoids] = useState<Record<number, FactoidDto[]>>([]);

	const setTitleById = useCallback<TitleContextType["setTitle"]>(
		// biome-ignore lint/correctness/noUnusedVariables: TODO: implement
		async (titleId: TitleDto["id"]) => {
			// const response = await fetch(`/api/...`);
			// const title = (await response.json()) as CommonTitleDto;
			const title = dummyCommonTitles[5];
			setTitle(title);
		},
		[],
	);

	const getTitleById = useCallback<TitleContextType["getTitleById"]>(
		async (titleId: TitleDto["id"]) => {
			// const response = await fetch(`/api/...`);
			// const title = (await response.json()) as CommonTitleDto;

			const fetchedTitle = dummyCommonTitles[titleId];

			console.log(fetchedTitle);

			return fetchedTitle;
		},
		[],
	);

	const getRelations = useCallback<TitleContextType["getRelations"]>(
		async (titleId?: TitleDto["id"]) => {
			if (titleId && titleId !== title.id) {
				const fetchedRelations = dummyRelations[titleId];
				return { ...title, order: "relational", relations: fetchedRelations };
			}

			if (relations === null) {
				const fetchedRelations = dummyRelations[5];
				setRelations(fetchedRelations);
				setSequences({});
				return { ...title, order: "relational", relations: fetchedRelations };
			}

			return { ...title, order: "relational", relations: relations ?? [] };
		},
		[title, relations],
	);

	const getSequences = useCallback<TitleContextType["getSequences"]>(
		async (orderId = -1, titleId?: TitleDto["id"]) => {
			let fetchedSequences = sequences[orderId];
			if (titleId && titleId !== title.id) {
				fetchedSequences = dummySequences[titleId][orderId];
			} else if (!fetchedSequences) {
				if (!sequences[orderId]) {
					fetchedSequences = dummySequences[5][orderId];
					setSequences((prev) => ({ ...prev, [orderId]: fetchedSequences }));
				} else {
					fetchedSequences = sequences[orderId];
				}
			}
			return {
				...title,
				order: "sequential",
				orderId,
				previous: fetchedSequences?.previous,
				next: fetchedSequences?.next,
			};
		},
		[title, sequences],
	);

	const getFactoids = useCallback<TitleContextType["getFactoids"]>(
		async (titleId?: TitleDto["id"]) => {
			let fetchedFactoids = factoids;
			if (titleId && titleId !== title.id) {
				// const response = await fetch(`/api/...`);
				// const factoids = (await response.json()) as FactoidDto[];
				fetchedFactoids = { 4: [dummyFactoids[1], dummyFactoids[2]] };
			}

			if (!fetchedFactoids) {
				// const response = await fetch(`/api/...`);
				// const factoids = (await response.json()) as FactoidDto[];
				const fetchedFactoids = { 4: [dummyFactoids[1], dummyFactoids[2]] };
				setFactoids(fetchedFactoids);
			}

			return fetchedFactoids;
		},
		[title, factoids],
	);

	return (
		<TitleContext.Provider
			value={{
				title,
				setTitle: setTitleById,
				getFactoids,
				getRelations,
				getSequences,
				getTitleById,
			}}
		>
			{children}
		</TitleContext.Provider>
	);
};

export const useTitleContext = () => useContext(TitleContext);
