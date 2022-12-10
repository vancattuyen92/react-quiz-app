import React, {useState,useEffect,useContext} from 'react'
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const getRandomInit = max => {
    return Math.floor(Math.random() * Math.floor(max))
}

export default function Question() {
    const {settingForm, score, setScore} = useAppContext()
    console.log('setting Formmmm', {settingForm})
    const [questionIndex, setQuestionIndex] = useState(0)
    const [questionOptions, setQuestionOptions] = useState([])
    const [questionList, setQuestionList] = useState([])

    const navigate = useNavigate();
    

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${settingForm.amount}&category=${settingForm.category}&difficulty=${settingForm.difficulty}&type=${settingForm.type}`)
        .then(res => res.json())
        .then(data => {
            const res = data.results[questionIndex]
            let answers = [...res.incorrect_answers];
            answers.splice(getRandomInit(res.incorrect_answers.length), 0, res.incorrect_answers);
            setQuestionOptions(answers);
            setQuestionList(data.results);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // set options
    useEffect(() => {
        if (questionIndex === 0) return;
        
        let answers = [...questionList[questionIndex].incorrect_answers];
        answers.splice(getRandomInit(questionList[questionIndex].incorrect_answers.length), 0, questionList[questionIndex].correct_answer);
        setQuestionOptions(answers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionIndex])

    function handleAnswer(event) {
        console.log('event', event.target.textContext)
        // check if answer is correct
        if (event.target.textContent === questionList[questionIndex].correct_answer) {
            setScore(prevState => prevState + 1)
        }
        if (questionIndex + 1 < questionList.length) {
            setQuestionIndex(prevState => prevState + 1);
        } else {
            // navigate to final screen page
            navigate('/finalscreen')
        }
    }

    console.log('question: ',questionList)
    console.log('questionIndex: ', questionIndex)

    return (
        <div>
            <h1>Question {questionIndex + 1}</h1>
            <p>{questionList.length > 0 && questionList[questionIndex].question}</p>
            <Space
                direction="vertical"
                style={{'width': '50%'}}
            >
                {questionOptions.map((name, index) => {
                    return (
                        <Button type="primary" block key={index} onClick={handleAnswer}>{name}</Button>
                    )
                })}
            </Space>
            <p>Score : {score}</p>
        </div>
    )
}