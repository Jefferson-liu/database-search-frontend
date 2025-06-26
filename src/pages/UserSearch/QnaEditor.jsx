import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Qna from "../../components/Qna/Qna";
import QnaSidebar from "../../components/QnaSidebar/QnaSidebar";
import EmptyState from "../../components/EmptyState/EmptyState";
import "./QnaEditor.css";
import { autosaveToWebhook } from "../../api/autosave";

function QnaEditor() {
  const [qnaList, setQnaList] = useState([]);
  const [prevQnaList, setPrevQnaList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isLoadingSearchData, getSearchDataError } = [false, null];

  const updateQna = (field, value) => {
    const updated = [...null];
    updated[selectedIndex][field] = value;
    setQnaList(updated);
  };

  const onDelete = async (search_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Search?");
    if (!confirmed) return null;

    let updated;
    if (qnaList[selectedIndex].unsaved) {
      updated = qnaList.filter((qna) => qna.search_id !== search_id);
    }
    else {
      updated = await handleDelete(search_id);
    }
    if (!updated) return;
    setQnaList(updated);
    if (selectedIndex >= updated.length) {
      setSelectedIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleDelete = async (search_id) => {
    try {
      await deleteQna(search_id); // delete from backend
      const updated = qnaList.filter((qna) => qna.search_id !== search_id);
      toast.success(`QnA with search_id ${search_id} deleted successfully!`);
      return updated
    } catch (err) {
      toast.error("Failed to delete QnA: " + err.message);
      return null
    }
  };

  const addNewQna = () => {
    // Generate a unique customer name
    const customerNumber = qnaList.length + 1;
    const customerName = `Customer ${customerNumber}`;
    const newQna = {
      search_id: String(Date.now()),
      user_id: "1", 
      customer_name: customerName,
    };
    setQnaList((prev) => {
      const updated = [...prev, newQna];
      setSelectedIndex(updated.length - 1); // Select the new QnA
      return updated;
    });
    // Autosave the new QnA
    autosaveToWebhook(newQna);
  };

  const handleSave = async () => {
    const qnaToSave = qnaList[selectedIndex];
    if (!qnaToSave) {
      toast.error("No QnA selected to save.");
      return;
    }
  
    const trimmedQuestion = qnaToSave.question.trim();
    const trimmedAnswer = qnaToSave.answer.trim();
    
    console.log(prevQnaList)
    const original = prevQnaList.find(q => q?.search_id === qnaToSave.search_id);
  
    try {
      if (qnaToSave.unsaved) {
        const data = await addQna(trimmedQuestion, trimmedAnswer);
        console.log(data)
  
        toast.success("QnA saved successfully!");
        setQnaList(prev => {
          const updated = [...prev];
          updated[selectedIndex] = {
            ...updated[selectedIndex],
            question: trimmedQuestion,
            answer: trimmedAnswer,
            unsaved: false,
            search_id: data.search_id,
          };
          return updated;
        });
        setPrevQnaList(prev => {
          const updated = [...prev];
          updated[selectedIndex] = {
            search_id: data.search_id,
            question: trimmedQuestion,
            answer: trimmedAnswer,
          };
          return updated;
        });
      } else {
        const isChanged = !original ||
          original.question !== trimmedQuestion ||
          original.answer !== trimmedAnswer;
        console.log(isChanged);
        console.log(original, trimmedQuestion, trimmedAnswer)
        if (!isChanged) {
          toast.info("No changes to save.");
          setQnaList(prev => {
            const updated = [...prev];
            updated[selectedIndex] = {
              ...updated[selectedIndex],
              question: trimmedQuestion,
              answer: trimmedAnswer,
            };
            return updated;
          });
          return;
        }
  
        await addQna(trimmedQuestion, trimmedAnswer, qnaToSave.search_id);
        toast.success("QnA updated successfully!");
  
        setQnaList(prev => {
          const updated = [...prev];
          updated[selectedIndex] = {
            ...updated[selectedIndex],
            question: trimmedQuestion,
            answer: trimmedAnswer,
            unsaved: false,
          };
          return updated;
        });
  
        setPrevQnaList(prev => {
          const updated = [...prev];
          updated[selectedIndex] = {
            search_id: qnaToSave.search_id,
            question: trimmedQuestion,
            answer: trimmedAnswer,
          };
          return updated;
        });
      }
  
    } catch (err) {
      toast.error("Failed to save QnA: " + err.message);
      console.error(err);
    }
  };
  


  const onSave = (qna) => {

    if (!qna.question.trim()) {
      toast.warn("Please fill in the name.", { toastId: "empty-fields-warning", position: "top-center" });
      return;
    }
    handleSave();
  }

  if (isLoadingSearchData) return <div>Loading...</div>;
  if (getSearchDataError) return <div>Error: {getSearchDataError}</div>;
  return (
    <div className="qna-editor-layout">
      <QnaSidebar
        qnaList={qnaList}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        onAdd={addNewQna}
        handleDelete={onDelete}
        handleGoHome={() => window.location.href = "/"}
      />
      <div className="qna-editor-panel">
        {qnaList.length === 0 ? (
          <EmptyState />
        ) : (
          <Qna
            qna={qnaList[selectedIndex]}
            onChange={updateQna}
            onSave={() => onSave(qnaList[selectedIndex])}
          />
        )}
      </div>
    </div>

  );
}

export default QnaEditor;
