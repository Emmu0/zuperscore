import React from "react";
// swr
import { mutate } from "swr";
// components
import Button from "@components/ui/Button";
import ReactHookInput from "@components/forms/ReactHookInput";
// api services
import { APIFetcher } from "@lib/services";

interface IAdminUserSearch {
  mutateUrl: any;
  register: any;
  errors: any;
  setValue: any;
  handleSubmit: any;
  setQuery: any;
}

const AdminUserSearch: React.FC<IAdminUserSearch> = ({ register, errors, setValue, handleSubmit,setQuery, mutateUrl }) => {

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [buttonClearLoader, setButtonClearLoader] = React.useState(false);

  const handleSearchUser = async (data: any) => {
    if (data?.search.length >= 3) {
      setButtonLoader(true);
      setQuery(data?.search)
      await mutate(mutateUrl, APIFetcher(`${mutateUrl}&search=${data?.search}`), false);
      setButtonLoader(false);
    } else {
      alert("Search term must be at least 3 characters long.");
    }
  };
  const handleClearSearch = async () => {
    setButtonClearLoader(true);
    setValue("search", "");
    setQuery("")
    await mutate(mutateUrl, APIFetcher(mutateUrl), false);
    setButtonClearLoader(false);
  };

  return (
    <div className="flex items-center gap-2">
      <div>
        <ReactHookInput
          label=""
          type="text"
          name="search"
          placeholder={`Search by email`}
          register={register}
          error={errors.search}
          disabled={buttonLoader || buttonClearLoader}
        />
      </div>
      <div className="">
        <Button
          size="xs"
          onClick={handleSubmit(handleSearchUser)}
          disabled={buttonLoader || buttonClearLoader}
        >
          {buttonLoader ? "Processing..." : "Search"}
        </Button>
      </div>

      <div>
        <Button
          size="xs"
          variant="secondary"
          onClick={handleClearSearch}
          disabled={buttonLoader || buttonClearLoader}
        >
          {buttonClearLoader ? "Processing..." : "Clear"}
        </Button>
      </div>
    </div>
  );
};

export default AdminUserSearch;
