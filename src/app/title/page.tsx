"use client";

import styled, { css } from "styled-components";

import { Button } from "@/components/atomic";
import { useTitleContext } from "@/contexts";
import {
	DependencyOrderTitleDto,
	PreviewTitleDto,
	RelationRelevance,
	SequentialOrderTitleDto,
} from "@/dtos/title";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const PageContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-inline: 3rem;
`;

const TitleNameBlock = styled.div`
	align-items: baseline;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	justify-content: center;

	h1 {
		font-size: 3rem;
		font-weight: bold;
	}

	h2 {
		color: rgba(255, 255, 255, 0.6);
		font-size: 1.5rem;
		font-weight: normal;
	}
`;

const DetailsBlock = styled.div`
	display: grid;
	gap: 2rem;
	grid-template-columns: 2fr 5fr;
	max-width: 75rem;
`;

const DependencyOrderBlock = styled.div`
	display: grid;
	gap: 2rem;
	grid-template-columns: 2fr 5fr;
	height: 30rem;
	max-width: 75rem;
	width: 100%;
`;

const DependencyPosterContainer = styled.div`
	align-items: center;
	contain: size;
	display: flex;
	flex-direction: column;
	justify-content: center;

	img {
		max-height: 100%;
		object-fit: contain;
	}
`;

const DependencyTabs = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	height: inherit;
	justify-content: space-between;
	align-items: stretch;
`;

const DependencyTabStyle = styled.div`
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 1rem;
	display: flex;
	flex-direction: row;
	flex: 1;
	gap: 1rem;
	height: 100%;
	overflow: hidden;
	padding: 1rem;
	position: relative;

	p {
		bottom: 1rem;
		color: rgba(255, 255, 255, 0.6);
		font-size: 5rem;
		font-weight: bold;
		position: absolute;
		right: 2rem;
	}
`;

const DependencyTabPosterContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const SequentialOrderBlock = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	gap: 8rem;
	height: 30rem;
	max-width: 150rem;
`;

const SequentialItem = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: 100%;
	justify-content: center;

	img {
		max-height: 100%;
		object-fit: contain;
	}

	h2 {
		font-size: 2rem;
		font-weight: bold;
		opacity: 0.8;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: normal;
		opacity: 0.6;
	}
`;

const SequentialAdjacent = styled(SequentialItem)<{ $alignRight?: boolean }>`
	${({ $alignRight }) =>
		$alignRight ?
			css`
				margin-left: auto;
			`
		:	css`
				margin-right: auto;
			`};

	img {
		max-height: 50%;
	}
`;

const ButtonsList = styled.div`
	align-items: flex-end;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Description = styled.div`
	color: #a6a6a6;
	font-size: 1.2rem;
	line-height: 1.5;
`;

const Poster = styled.img`
	border-radius: 1rem;
`;

const LeadPoster = styled(Poster)`
	margin-left: auto;
	max-width: 100%;
`;

const MiniPoster = styled(Poster)`
	border-radius: 0.5rem;
	height: 100%;
	object-fit: contain;
	width: 100%;
