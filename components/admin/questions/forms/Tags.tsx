import React from "react";
// components
import Select from "@components/ui/Select";

interface IQuestionTags {
  block: any;
  handleBlock: any;
}

const difficultyOptions = [
  { key: "1", title: "1" },
  { key: "2", title: "2" },
  { key: "3", title: "3" },
  { key: "4", title: "4" },
  { key: "5", title: "5" },
];

const decisionOptions = [
  { key: "-1", title: "Reject" },
  { key: "0", title: "Pending" },
  { key: "1", title: "Approve" },
];


const usedOptions = [
  { key: "class_assignment", value: "Class Assignment" },
  { key: "home_assignment", value: "Home Assignment" },
  { key: "practice_test", value: "Practice Test" },
  { key: "sectional_test", value: "Sectional Test" },
  { key: "mock_test", value: "Mock Test" },
];
const bloomTaxonomyOptions = [
  { key: "memory", value: "Memory" },
  { key: "comprehension", value: "Comprehension" },
  { key: "application", value: "Application" },
  { key: "analysis", value: "Analysis" },
  { key: "synthesis", value: "Synthesis" },
  { key: "judgment", value: "Judgment" },
];

const QuestionTags: React.FC<IQuestionTags> = ({ block, handleBlock }) => {
  return (
    <div className="p-3 border-t border-gray-300 flex flex-col gap-4">
      <div className="text-sm font-medium text-gray-500">Question Tags</div>

      {/* difficulty (Approvers and Statistical) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">Approvers Difficulty</div>
          <div>
            <Select
              placeHolder="Select approvers difficulty"
              options={difficultyOptions}
              selectedOptions={block?.approvers_difficulty ? [block?.approvers_difficulty] : null}
              handleOption={(_value: any, data: any) => {
                handleBlock("approvers_difficulty", _value[0]);
              }}
              multiple={false}
            />
          </div>
        </div>
        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">Statistical Difficulty</div>
          <div>
            <Select
              placeHolder="Select statistical difficulty"
              options={difficultyOptions}
              selectedOptions={
                block?.statistical_difficulty ? [block?.statistical_difficulty] : null
              }
              handleOption={(_value: any, data: any) => {
                handleBlock("statistical_difficulty", _value[0]);
              }}
              multiple={false}
            />
          </div>
        </div>
      </div>

      {/* decision and sourced from */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">Decision</div>
          <div>
            <Select
              placeHolder="Select decision"
              options={decisionOptions}
              selectedOptions={block?.decision ? [block?.decision] : null}
              handleOption={(_value: any, data: any) => {
                handleBlock("decision", _value[0]);
              }}
              multiple={false}
            />
          </div>
        </div>
        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">Sourced From</div>
          <div>
            <input
              type={"text"}
              placeholder={`Sourced from`}
              className={`border border-[#E2E2E2] rounded-sm focus:outline-none my-auto mr-2 w-full px-2 py-1.5 bg-transparent`}
              value={block?.sourced_from}
              onChange={(e: any) => handleBlock("sourced_from", e.target.value)}
              // disabled={true}
            />
          </div>
        </div>
      </div>

      {/* weight */}
      <div>
        <div className="pb-1 text-sm font-medium text-gray-500">Weight</div>
        <div>
          <input
            type="number"
            className="rounded border p-2 outline-none w-full bg-transparent"
            value={block?.weight}
            onChange={(e: any) => handleBlock("weight", e.target.value)}
          />
        </div>
      </div>

      {/* used_in */}
      <div>
        <div className="pb-1 text-sm font-medium text-gray-500">Used In</div>
        <div className="flex flex-wrap items-center gap-4">
          {usedOptions &&
            usedOptions.map((_usedOption: any, index: any) => (
              <div key={index} className="flex gap-2">
                <div className="mt-[1px]">
                  <input
                    type="checkbox"
                    className="accent-violet-100"
                    defaultChecked={
                      block.used_in ? (block.used_in[_usedOption.key] ? true : false) : false
                    }
                    checked={block.used_in ? block.used_in[_usedOption.key] : false}
                    onChange={() =>
                      handleBlock("used_in", {
                        ...block.used_in,
                        [_usedOption.key]: !block.used_in[_usedOption.key],
                      })
                    }
                  />
                </div>
                <div>{_usedOption?.value}</div>
              </div>
            ))}
        </div>
      </div>

      {/* blume_taxonomy*/}
      <div className="">
        <div className="pb-1 text-sm font-medium text-gray-500">Bloom{"'"}s Taxonomy </div>
        <div className="flex flex-wrap items-center gap-4">
          {bloomTaxonomyOptions &&
            bloomTaxonomyOptions.map((_blumeOption: any, index: any) => (
              <div key={index} className="flex gap-2">
                <div className="mt-[1px]">
                  <input
                    type="checkbox"
                    className="accent-violet-100"
                    defaultChecked={
                      block.blume_taxonomy
                        ? block.blume_taxonomy[_blumeOption.key]
                          ? true
                          : false
                        : false
                    }
                    checked={block.blume_taxonomy ? block.blume_taxonomy[_blumeOption.key] : false}
                    onChange={() =>
                      handleBlock("blume_taxonomy", {
                        ...block.blume_taxonomy,
                        [_blumeOption.key]: !block.blume_taxonomy[_blumeOption.key],
                      })
                    }
                  />
                </div>
                <div>{_blumeOption?.value}</div>
              </div>
            ))}
        </div>
      </div>

      {/* irt */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">IRT A</div>
          <div>
            <input
              type="text"
              className="rounded border p-2 outline-none w-full bg-transparent"
              value={block?.irt_a}
              onChange={(e: any) => handleBlock("irt_a", e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">IRT B</div>
          <div>
            <input
              type="text"
              className="rounded border p-2 outline-none w-full bg-transparent"
              value={block?.irt_b}
              onChange={(e: any) => handleBlock("irt_b", e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">IRT C</div>
          <div>
            <input
              type="text"
              className="rounded border p-2 outline-none w-full bg-transparent"
              value={block?.irt_c}
              onChange={(e: any) => handleBlock("irt_c", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* remarks */}
      <div className="">
        <div className="pb-1 text-sm font-medium text-gray-500">Remarks</div>
        <textarea
          id={`question-create-remarks`}
          rows={3}
          placeholder={`Remarks`}
          className={`border border-[#E2E2E2] rounded-sm focus:outline-none my-auto mr-2 w-full px-2 py-1.5 bg-transparent`}
          value={block?.remarks}
          onChange={(e: any) => handleBlock("remarks", e.target.value)}
        />
      </div>
    </div>
  );
};

export default QuestionTags;
