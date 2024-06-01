import React from "react";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import { Controller } from "react-hook-form";
import SearchFilter from "@components/filters/SelectSearchFilter";

interface ISectionForm {
  register: any;
  setValue: any;
  watch: any;
  validations: any;
  errors: any;
  control: any;
  userDetail: any;
  reset: any;
  getValues?: any;
  setDisplayPage: any,
  disabled?: boolean;
}

const SchoolDetailsForm: React.FC<ISectionForm> = ({
  register,
  setValue,
  watch,
  validations,
  reset,
  getValues,
  errors,
  control,
  userDetail,
  setDisplayPage,
  disabled = false,
}) => {
  const typeOfSchoolOptions = [
    { key: "boarding", title: "Boarding" },
    { key: "day-school", title: "Day school" },
    { key: "weekly-boarding", title: "Weekly Boarding" },
  ];

  const schoolCurriculum = [
    { key: "ib", title: "IB" },
    { key: "gcse", title: "GCSE" },
    { key: "cbse", title: "CBSE" },
    { key: "isc", title: "ISC" },
    { key: "state-board", title: "State Board" },
    { key: "american-curriculum", title: "American Curriculum" },
    { key: "ap-curriculum", title: "AP Curriculum" },
    { key: "level", title : "Level"},
  ];

const schoolList=[
  { key: "any-other", title: "Any other" },
  { key:"American School of Dubai",  title: "American School of Dubai" },
  { key:"Indus Intl. School", title: "Indus Intl. School" },
  { key:"Aditya Birla Academy", title: "Aditya Birla Academy" },
  { key:"American Embassy School", title: "American Embassy School" },
  { key:"The Sri Ram School Moulsari", title: "The Sri Ram School Moulsari" },
  { key:"Bombay internationals school", title: "Bombay internationals school" },
  { key:"Markham College", title: "Markham College" },
  { key:"American School of Doha", title: "American School of Doha" },
  { key:"Aditya Birla World Academy", title: "Aditya Birla World Academy" },
  { key:"The British School", title: "The British School" },
  { key:"Stamford American Intl School", title: "Stamford American Intl School" },
  { key:"Sri Ram School Moulsari", title: "Sri Ram School Moulsari" },
  { key:"Nahar International School", title: "Nahar International School" },
  { key:"Sherborne Senior school", title: "Sherborne Senior school" },
  { key:"Sat Paul Mittal School", title: "Sat Paul Mittal School" },
  { key:"United world college, south east Asia", title: "United world college, south east Asia" },
  { key:"Bishop O'DOWD school", title: "Bishop O'DOWD school" },
  { key:"The Cathedral and John Connon School", title: "The Cathedral and John Connon School" },
  { key:"Dubai American Academy",title: "Dubai American Academy" },
  { key:"Colegio Franklin Delano Roosevelt", title: "Colegio Franklin Delano Roosevelt" },
  { key:"P.S.B.B.S.S School,Nungambakkam", title: "P.S.B.B.S.S School,Nungambakkam" },
  { key:"The Americal School of Dubai", title: "The Americal School of Dubai" },
  { key:"Tenakill Middle School", title: "Tenakill Middle School" },
  { key:"Aditya birla world academy", title: "Aditya birla world academy" },
  { key:"Singapore international school", title: "Singapore international school" },
  { key:"Pathways world school of aravali", title: "Pathways world school of aravali" },
  { key:"Modern High School", title: "Modern High School" },
  { key:"Hill Spring Intl School", title: "Hill Spring Intl School" },
  { key:"Indus international school", title: "Indus international school" },
  { key:"JBCN", title: "JBCN" },
  { key:"Singapore International School", title: "Singapore International School" },
  { key:"WELLINGTON COLLEGE", title: "WELLINGTON COLLEGE" },
  { key:"BD Somani International School", title: "BD Somani International School" },
  { key:"NAFL", title: "NAFL" },
  { key:"Neeraj Modi", title: "Neeraj Modi" },
  { key:"Thomas Jefferson Hgh school", title: "Thomas Jefferson Hgh school" },
  { key:"The Cathedral and John Connoc", title: "The Cathedral and John Connoc" },
  { key:"The British School", title: "The British School" },
  { key:"Worcester Academy", title: "Worcester Academy" },
  { key:"Oundle School", title: "Oundle School" },
  { key:"Markham College", title: "Markham College" },
  { key:"Heritage xperiential learning School", title: "Heritage xperiential learning School" },
  { key:"The Cathedral and John Connon School", title: "The Cathedral and John Connon School" },
  { key:"B.D Somani Intl", title: "B.D Somani Intl" },  
]
  React.useEffect(() => {
    setDisplayPage(null)
  },[])
return (
    <div className="space-y-4">
      <div className="border border-gray-200 bg-white">
        <div className="border-gray-200 p-3 px-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <Controller
                control={control}
                name={`school`}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <div className="w-full">
                    <div className="text-sm text-dark-100 mb-1">School name</div>
                    <div>
                      <SearchFilter
                        placeHolder="Select school name"
                        options={schoolList}
                        selectedOptions={value ? [value] : null}
                        handleOption={(_value: any, data: any) => {
                          onChange(_value[0]);
                        }}
                        multiple={false}
                        position="left"
                        disabled={schoolList.length > 0 ? disabled : true}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
            {watch("school") === "any-other" && (
              <>
                <div className="w-full">
                  <ReactHookInput
                    label="Name"
                    type="text"
                    name="school_name"
                    register={register}
                    validations={validations.school}
                    error={errors.school}
                    disabled={disabled}
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="City"
                    type="text"
                    name="school_city"
                    register={register}
                    validations={validations.school_city}
                    error={errors.school_city}
                    disabled={disabled}
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="State"
                    type="text"
                    name="school_state"
                    register={register}
                    validations={validations.school_state}
                    error={errors.school_state}
                    disabled={disabled}
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="Country"
                    type="text"
                    name="school_country"
                    register={register}
                    validations={validations.school_country}
                    error={errors.school_country}
                    disabled={disabled}
                  />
                </div>
              
              </>
            )}
            <div className="w-full">
              <ReactHookInput
                label="Year of Passing"
                type="number"
                name="year_of_passing"
                register={register}
                validations={validations.year_of_passing}
                error={errors.year_of_passing}
                disabled={disabled}
              />
            </div>
            <div className="w-full">
              <Controller
                control={control}
                name={`school_type`}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <div className="w-full">
                    <div className="text-sm text-dark-100 mb-1">Type of school</div>
                    <div>
                      <SearchFilter
                        placeHolder="Select Type of school"
                        options={typeOfSchoolOptions}
                        search={false}
                        selectedOptions={value ? [value] : null}
                        handleOption={(_value: any, data: any) => {
                          onChange(_value[0]);
                        }}
                        multiple={false}
                        position="left"
                        disabled={typeOfSchoolOptions.length > 0 ? disabled : true}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="w-full">
            <Controller
                control={control}
                name={`school_curriculum`}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <div className="w-full">
                    <div className="text-sm text-dark-100 mb-1">School Curriculum</div>
                    <div>
                      <SearchFilter
                        placeHolder="Select School Curriculum"
                        options={schoolCurriculum}
                        search={false}
                        selectedOptions={value ? [value] : null}
                        handleOption={(_value: any, data: any) => {
                          onChange(_value[0]);
                        }}
                        multiple={false}
                        position="left"
                        disabled={typeOfSchoolOptions.length > 0 ? disabled : true}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SchoolDetailsForm;
