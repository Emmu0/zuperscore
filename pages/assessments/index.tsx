import React, { useEffect } from "react";
// next imports
import { useRouter } from "next/router";
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// swr
import useSWR from "swr";
// hook form
import { Controller, useForm } from "react-hook-form";
// components
import Button from "@components/buttons";
import AdminHeader from "@components/admin/AdminHeader";
import AssessmentCardView from "@components/admin/assessments/View";
import AssessmentCreateEdit from "@components/admin/assessments/CreateEdit";
import AssessmentArchive from "@components/admin/assessments/Archive";
import { ReactHookSelect } from "@components/forms/ReactHookSelect";
import MultiSelect from "@components/ui/Select/MultiSelect";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api services
import { APIFetcher } from "@lib/services";
// apis
import {
  ASSESSMENT_ENDPOINT,
  ASSESSMENT_TAGS,
  TAG_DOMAIN_WITH_SUBJECT_ENDPOINT,
  TAG_SUBJECT_WITH_EXAM_ENDPOINT,
  TAG_TOPIC_WITH_DOMAIN_ENDPOINT,
} from "@constants/api-routes";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
// hero icon
import { XIcon } from "@heroicons/react/solid";
import { Switch } from "@headlessui/react";
import { BinIcon } from "@ui/icons";

type Inputs = {
  subject: number | null;
  domain: number | null;
  topic: number | null;
  is_extended: boolean;
  is_tutor_test: boolean;
  tags: any[] | null;
};

let defaultValues = {
  domain: null,
  subject: null,
  topic: null,
  is_extended: false,
  is_tutor_test: false,
  tags: null,
};

const seoMetaInformation = {
  title: "Admin Assessments",
};

const assessmentKindOptions = [
  { key: "MOCK", title: "Mock" },
  { key: "SECTIONAL", title: "Sectional" },
  { key: "MICRO", title: "Micro" },
  { key: "PRACTICE_SHEET", title: "Practice Sheet" },
  { key: "DIAGNOSTIC", title: "Diagnostic" },
];

