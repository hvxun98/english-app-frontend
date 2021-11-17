import React, { useState } from 'react';
import { Input } from 'antd';
import './style.scss'
import RenderDescription from './renderItem/RenderDescription';
import { checkArrIncludesQuest } from "../../../../../utils/CheckData";

const FillInWord = ({ data, stt, handleActiveQuestion, handleUnActiveQuestion, listQuestionFillWord, setListQuestionFillWord }) => {

    const [answer, setAnwer] = useState()

    const handlGetAnswer = () => {
        console.log(answer);
        if (answer && answer.length > 0) {
            //active
            handleActiveQuestion(data.id)
            // get content quest
            if(checkArrIncludesQuest(listQuestionFillWord, data.id)){
                let newListQuest = listQuestionFillWord.filter((value) => {
                    return value.id !== data.id
                })
                setListQuestionFillWord([...newListQuest, {
                    id: data.id,
                    questionAnswer: answer
                }])
            }else{
                setListQuestionFillWord([...listQuestionFillWord, {
                    id: data.id,
                    questionAnswer: answer
                }])
            }    
        } else {
            handleUnActiveQuestion(data.id)
            let newListQuest = listQuestionFillWord.filter((value) => {
                return value.id !== data.id
            })
            setListQuestionFillWord(newListQuest)
        }
    }

    return (
        <div className="hvx-quetionItem itemFillWord" id={`quest${data?.id}`}>
            <p className="hvx-textTitleItem">
                <b>{stt}. {data.questionTitle}</b>
            </p>
            <div className="hvx-descriptionItem">
                <RenderDescription data={data.questionDescription} />
            </div>
            <div className="hvx-fieldAnswer mt-5">
                <span>Fill the correct answer: </span>
                <Input
                    onBlur={handlGetAnswer}
                    onChange={e => setAnwer(e.target.value)}
                    className="hvx-inputFillWord" />
            </div>

        </div>
    );
}

export default FillInWord;
