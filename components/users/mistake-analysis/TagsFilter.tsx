import React from "react";
// swr
import useSWR from "swr";
// api routes
import {
  TAG_SUBJECT_WITH_EXAM_ENDPOINT,
  TAG_DOMAIN_WITH_SUBJECT_ENDPOINT,
  TAG_TOPIC_WITH_DOMAIN_ENDPOINT,
  TAG_SUB_TOPIC_WITH_TOPIC_ENDPOINT,
} from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
import { ReactHookSelect } from "@components/forms/ReactHookSelect";

interface IAnalyzerFilterTags {
  control: any;
  errors: any;
  watch: any;
  subject?: any;
}

const AnalyzerFilterTags: React.FC<IAnalyzerFilterTags> = ({
  control,
  errors,
  watch,
  subject: selectSubject = false,
}) => {
  // subject swr
  const { data: subjectList, error: subjectListError } = useSWR(
    [TAG_SUBJECT_WITH_EXAM_ENDPOINT(1), `tag-subject-${1}`],
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  // domain swr
  const { data: domainList, error: domainListError } = useSWR(
    watch("subject")
      ? [TAG_DOMAIN_WITH_SUBJECT_ENDPOINT(watch("subject")), `tag-subject-${watch("subject")}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  // topic swr
  const { data: topicList, error: topicListError } = useSWR(
    watch("domain")
      ? [TAG_TOPIC_WITH_DOMAIN_ENDPOINT(watch("domain")), `tag-subject-${watch("domain")}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  // sub topic swr
  const { data: subTopicList, error: subTopicListError } = useSWR(
    watch("topic")
      ? [TAG_SUB_TOPIC_WITH_TOPIC_ENDPOINT(watch("topic")), `tag-subject-${watch("topic")}`]
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
    if (subjectList || domainList || topicList || subTopicList) {
      setFilterOptions((prevData: any) => {
        return {
          ...prevData,
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
  }, [subjectList, domainList, topicList, subTopicList]);


  const renderFilterOptions = (filterType: string) => {
    let options = [{ key: null, title: "None" }];

    if (filterOptions && filterOptions?.[filterType] && filterOptions?.[filterType].length > 0)
      options = [...options, ...filterOptions?.[filterType]];

    return options;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={`grid ${selectSubject ? `grid-cols-1` : `grid-cols-3`} gap-4`}>
        {selectSubject ? (
          <div className="w-full">
            <ReactHookSelect
              name="subject"
              placeHolder="Select Subject"
              label="Select Subject"
              control={control}
              required={true}
              errors={errors}
              disabled={renderFilterOptions("subjectFilter").length > 1 ? false : true}
              searchFilteredOptions={renderFilterOptions("subjectFilter")}
            />
          </div>
        ) : (
          <>
            <div className="w-full">
              <ReactHookSelect
                name="domain"
                placeHolder="Select Domain"
                label="Domain"
                control={control}
                errors={errors}
                disabled={renderFilterOptions("domainFilter").length > 1 ? false : true}
                searchFilteredOptions={renderFilterOptions("domainFilter")}
                watch={watch}
              />
            </div>

            <div className="w-full">
              <ReactHookSelect
                name="topic"
                placeHolder="Select Topic"
                label="Topic"
                control={control}
                errors={errors}
                disabled={renderFilterOptions("topicFilter").length > 1 ? false : true}
                searchFilteredOptions={renderFilterOptions("topicFilter")}
                watch={watch}
              />
            </div>

            <div className="w-full">
              <ReactHookSelect
                name="sub_topic"
                placeHolder="Select Sub Topic"
                label="Sub Topic"
                control={control}
                errors={errors}
                disabled={renderFilterOptions("subTopicFilter").length > 1 ? false : true}
                searchFilteredOptions={renderFilterOptions("subTopicFilter")}
                watch={watch}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyzerFilterTags;
