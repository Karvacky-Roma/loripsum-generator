import React, {useState} from 'react';
//Styles
import './App.scss'
//Components
import {Loader} from './Components/Loader';
import {CopyToClipboard} from './Components/CopyToClipboard';
import {InputTNumber} from './Components/InputTNumber';
import {Button} from "./Components/Button";
import {Title} from "./Components/Title";
import {Paragraph} from "./Components/Paragraph";
import {Output} from "./Components/Output";
import {Form} from "./Components/Form";
//Effector
import {$textContent, $textContentJoined, getTextContentFx} from './effector'
import {useStore} from 'effector-react'

export const App = () => {

    const textContent = useStore($textContent)
    const isLoading = useStore(getTextContentFx.pending)
    const textContentJoined = useStore($textContentJoined)

    const [input, setInput] = useState("1")

    const handleSubmit = (evt) => {
        evt.preventDefault();
        getTextContentFx(input);
    }

    return (
        <div className={"app"}>

            <Title $alignment={"center"} $color={"var(--color-blue-darker)"}>Tired of boring lorem ipsum?</Title>

            <Form onSubmit={handleSubmit} $mtop={"31px"} $grid $gap={"12px"}>

                <InputTNumber labelText={"Paragraphs:"}
                              value={input}
                              onChange={e => setInput(e.target.value)}
                              min={1}
                              max={999}
                              $color={"var(--color-blue-darker)"}
                />

                <Button type={"submit"}
                        $color="#FFFFFF"
                        $bg={"var(--color-blue-medium)"}
                        $bgHover={"var(--color-blue-lightest)"}
                        $bgActive={"var(--color-blue-darker)"}
                >Generate</Button>
            </Form>

            <Output $p={"37px"} $mtop={"24px"} $h={"550px"} $gap={"32px"} $center>

                <CopyToClipboard data={textContentJoined}/>

                {
                    isLoading ?
                        <Loader $width={"5px"} $color={"var(--color-blue-light)"}/>
                        :
                        (
                            textContent.length > 0 ?
                                textContent.map((item, index) => {
                                    return <Paragraph key={index}
                                                      $center
                                                      $size={"20px"}
                                                      $color={"var(--color-blue-dark)"}>{item}</Paragraph>
                                })
                                :
                                <p className="empty">😎</p>
                        )
                }

            </Output>

        </div>
    )
}
