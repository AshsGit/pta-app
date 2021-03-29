import { TextField } from "@material-ui/core";
import { WPTASQuestion, WPTASQuestionProps, WPTASQuestionType } from './WPTASQuestionWrapper';

type TextFieldType = "number" | "text" | "date";

export type TextFieldQuestionType<T> = 
    WPTASQuestionType<T, "given_answer_component" | "correct_answer_component" | "multi_choice_option_component" | "new_multi_choice">;

const WPTASTextFieldQuestion: <T, >(type: TextFieldType, new_multi_choice: T) => TextFieldQuestionType<T> = (type, new_multi_choice) => props => {
    return WPTASQuestion({
        given_answer_component: (
            <TextField 
                label="Patient Response"
                color="secondary"
                type={type} />),
        correct_answer_component: (
            <TextField 
                label="Correct Answer" 
                defaultValue={props.correct_answer}
                color="secondary"
                type={type} />
        ),
        multi_choice_option_component: (_index, value)=>(
            <TextField 
                label="" 
                defaultValue={value} 
                color="secondary" 
                type={type}
                multiline 
                rows={1} 
                rowsMax={4} />),
        new_multi_choice,
        ...props,
    })}

export const WPTASNumberQuestion = WPTASTextFieldQuestion<number | null>("number", null);
export const WPTASTextQuestion = WPTASTextFieldQuestion<string>("text", "");
//export const WPTASDateQuestion = WPTASTextFieldQuestion<Date>("date"); -- using material-ui/pickers instead