import React from 'react';
import ChooseOneOfFour from './questionItem/ChooseOneOfFour';
import FillInWord from './questionItem/FillInWord';
import './style.scss'

const CHOOSE_1_OF_4 = 1
const FILLINWORD = 2

const RightContent = (props) => {
    return (
        <div className="hvx-contentGame ">
            <div className="hvx-contentTitle center">
                {props.examName}
            </div>

            <div className="hvx-mainContent">
                <div className="listItem">
                    {props.listQuestion && props.listQuestion?.length > 0 ? props.listQuestion.map((item, index) => {
                        if (item.questionType === CHOOSE_1_OF_4) {
                            return <ChooseOneOfFour key={index}
                                data={item}
                                stt={index + 1}

                                activeQuetionList={props.activeQuetionList}
                                handleActiveQuestion={props.handleActiveQuestion}

                                listQuestionChoose1Of4={props.listQuestionChoose1Of4}
                                setListQuestionChoose1Of4={props.setListQuestionChoose1Of4}

                            />
                        }
                        if (item.questionType === FILLINWORD) {
                            return <FillInWord key={index}
                                data={item}
                                stt={index + 1}

                                activeQuetionList={props.activeQuetionList}
                                handleUnActiveQuestion={props.handleUnActiveQuestion}
                                handleActiveQuestion={props.handleActiveQuestion}

                                listQuestionFillWord={props.listQuestionFillWord}
                                setListQuestionFillWord={props.setListQuestionFillWord}

                            />
                        }
                        return true
                    }) : "No data"}

                </div>
            </div>
        </div>
    );
}

export default RightContent;
