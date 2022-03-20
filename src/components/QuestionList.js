import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({isQuestion, onDeleteItem, onAnswerChange}) {

  const displayQuestions = isQuestion.map(item => <QuestionItem key={item.id} question={item} onDeleteItem={onDeleteItem} onAnswerChange={onAnswerChange}/>)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
