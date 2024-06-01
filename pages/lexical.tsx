import React from "react";
// seo
import Container from "@components/Container";
// layout
import DefaultLayout from "@layouts/DefaultLayout";
import Editor from "@components/lexical/Editor";

const Lexical = () => {
  const seoMetaInformation = {
    title: "Index",
  };
  const [instructions, handleInstructions] = React.useState<any>();
  return (
    <>
      <Container meta={seoMetaInformation}>
        <DefaultLayout>
          <div className="mt-4">
            <Editor
              id={`instructions`}
              data={instructions && instructions !== null ? instructions : null}
              onChange={(data: any) => handleInstructions(data)}
            />
          </div>
        </DefaultLayout>
      </Container>
    </>
  );
};

export default Lexical;