const AdminAssessments: NextPage = () => {
  const router = useRouter();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });

  const {
    kind,
    subject,
    domain,
    topic,
    tags,
    is_tutor_test,
    is_extended,
    search: querySearch,
  } = router.query as {
    kind: any;
    subject: any;
    domain: any;
    topic: any;
    tags: any;
    is_tutor_test: any;
    is_extended: any;
    search: any;
  };

  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user) setProfile(userToken?.user);
  }, []);

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
  const [showArchived, setShowArchived] = React.useState(false);
  const [search, setSearch] = React.useState<string>("");
  const [assessmentFilter, setAssessmentFilter] = React.useState<any>(null);
  const [filterData, setFilterData] = React.useState<any>("");

  const handleSearchContinue = () => {
    let queryStringArray: any = [];
    watch("subject") ? queryStringArray.push(`subject=${watch("subject")}`) : ``;
    watch("domain") ? queryStringArray.push(`domain=${watch("domain")}`) : ``;
    watch("topic") ? queryStringArray.push(`topic=${watch("topic")}`) : ``;
    queryStringArray.push(`is_tutor_test=${watch("is_tutor_test")}`);
    queryStringArray.push(`is_extended=${watch("is_extended")}`);
    let queryString: any = queryStringArray.toString();
    queryString = queryString.replace(/,/g, "&");

    if (assessmentFilter || (search && search.length > 0) || watch("subject")) {
      let querySearch = ``;
      querySearch = `?${search && "search=" + search}&kind=${
        assessmentFilter ? assessmentFilter : ``
      }${queryStringArray && queryStringArray.length > 0 ? `&${queryString}` : ``}`;
      router.replace(`/assessments/${querySearch}`, undefined, {
        shallow: true,
      });
      setFilterData({ search: search, assessmentFilter: assessmentFilter });
    }
  };
  const handleSearchClear = () => {
    router.replace(
      `/assessments?search=&kind=${assessmentFilter ? assessmentFilter : ``}`,
      undefined,
      {
        shallow: true,
      }
    );
    setSearch("");
    reset();
    setFilterData(null);
  };

  React.useEffect(() => {
    if (kind || querySearch) {
      setSearch(querySearch ? querySearch : "");
      setAssessmentFilter(kind ? kind : null);
      setFilterData({
        search: querySearch ? querySearch : "",
        assessmentFilter: kind ? kind : null,
      });
    }
  }, [kind, querySearch]);

  const filterSearch = (assessments: any) => {
    let filteredAssessments: any = [];

    if (filterData && filterData?.search && filterData?.search.length > 0) {
      filteredAssessments = assessments.filter((assessment: any) =>
        assessment?.name.toLowerCase().includes(filterData?.search.toLowerCase())
      );
    } else filteredAssessments = assessments;

    return filteredAssessments;
  };

  const { data: assessments, error: assessmentsError } = useSWR(
    [
      kind ? `${ASSESSMENT_ENDPOINT}?kind=${kind}&archive=${showArchived}` : ASSESSMENT_ENDPOINT,
      `ASSESSMENT_FILTER_${kind}`,
    ],
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  const [filteredAssessments, setFilteredAssessments] = React.useState([]);

  useEffect(() => {
    let filteredData = assessments?.assessments;
    if (subject || topic || domain) {
      filteredData = filteredData?.filter((assessment: any) => {
        if (subject && topic && domain) {
          return (
            assessment.subject == subject &&
            assessment.topic == topic &&
            assessment.domain == domain
          );
        } else if (subject && domain) {
          return assessment.subject == subject && assessment.domain == domain;
        } else if (subject) {
          return assessment.subject == subject;
        }
        return false;
      });
    }
    if (tags) {
      const string = tags;
      const queryTag = string.split(",");
      filteredData = filteredData?.filter((assessment: any) => {
        return queryTag.some((tag: any) => assessment.tags.includes(tag));
      });
    }
    if (is_extended)
      filteredData = filteredData?.filter(
        (assessment: any) => String(assessment.is_extended) == is_extended
      );
    if (is_tutor_test)
      filteredData = filteredData?.filter(
        (assessment: any) => String(assessment.is_tutor_test) == is_tutor_test
      );

    setFilteredAssessments(filteredData);
  }, [assessments, domain, subject, topic, tags, is_tutor_test, is_extended]);
  const [currentAssessment, setCurrentAssessment] = React.useState<any | null>(null);
  
  const handleCurrentAssessment = (kind: any, value: any = null) => {
    if (kind === "clear") setCurrentAssessment(null);
    else
      setCurrentAssessment((prevData: any) => {
        return { kind: kind, assessment: value };
      });
  };
  const [filterOptions, setFilterOptions] = React.useState<any>({
    subjectFilter: null,
    domainFilter: null,
    topicFilter: null,
  });
  useEffect(() => {
    if (subjectList || domainList || topicList) {
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
        };
      });
    }
  }, [subjectList, domainList, topicList]);

  const renderFilterOptions = (filterType: string) => {
    let options = [{ key: null, title: "None" }];

    if (filterOptions && filterOptions?.[filterType] && filterOptions?.[filterType].length > 0)
      options = [...options, ...filterOptions?.[filterType]];

    return options;
  };

  // assessment tags swr
  const { data: assessmentTags, error: assessmentTagsListError } = useSWR(
    ASSESSMENT_TAGS,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const assessmentTagsList =
    assessmentTags && assessmentTags.length > 0
      ? assessmentTags.map((item: any) => {
          return { key: item.id, title: item.name };
        })
      : [];

  const removeGroup = (groupId: number) => {
    setValue("tags", watch("tags")?.filter((id: any) => id !== groupId) ?? []);
  };

  React.useEffect(()=> {
    router.replace(`/assessments?kind=${kind}`)
  }, [watch('is_extended')])
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout padding={false}>
        <div className="relative">
          <div className="sticky top-0 z-10 p-5 pb-0 bg-light-0 space-y-4">
            <AdminHeader
              title={`${showArchived ? "Archived Assessments" : "Assessments"}`}
              description=""
              margin={false}
              button={
                showArchived ? undefined : (
                  <Button size="sm" onClick={() => handleCurrentAssessment("create-edit")}>
                    Create Assessment
                  </Button>
                )
              }
            />

            <div className="flex justify-between py-4">
              <div className="flex gap-4">
                {assessmentKindOptions.map((item: any, index: any) => (
                  <div
                    onClick={() => {
                      setShowArchived(false);
                      setAssessmentFilter(item.key);
                      let querySearch = ``;
                      setValue("domain", null);
                      setValue("topic", null);
                      setValue("subject", null);
                      querySearch = `?kind=${item.key ? item.key : ``}${
                        is_tutor_test ? `&is_tutor_test=${is_tutor_test}` : ""
                      }${is_extended ? `&is_extended=${is_extended}` : ""}&archive=${
                        showArchived ? `true` : `false`
                      }`;
                      router.replace(`/assessments/${querySearch}`, undefined, {
                        shallow: true,
                      });
                    }}
                    key={index}
                    className={`cursor-pointer px-3 py-1.5 text-sm uppercase font-medium rounded-sm focus:outline-none border border-gray-100 flex items-center ${
                      item.key == assessmentFilter
                        ? "border-violet-100 bg-violet-100 text-yellow-0"
                        : "hover:bg-violet-0 hover:border-violet-0 hover:text-violet-100"
                    }`}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
              {/* search panel starts */}

              <div className="flex items-center gap-2 justify-end">
                <div className="bg-white">
                  <input
                    type="text"
                    className="rounded border p-1.5 outline-none w-full"
                    value={search}
                    placeholder={"Search Assessment"}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div>
                  <Button size="sm" onClick={handleSearchContinue}>
                    Filter
                  </Button>
                </div>
                <div>
                  <Button variant="secondary" size="sm" onClick={handleSearchClear}>
                    Clear
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-start">
              <div className="flex gap-3">
                <div className="text-sm text-dark-100">Extended</div>
                <div className="relative">
                  <Switch
                    checked={watch("is_extended")}
                    onChange={() => setValue("is_extended", !watch("is_extended"))}
                    style={{
                      backgroundColor: watch("is_extended") ? "#721154" : "#8B8B8B",
                    }}
                    className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        watch("is_extended") ? "translate-x-4" : "translate-x-0"
                      } pointer-events-none mt-[1px] ml-[1px] inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-sm text-dark-100">Tutor Test </div>
                <div className="relative">
                  <Switch
                    checked={watch("is_tutor_test")}
                    onChange={() => setValue("is_tutor_test", !watch("is_tutor_test"))}
                    style={{
                      backgroundColor: watch("is_tutor_test") ? "#721154" : "#8B8B8B",
                    }}
                    className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        watch("is_tutor_test") ? "translate-x-4" : "translate-x-0"
                      } pointer-events-none mt-[1px] ml-[1px] inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
              </div>
              <div className="ml-auto pr-2">
                <Button
                  size="sm"
                  variant={showArchived ? "danger" : "secondary"}
                  onClick={() => {
                    let querySearch = ``;
                    setValue("domain", null);
                    setValue("topic", null);
                    setValue("subject", null);
                    querySearch = `?kind=${assessmentFilter ? assessmentFilter : ``}&archive=${
                      showArchived ? `false` : `true`
                    }`;
                    router.replace(`/assessments/${querySearch}`, undefined, {
                      shallow: true,
                    });
                    setShowArchived(!showArchived);
                  }}
                >
                  <BinIcon fill="#FFFFFF" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pb-3">
              {kind !== "MOCK" && kind !== "DIAGNOSTIC" ? (
                <>
                  <div className="w-full">
                    <ReactHookSelect
                      name="subject"
                      placeHolder="Select Subject"
                      label="Subject"
                      control={control}
                      errors={errors}
                      disabled={renderFilterOptions("subjectFilter").length > 1 ? false : true}
                      searchFilteredOptions={renderFilterOptions("subjectFilter")}
                    />
                  </div>
                  {kind !== "SECTIONAL" && kind !== "MICRO" ? (
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
                    </>
                  ) : null}
                </>
              ) : null}
              {assessmentTagsList && assessmentTagsList.length > 0 ? (
                <div>
                  <Controller
                    control={control}
                    name="tags"
                    rules={{ required: "This field is required." }}
                    render={({ field: { onChange, value, ref } }) => (
                      <div>
                        <div className="text-sm text-dark-100 mb-1">Tags</div>
                        <div className="flex flex-wrap gap-4 py-2">
                          {watch("tags")?.map((group: any, index: number) => (
                            <div
                              key={index}
                              className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
                            >
                              <div className="pl-2 pr-1">
                                {assessmentTagsList.find((user: any) => user.key === group)?.title}
                              </div>
                              <div
                                className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                                onClick={() => removeGroup(group)}
                              >
                                <XIcon className="h-4 w-4" aria-hidden="true" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <MultiSelect
                          placeHolder="Select tag"
                          options={assessmentTagsList}
                          selectedOptions={value || null}
                          handleOption={(_value: any, data: any) => {
                            onChange(_value);
                          }}
                          multiple={true}
                        />
                      </div>
                    )}
                  />
                </div>
              ) : null}
            </div>
            {/* search panel ends */}
          </div>

          <div className="px-5 pb-5">
            {assessments && !assessmentsError ? (
              <>
                <div className="text-lg text-violet-100">
                  Total Assessments: {filteredAssessments?.length || 0}
                </div>
                {filteredAssessments && filteredAssessments.length > 0 ? (
                  <div className="mt-4 flex flex-col gap-3">
                    {filterSearch(filteredAssessments).length > 0 ? (
                      <>
                        {filterSearch(filteredAssessments).map(
                          (_assessment: any, index: number) => (
                            <div key={`${index}`}>
                              <AssessmentCardView
                                assessment={_assessment}
                                handleCurrentAssessment={handleCurrentAssessment}
                                role={profile?.role}
                              />
                            </div>
                          )
                        )}
                      </>
                    ) : (
                      <div className="text-dark-100 text-center py-5">
                        No assessments are available.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-dark-100 text-center py-10">No assessments are created.</div>
                )}
              </>
            ) : (
              <div className="text-dark-100 text-center py-10">Loading...</div>
            )}
          </div>

          {currentAssessment && currentAssessment.kind === "create-edit" && (
            <AssessmentCreateEdit
              assessment={currentAssessment}
              handleCurrentAssessment={handleCurrentAssessment}
              mutateUrl={`${ASSESSMENT_ENDPOINT}`}
            />
          )}

          {currentAssessment && currentAssessment.kind === "archive" && (
            <AssessmentArchive
              assessment={currentAssessment}
              handleCurrentAssessment={handleCurrentAssessment}
              mutateUrl={`${ASSESSMENT_ENDPOINT}`}
            />
          )}
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminAssessments, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
