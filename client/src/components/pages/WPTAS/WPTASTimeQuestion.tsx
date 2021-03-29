import { TimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { useState } from "react";
import { WPTASQuestion, WPTASQuestionType } from './WPTASQuestionWrapper';

type MUPD = MaterialUiPickersDate;

export type TimeQuestionType = 
    WPTASQuestionType<MaterialUiPickersDate, "given_answer_component" | "correct_answer_component" | "multi_choice_option_component" | "new_multi_choice">;


export const WPTASTimeQuestion: TimeQuestionType = props => {
    const [givenAnswer, setGivenAnswer] = useState<MUPD>(null);
    const [correctAnswer, setCorrectAnswer] = useState<MUPD>(props.correct_answer ?? new Date());
    const [multiChoiceVals, setMultiChoiceVals] = useState<MUPD[]>([]);
    
    const newMultiChoice: (val: MUPD)=>[MUPD, (date: MUPD)=>void] = val => {
        const index = multiChoiceVals.length;
        const value = val ?? new Date();
        const setter = (newVal: MUPD) => {
            const copy = [...multiChoiceVals];
            copy[index] = newVal; 
            setMultiChoiceVals(copy);
        }
        setMultiChoiceVals([...multiChoiceVals, value]);
        return [value, setter];
    }

    return WPTASQuestion({
        ...props,
        given_answer_component: (
            <TimePicker
              autoOk
              disableToolbar
              label="Patient Response"
              color="secondary"
              value={givenAnswer}
              onChange={setGivenAnswer}
              orientation="landscape" />),
        correct_answer_component: (
            <TimePicker
              autoOk
              disableToolbar
              label="Correct Answer"
              color="secondary"
              value={correctAnswer}
              onChange={setCorrectAnswer} />
        ),
        multi_choice_option_component: (_index, value: MaterialUiPickersDate) =>{
            const [val, setVal] = newMultiChoice(value);

            return (
                <TimePicker
                    autoOk
                    disableToolbar
                    color="secondary"
                    value={val}
                    onChange={setVal} />)
        },
        new_multi_choice: null,
    })
}