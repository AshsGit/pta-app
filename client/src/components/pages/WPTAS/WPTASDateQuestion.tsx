import { DatePicker, DatePickerProps } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { useState } from "react";
import { WPTASQuestion, WPTASQuestionType } from './WPTASQuestionWrapper';

type MUPD = MaterialUiPickersDate;

export type DateQuestionType = 
    WPTASQuestionType<MUPD, "given_answer_component" | "correct_answer_component" | "multi_choice_option_component" | "new_multi_choice">;

type FactoryDateQuestionType = (datePickerProps: Partial<DatePickerProps>) => DateQuestionType;

const WPTASCustomViewDateQuestion = ({datePickerProps, props}: {datePickerProps: Partial<DatePickerProps>, props: Parameters<DateQuestionType>[0]}) => {
    const [givenAnswer, setGivenAnswer] = useState<MUPD>(null);
    const [correctAnswer, setCorrectAnswer] = useState<MUPD>(props.correct_answer ?? new Date());
    const [multiChoiceVals, setMultiChoiceVals] = useState<MUPD[]>(props.multi_choice(props.correct_answer));
    
    const setter = (index: number) => (newVal: MUPD) => {
        const copy = [...multiChoiceVals];
        copy[index] = newVal;
        setMultiChoiceVals(copy);
    }

    return WPTASQuestion({
        given_answer_component: (
            <DatePicker
              autoOk
              disableToolbar
              label="Patient Response"
              color="secondary"
              value={givenAnswer}
              onChange={setGivenAnswer}
              okLabel={false}
              cancelLabel={false}
              clearable
              {...datePickerProps} />),
        correct_answer_component: (
            <DatePicker
              autoOk
              disableToolbar
              label="Correct Answer"
              color="secondary"
              value={correctAnswer}
              onChange={setCorrectAnswer}
              okLabel={false}
              cancelLabel={false}
              clearable
              {...datePickerProps} />
        ),
        multi_choice_option_component: (index, value: MUPD) =>(
            <DatePicker
                autoOk
                disableToolbar
                color="secondary"
                value={multiChoiceVals[index]}
                onChange={setter(index)}
                okLabel={false}
                cancelLabel={false}
                clearable
                {...datePickerProps} />),
        new_multi_choice: null,
        ...props,
    })
}

const factory: FactoryDateQuestionType = datePickerProps => props => WPTASCustomViewDateQuestion({datePickerProps, props});

export const WPTASDateQuestion = factory({
    disableToolbar: false,
    views: ["date", "month", "year"],
    format: "dd-MMM-yy"
});
export const WPTASMonthOnlyQuestion = factory({
    views: ["month"],
    format: "MMMM",
});
export const WPTASDayOnlyQuestion = factory({
    views: ["date"],
    format: "dddd",
});
export const WPTASYearOnlyQuestion = factory({
    views: ["year"],
    format: "yyyy",
});