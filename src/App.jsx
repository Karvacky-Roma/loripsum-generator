import React from 'react';
//Styles
import './App.scss'
//Components
import {HeadTitle} from "./Component/HeadTitle/HeadTitle";
import {Form} from './Component/Form/Form'
import {Output} from "./Component/Output/Output";
import {Paragraph} from "./Component/Paragraph/Paragraph";
import {Empty} from "./Component/Empty/Empty";
import {Loader} from "./Component/Loader/Loader";
import {CopyToClipboard} from './Component/CopyToClipboard/CopyToClipboard'
//Effector
import {$loripsum, fetchLoripsumDataFx} from './effector';
import {useStore} from 'effector-react'

export const App = () => {

	//subscribe to our store for communication with react
	const data = useStore($loripsum)
	const isLoading = useStore(fetchLoripsumDataFx.pending)

	return (
		<div className="app loripsum">
			<HeadTitle
				className={"loripsum__title"}
				titleText="Tired of boring lorem ipsum?"/>

			<Form/>

			<CopyToClipboard/>

			<Output className="loripsum__output">

				{
					isLoading ?
						<Loader className="loripsum__loader"/>
						:
						(
							data.length > 0 ?
								data.map((item, index) => {
									return <Paragraph key={index}
													  className="loripsum__paragraph"
													  paragraphContent={item}/>
								})
								:
								<Empty emptyContent="😎"/>
						)
				}

			</Output>
		</div>
	)
}