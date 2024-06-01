import React from "react";
// swr
import useSWR from "swr";
// components
import SearchFilter from "@components/filters/SelectSearchFilter";
// api routes
import {
  TAG_EXAM_ENDPOINT,
  TAG_SUBJECT_WITH_EXAM_ENDPOINT,
  TAG_DOMAIN_WITH_SUBJECT_ENDPOINT,
  TAG_TOPIC_WITH_DOMAIN_ENDPOINT,
  TAG_SUB_TOPIC_WITH_TOPIC_ENDPOINT,
} from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";

interface IQuestionTags {
  block: any;
  handleBlock: any;
  setBlock: any;
}

const QuestionTags: React.FC<IQuestionTags> = ({ block, handleBlock, setBlock }) => {
  // exam swr
  const { data: examList, error: examListError } = useSWR(
    block ? [TAG_EXAM_ENDPOINT, `tag-exam`] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  // subject swr
  const { data: subjectList, error: subjectListError } = useSWR(
    block && block?.exam
      ? [TAG_SUBJECT_WITH_EXAM_ENDPOINT(block?.exam), `tag-subject-${block?.exam}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  // domain swr
  const { data: domainList, error: domainListError } = useSWR(
    block && block?.subject
      ? [TAG_DOMAIN_WITH_SUBJECT_ENDPOINT(block?.subject), `tag-subject-${block?.subject}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  // topic swr
  const { data: topicList, error: topicListError } = useSWR(
    block && block?.domain
      ? [TAG_TOPIC_WITH_DOMAIN_ENDPOINT(block?.domain), `tag-subject-${block?.domain}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  // sub topic swr
  const { data: subTopicList, error: subTopicListError } = useSWR(
    block && block?.topic
      ? [TAG_SUB_TOPIC_WITH_TOPIC_ENDPOINT(block?.topic), `tag-subject-${block?.topic}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const [filterOptions, setFilterOptions] = React.useState<any>({
    examFilter: null,
    subjectFilter: null,
    domainFilter: null,
    topicFilter: null,
    subTopicFilter: null,
  });

  React.useEffect(() => {
    if (examList || subjectList || domainList || topicList || subTopicList) {
      setFilterOptions((prevData: any) => {
        return {
          ...prevData,
          examFilter:
            examList && examList.length > 0
              ? examList.map((_data: any) => {
                  return { key: _data?.id, title: _data?.name };
                })
              : null,
          subjectFilter:
            subjectList && subjectList.length > 0
              ? subjectList.map((_data: any) => {
                  return { key: _data?.id, title: _data?.name };
                })
              : null,
          domainFilter:
            domainList && domainList.length > 0
              ? domainList.map((_data: any) => {
                  return { key: _data?.id, title: _data?.name };
                })
              : null,
          topicFilter:
            topicList && topicList.length > 0
              ? topicList.map((_data: any) => {
                  return { key: _data?.id, title: _data?.name };
                })
              : null,
          subTopicFilter:
            subTopicList && subTopicList.length > 0
              ? subTopicList.map((_data: any) => {
                  return { key: _data?.id, title: _data?.name };
                })
              : null,
        };
      });
    }
  }, [examList, subjectList, domainList, topicList, subTopicList]);

  const renderFilterOptions = (filterType: string) => {
    let options = [{ key: null, title: "None" }];

    if (filterOptions && filterOptions?.[filterType] && filterOptions?.[filterType].length > 0)
      options = [...options, ...filterOptions?.[filterType]];

    return options;
  };

  const handleLocalBlock = (key: any, value: any) => {
    if (key == "exam") {
      setBlock((prevData: any) => {
        return {
          ...prevData,
          [key]: value,
          subject: null,
          domain: null,
          topic: null,
          sub_topic: null,
        };
      });

      setFilterOptions((prevData: any) => {
        return {
          ...prevData,
          subjectFilter: null,
          domainFilter: null,
          topicFilter: null,
          subTopicFilter: null,
        };
      });
    }
    if (key == "subject") {
      setBlock((prevData: any) => {
        return {
          ...prevData,
          [key]: value,
          domain: null,
          topic: null,
          sub_topic: null,
        };
      });
      setFilterOptions((prevData: any) => {
        return {
          ...prevData,
          domainFilter: null,
          topicFilter: null,
          subTopicFilter: null,
        };
      });
    }
    if (key == "domain") {
      setBlock((prevData: any) => {
        return { ...prevData, [key]: value, topic: null, sub_topic: null };
      });
      setFilterOptions((prevData: any) => {
        return {
          ...prevData,
          topicFilter: null,
          subTopicFilter: null,
        };
      });
    }
    if (key == "topic") {
      setBlock((prevData: any) => {
        return { ...prevData, [key]: value, sub_topic: null };
      });
      setFilterOptions((prevData: any) => {
        return {
          ...prevData,
          subTopicFilter: null,
        };
      });
    }
    if (key == "sub_topic") {
      setBlock((prevData: any) => {
        return { ...prevData, [key]: value };
      });
    }
  };

  return (
    <div className="p-3 border-t border-gray-300 flex flex-col gap-4">
      <div className="text-sm font-medium text-gray-500">Question Filter Tags</div>
      <div className="grid grid-cols-5 gap-4">
        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">Exam</div>
          <div>
            <SearchFilter
              placeHolder="Select Exam"
              options={renderFilterOptions("examFilter")}
              selectedOptions={block && block?.exam ? [block?.exam] : null}
              handleOption={(_value: any, data: any) => {
                handleLocalBlock("exam", _value[0]);
              }}
              disabled={renderFilterOptions("examFilter").length > 1 ? false : true}
              multiple={false}
              position="left"
            />
          </div>
        </div>

        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">Subject</div>
          <div>
            <SearchFilter
              placeHolder="Select Subject"
              options={renderFilterOptions("subjectFilter")}
              selectedOptions={block && block?.subject ? [block?.subject] : null}
              handleOption={(_value: any, data: any) => {
                handleLocalBlock("subject", _value[0]);
              }}
              disabled={renderFilterOptions("subjectFilter").length > 1 ? false : true}
              multiple={false}
              position="right"
            />
          </div>
        </div>

        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">Domain</div>
          <div>
            <SearchFilter
              placeHolder="Select Domain"
              options={renderFilterOptions("domainFilter")}
              selectedOptions={block && block?.domain ? [block?.domain] : null}
              handleOption={(_value: any, data: any) => {
                handleLocalBlock("domain", _value[0]);
              }}
              disabled={renderFilterOptions("domainFilter").length > 1 ? false : true}
              multiple={false}
              position="right"
            />
          </div>
        </div>

        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">Topic</div>
          <div>
            <SearchFilter
              placeHolder="Select Topic"
              options={renderFilterOptions("topicFilter")}
              selectedOptions={block && block?.topic ? [block?.topic] : null}
              handleOption={(_value: any, data: any) => {
                handleLocalBlock("topic", _value[0]);
              }}
              disabled={renderFilterOptions("topicFilter").length > 1 ? false : true}
              multiple={false}
              position="right"
            />
          </div>
        </div>

        <div>
          <div className="pb-1 text-sm font-medium text-gray-500">Sub Topic</div>
          <div>
            <SearchFilter
              placeHolder="Select Sub Topic"
              options={renderFilterOptions("subTopicFilter")}
              selectedOptions={block && block?.sub_topic ? [block?.sub_topic] : null}
              handleOption={(_value: any, data: any) => {
                handleLocalBlock("sub_topic", _value[0]);
              }}
              disabled={renderFilterOptions("subTopicFilter").length > 1 ? false : true}
              multiple={false}
              position="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTags;
