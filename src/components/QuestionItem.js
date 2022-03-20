import React from "react";

function QuestionItem({ question, onDeleteItem, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(()=> onDeleteItem(question))
  }

  function handleAnswerChange(e){
    const answerValue = parseInt(e.target.value)
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: answerValue
      })
    })
    .then(resp => resp.json())
    .then(item => onAnswerChange(item))

  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
