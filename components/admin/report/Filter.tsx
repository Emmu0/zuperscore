import React from "react";
// next imports
import { useRouter } from "next/router";
// swr
import { mutate } from "swr";
// api services
import { APIFetcher } from "@lib/services";
// components
import Button from "@components/buttons";
import SearchFilter from "@components/filters/SelectSearchFilter";
import SearchDropDownUser from "@components/ui/SearchDropDown/SearchDropDown";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
import Select from "@components/ui/Select";

interface IReportFilter {
  users?: any;
  assessments?: any;
  query?: any;
  handleSearchQuery?: any;
  mutateUrl?: any;
  mutateUrlAssessment?: string;
}

const ReportFilter: React.FC<IReportFilter> = ({
  users,
  assessments,
  query,
  handleSearchQuery,
  mutateUrl,
  mutateUrlAssessment,
}) => {
  const filterOptions = [
    {
      key: "all",
      title: "All",
    },
    {
      key: "submitted_at",
      title: "Submitted",
    },
    {
      key: "scheduled_at",
      title: "Scheduled",
    },
  ];
  const subjectOptions = [
    {
      key: "all",
      title: "All",
    },
    {
      key: "1",
      title: "Math",
    },
    {
      key: "2",
      title: "English",
    },
  ];
  const assesmentOptions = [
    {
      key: "all",
      title: "All",
    },
    {
      key: "MOCK",
      title: "Mock",
    },
    {
      key: "SECTIONAL",
      title: "Sectional",
    },
    {
      key: "MICRO",
      title: "Micro",
    },
    {
      key: "PRACTICE_SHEET",
      title: "Practice Sheet",
    },
    {
      key: "DIAGNOSTIC",
      title: "Diagnostic",
    },
  ];

  const renderFilterOptions = (type: string) => {
    let returnOptions: any = [{ key: "all", title: "None" }];

    let tagsFilter: any =
      type === "assessment" ? assessments?.assessments || [] : type === "user" ? users : [];

    if (tagsFilter && tagsFilter.length > 0) {
      let tags = tagsFilter.map((_item: any) => {
        return {
          key: _item?.id,
          title:
            type === "assessment"
              ? _item?.name
              : `${_item.email} (${_item?.first_name} ${_item?.last_name})`,
        };
      });
      returnOptions = [...returnOptions, ...tags];
    }
    return returnOptions;
  };

  const router = useRouter();
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  let defaultFilterInputs = {
    assessment: "all",
    user: '',
    order_by: "all",
    kind: "all",
    subject: "all"
  };

  const [formData, setFormData] = React.useState({ ...defaultFilterInputs });
  const handleFormData = (key: any, value: any) => {
    setFormData((prevData: any) => {
      return { ...prevData, [key]: value };
    });
  };
  React.useEffect(() => {
    if (query && query?.data) {
      setFormData(query?.data);
    }
  }, [query]);

  const handleSearch = () => {
    // handling the Url
    let queryStringArray = [];

    formData?.assessment != "all"
      ? queryStringArray.push(`assessment=${formData?.assessment}`)
      : ``;
    formData?.user != "all" ? queryStringArray.push(`user=${formData?.user}`) : ``;
    formData?.kind && formData?.kind != "all" ? queryStringArray.push(`kind=${formData?.kind}`) : ``;
    formData?.order_by ? queryStringArray.push(`order_by=${formData?.order_by}`) : ``;
    formData?.subject != "all" ? queryStringArray.push(`subject=${formData?.subject}`) : ``;
    if (queryStringArray && queryStringArray.length > 0) {
      let queryString: any = queryStringArray.toString();
      queryString = queryString.replace(/,/g, "&");
      handleSearchQuery({
        data: { ...formData },
        route: `?${queryString.length > 2 ? queryString : null}`,
        url: `&${queryString.length > 2 ? queryString : null}`,
      });
      router.replace(`/report${queryString.length > 2 ? `?${queryString}` : ``}`, undefined, {
        shallow: true,
      });
    } else {
      handleAlert(
        "warning",
        "Empty Search Filter",
        "Please select any fields to continue searching."
      );
    }
  };
  const handleClear = () => {
    setFormData({ ...defaultFilterInputs });
    handleSearchQuery({
      data: { ...defaultFilterInputs },
      route: ``,
      url: ``,
    });
    router.replace(`/report`, undefined, { shallow: true });
  };
  return (
    <div className="border border-gray-200 rounded-sm p-2">
      <div className="pb-1 text-gray-600 font-medium">Search Filter</div>
      <div className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-4 ">
        <div className="w-full ">
          <div className="text-sm text-dark-100 mb-1">Select Assessment type</div>
          <div className="w-full">
            <Select
              placeHolder="Select assessment type"
              options={assesmentOptions}
              selectedOptions={formData.kind ? [formData.kind] : null}
              handleOption={(_value: any, data: any) => {
                handleFormData("kind", _value[0]);
                mutate(mutateUrlAssessment, APIFetcher(`${mutateUrlAssessment}?kind=${_value[0]}`), false);
                handleFormData('assessment', 'all')
              }}
              multiple={false}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-sm text-dark-100 mb-1">Select Assessment</div>
          <div>
            <SearchFilter
              placeHolder="Select Assessment"
              options={renderFilterOptions("assessment")}
              selectedOptions={formData.assessment != null ? [formData.assessment] : null}
              handleOption={(_value: any, data: any) => {
                handleFormData("assessment", _value[0]);
              }}
              multiple={false}
            />
          </div>
        </div>

        <div className="w-full">
          <div className="text-sm text-dark-100 mb-1">Select User</div>
          <div>
            <SearchDropDownUser
              name="user"
              placeHolder="Select User"
              options={renderFilterOptions("user")}
              currentValue={formData?.user}
              selectedOptions={formData?.user != null ? [formData?.user] : null}
              mutateUrl={mutateUrl}
              handleValue={(value: any) => {
                handleFormData("user", value?.key);
              }}
            />
          </div>
        </div>

        <div className="w-full">
          <div className="text-sm text-dark-100 mb-1">Select Order</div>
          <div>
            <Select
              placeHolder="Select filter"
              options={filterOptions}
              selectedOptions={formData.order_by != null ? [formData.order_by] : null}
              handleOption={(_value: any, data: any) => {
                handleFormData("order_by", _value[0]);
              }}
              multiple={false}
            />
          </div>
        </div>
        {formData.kind === "PRACTICE_SHEET" || formData.kind === "SECTIONAL" || formData.kind === "MICRO" ?
          <div className="w-full">
            <div className="text-sm text-dark-100 mb-1">Select Subject</div>
            <div>
              <Select
                placeHolder="Select filter"
                options={subjectOptions}
                selectedOptions={formData.subject != null ? [formData.subject] : null}
                handleOption={(_value: any, data: any) => {
                  handleFormData("subject", _value[0]);
                }}
                multiple={false}
              />
            </div>
          </div>
          : null}
        <div className="flex gap-4 mt-auto">
          <div className="" >
            <Button size={"xs"} onClick={handleSearch}>
              Filter
            </Button>
          </div>
          <div>
            <Button variant="secondary" size={"xs"} onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFilter;
