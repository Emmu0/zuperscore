import DropDown from "components/lexical/ui/DropDown";
import { FORMAT_ELEMENT_COMMAND } from "lexical";

const AlignmentDropDown = ({ activeEditor }) => {
  const alignments = [
    {
      name: "Align",
      value: "Align",
    },
    {
      name: "Left",
      value: "left",
    },
    {
      name: "Center",
      value: "center",
    },
    {
      name: "Right",
      value: "right",
    },
  ];

  const handleChange = (alignType) => {
    activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignType);
  };

  return <DropDown list={alignments} value={undefined} handleChange={handleChange} />;
};

export default AlignmentDropDown;
