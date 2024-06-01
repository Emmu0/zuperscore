import React from "react";
// components
// import QuestionRoot from "./QuestionRoot";
// import QuestionPreviewRoot from "./QuestionPreviewRoot";
// api services
import { Question } from "@lib/services/assessment.service";

interface Question {
  name: string;
  content?: any;
  title: string;
  tags: string[];
  options: any;
  word_limit: number;
  data: any;
  answers: any;
}

type Props = { question: any; test_id?: any; section_id?: any; question_id: any; tags: any };

const QuestionPreview = ({ question, test_id, section_id, question_id, tags }: Props) => {
  // const [currentQuestionUpdateToggle, setCurrentQuestionUpdateToggle] =
  //   React.useState<boolean>(false);

  // const [currentBlockDelete, setCurrentBlockDelete] = React.useState<any>(null);
  // const [buttonLoader, setButtonLoader] = React.useState(false);
  // const [currentBlock, setCurrentBlock] = React.useState<any>(null);
  // const handleCurrentBlock = (key: any, value: any) => {
  //   setCurrentBlock({ ...currentBlock, [key]: value });
  // };

  // React.useEffect(() => {
  //   if (!question && !question_id) {
  //     setCurrentBlock(null);
  //     return;
  //   }

  //   if (question_id && question && question_id !== question.id) {
  //     if (question) {
  //       let newQuestion = { ...question };

  //       setCurrentBlock({
  //         ...newQuestion,
  //         content: (Object.keys(newQuestion?.content).length != 0 && newQuestion?.content) || "",
  //         answers: newQuestion.data.answers || [],
  //         multiple: newQuestion.data.multiple ?? false,
  //       });
  //     }
  //   }
  //   if (question_id && question && question_id === question.id) {
  //     if (question) {
  //       let newQuestion = { ...question };

  //       setCurrentBlock({
  //         ...newQuestion,
  //         content: (Object.keys(newQuestion?.content).length != 0 && newQuestion?.content) || "",
  //         answers: newQuestion.data.answers || [],
  //         multiple: newQuestion.data.multiple ?? false,
  //       });
  //     }
  //   }

  //   return () => setCurrentBlock(null);
  // }, [question, setCurrentBlock, question_id]);

  // const onBlockUpdate = async () => {
  //   let payload = {
  //     id: currentBlock.id,
  //     title: currentBlock.title,
  //     content: currentBlock.content,
  //     score: currentBlock.score,
  //     data: {
  //       answers: currentBlock.answers,
  //       multiple: currentBlock.multiple,
  //     },
  //   };

  //   setButtonLoader(true);

  //   return Question.update(payload)
  //     .then((response: any) => {
  //       // mutate(mutateUrl);
  //       setButtonLoader(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setButtonLoader(false);
  //     });
  // };

  // const [blockMode, setBlockMode] = React.useState("preview");

  return (
    <>
      {/* {blockMode === "edit" ? (
        <QuestionRoot
          currentBlock={currentBlock}
          handleCurrentBlock={handleCurrentBlock}
          setCurrentBlock={setCurrentBlock}
          tags={tags}
          setCurrentQuestionUpdateToggle={setCurrentQuestionUpdateToggle}
          currentBlockDelete={currentBlockDelete}
          setCurrentBlockDelete={setCurrentBlockDelete}
          onBlockUpdate={onBlockUpdate}
          buttonLoader={buttonLoader}
          blockMode={blockMode}
          setBlockMode={setBlockMode}
        />
      ) : (
        <QuestionPreviewRoot
          currentBlock={currentBlock}
          handleCurrentBlock={handleCurrentBlock}
          setBlockMode={setBlockMode}
        />
      )} */}
    </>
  );
};

export default QuestionPreview;