`;

interface DependencyOrderProps {
	title: DependencyOrderTitleDto;
}

function Buttons() {
	return (
		<ButtonsList>
			<Button onClick={() => {}}>Where to watch</Button>
			<Button onClick={() => {}} icon={<FontAwesomeIcon icon={faEye} />}>
				Mark as watched
			</Button>
			<Button onClick={() => {}}>Something else idk</Button>
		</ButtonsList>
	);
}

interface DependencyTabProps {
	titles: PreviewTitleDto[];
	relevance: RelationRelevance;
}

function DependencyTab({ titles, relevance }: DependencyTabProps) {
	return (
		<DependencyTabStyle>
			{titles.map((title) => (
				<DependencyTabPosterContainer key={title.id}>
					<MiniPoster src={title.smallPosterUrl} alt={title.name} />
				</DependencyTabPosterContainer>
			))}
			{titles.length === 0 && <DependencyTabPosterContainer />}
			{/* ^^ Spacer in case the list is empty */}
			<p>{relevance}</p>
		</DependencyTabStyle>
	);
}

const DependencyOrder: React.FC<DependencyOrderProps> = ({ title }) => {
	const relationsMap: Record<RelationRelevance, PreviewTitleDto[]> = {
		must: [],
		should: [],
		could: [],
	};

	const relations = title.relations || [];
	relations.sort((a, b) => {
		if (a.title.releasedAtUtc && b.title.releasedAtUtc) {
			return a.title.releasedAtUtc.getTime() - b.title.releasedAtUtc.getTime();
		}
		if (a.title.releasedAtUtc) {
			return -1;
		}
		if (b.title.releasedAtUtc) {
			return 1;
		}
		return 0;
	});

	for (const relation of relations) {
		relationsMap[relation.relevance].push(relation.title);
	}

	return (
		<DependencyOrderBlock>
			<DependencyPosterContainer>
				<LeadPoster src={title.largePosterUrl} alt={title.name} />
			</DependencyPosterContainer>
			<DependencyTabs>
				<DependencyTab titles={relationsMap.must} relevance="must" />
				<DependencyTab titles={relationsMap.should} relevance="should" />
				<DependencyTab titles={relationsMap.could} relevance="could" />
			</DependencyTabs>
		</DependencyOrderBlock>
	);
};

interface SequentialOrderProps {
	title: SequentialOrderTitleDto;
}

const SequentialOrder: React.FC<SequentialOrderProps> = ({ title }) => {
	const { previous, next } = title;

	return (
		<SequentialOrderBlock>
			<SequentialAdjacent $alignRight={true}>
				{previous && (
					<>
						<h2>previous</h2>
						<Poster src={previous.smallPosterUrl} alt={previous.name} />
						<h3>{previous.releasedAtUtc?.getFullYear()}</h3>
					</>
				)}
			</SequentialAdjacent>
			<SequentialItem>
				<LeadPoster src={title.largePosterUrl} alt={title.name} />
			</SequentialItem>
			<SequentialAdjacent $alignRight={false}>
				{next && (
					<>
						<h2>next</h2>
						<Poster src={next.smallPosterUrl} alt={next.name} />
						<h3>{next.releasedAtUtc?.getFullYear()}</h3>
					</>
				)}
			</SequentialAdjacent>
		</SequentialOrderBlock>
	);
};

export default function Title() {
	const [orderType, setOrderType] = useState<"sequential" | "relational">(
		"relational",
	);

	const cycleOrderType = () => {
		setOrderType(orderType === "sequential" ? "relational" : "sequential");
	};

	const { title, setTitle, getRelations, getSequences } = useTitleContext();
	const [sequentialTitle, setSequentialTitle] =
		useState<SequentialOrderTitleDto | null>(null);
	const [relationalTitle, setRelationalTitle] =
		useState<DependencyOrderTitleDto | null>(null);

	useEffect(() => {
		setTitle(1);
	}, [setTitle]);

	useEffect(() => {
		if (orderType === "sequential") {
			getSequences().then(setSequentialTitle);
			// pass an orderId into getSequences for a specific order, otherwise it defaults to -1 (release order)
		} else if (orderType === "relational") {
			getRelations().then(setRelationalTitle);
		}
	}, [orderType, getSequences, getRelations]);

	return (
		<PageContainer>
			<TitleNameBlock>
				<h1>{title.name}</h1>
				<h2>{title.releasedAtUtc?.getFullYear()}</h2>
				<Button onClick={() => cycleOrderType()}>🔄️</Button>
				{/* temporary ^^ */}
			</TitleNameBlock>
			{orderType === "sequential" ?
				sequentialTitle ?
					<SequentialOrder title={sequentialTitle} />
				:	null
			: relationalTitle ?
				<DependencyOrder title={relationalTitle} />
			:	null}

			<DetailsBlock>
				<Buttons />
				<Description>{title.description}</Description>
			</DetailsBlock>
		</PageContainer>
	);
}
