import React, {useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [isQuestion, setIsQuestion] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(item => setIsQuestion(item))
  }, [])

  function handleAddItem(newItem){
    setIsQuestion([...isQuestion, newItem])
  }
  
  function handleDeleteQuestion(deletedItem){
    const updateItems = isQuestion.filter(item => item.id !== deletedItem.id)
    setIsQuestion(updateItems)
  }

  function handleAnswerChange(newAnswer){
    const updateItems = isQuestion.map(item=>{
      if(item.id === newAnswer.id){
        return newAnswer
      }else{
        return item
      }
    })
    setIsQuestion(updateItems)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddItem={handleAddItem}/> : <QuestionList isQuestion={isQuestion} onDeleteItem={handleDeleteQuestion} onAnswerChange={handleAnswerChange}/>}
    </main>
  );
}

export default App;
