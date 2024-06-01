import React from 'react'
const QuestionShowRender = ({ annotated_html }: any) => {
  return (
    <div id='html_Parg' ><div
      dangerouslySetInnerHTML={{ __html: annotated_html }}
    /></div>
  )
}

export default QuestionShowRender