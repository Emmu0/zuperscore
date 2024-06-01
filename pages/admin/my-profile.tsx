import React from "react";
import Image from "next/image";
// swr
import useSWR from "swr";
// react hook form
import { useForm } from "react-hook-form";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import AdminHeader from "@components/admin/AdminHeader";
import ProfileForm from "@components/profile";
import Button from "@components/buttons";
import ImageUploadModal from "@components/ui/ImageUploadModal";
// api routes
import { USER_WITH_ID_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
import { User } from "@lib/services/users.service";
// cookie
import { getAuthenticationToken, setAuthenticationToken } from "@lib/cookie";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
// icons
import { PencilIcon } from "@heroicons/react/solid";

type Inputs = {
  id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  about: string;
  dob: any;
  user_timezone: string;
  whatsapp_number: any;

  address: string;
  city: string;
  state: string;
  country: string;
  pincode: any;

  parent_1_name: string;
  parent_1_email: string;
  parent_1_mobile: any;

  parent_2_name: string;
  parent_2_email: string;
  parent_2_mobile: any;

  school: string;
  school_name: string;
  school_address: string;
  school_city: string;
  school_state: string;
  school_country: string;
  year_of_passing: number;
  school_board: string;
  school_type: string;
  school_curriculum: string;
  profile_img: string;

  test_results: {
    id: string;
    type: string;
    date: string;
    month: string;
    year: string;
    kind: number;
    score: {
      english: number;
      math: number;
      reading: number;
      science: number;
    };
  }[];
  // reference
  source_type: string;
  source_name: string;
  company_name: string;

  starting_scores: {
    id: string;
    type_of_test: string;
    date_of_test: string;
    score: number;
  }[];

  student_comments: string;
  parents_comments: string;
  sso_comments: string;
  bd_comments_enquiry: string;

  help: {
    id: string;
    type_of_user: string;
    comments: string;
  }[];

  prep_navigation: {
    id: string;
    start_date: string;
    end_date: string;
    time_taken: number;
    reason: string;
  }[];

  tent_calender_core_prep_duration: string;
  tent_no_of_hours_per_week: number;
  tent_duration_of_core_prep: number;
  tent_no_of_hours_for_solving_assignments: number;
  tent_time_invested_in_p_s_avg_weekly_time_investment: number;
  first_ptm_date: string;
  tent_date_for_first_ceo_presentation_for_the_parents: string;
  // Second attempt
  cpea_target_date: string;
  mock_test_start_date_target_date: string;
  target_no_of_mock_tests: number;
  target_no_of_ps: number;
  recommended_no_of_workshops_and_strategy_classes: string;
  target_test_date: string;
  avg_weekly_time_invested: string;
  avg_weekly_test_analysis_time: number;
  no_of_review_doubts_and_other_misc_sessions: number;
  target_score_range_for_the_first_attempt: number;
  grand_total: number;
};

let defaultValues: Inputs = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  about: "",
  dob: "",
  user_timezone: "",
  whatsapp_number: "",
  profile_img: "",

  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",

  parent_1_name: "",
  parent_1_email: "",
  parent_1_mobile: "",

  parent_2_name: "",
  parent_2_email: "",
  parent_2_mobile: "",

  school: "",
  school_name: "",
  school_address: "",
  school_state: "",
  school_city: "",
  school_country: "",
  year_of_passing: 0,
  school_board: "",
  school_type: "",
  school_curriculum: "",

  test_results: [],
  // reference
  source_type: "",
  source_name: "",
  company_name: "",

  starting_scores: [],

  student_comments: "",
  parents_comments: "",
  sso_comments: "",
  bd_comments_enquiry: "",

  help: [],

  prep_navigation: [],

  tent_calender_core_prep_duration: "",
  tent_no_of_hours_per_week: 0,
  tent_duration_of_core_prep: 0,
  tent_no_of_hours_for_solving_assignments: 0,
  tent_time_invested_in_p_s_avg_weekly_time_investment: 0,
  first_ptm_date: "",
  tent_date_for_first_ceo_presentation_for_the_parents: "",
  // Second attempt
  cpea_target_date: "",
  mock_test_start_date_target_date: "",
  target_no_of_mock_tests: 0,
  target_no_of_ps: 0,
  recommended_no_of_workshops_and_strategy_classes: "",
  target_test_date: "",
  avg_weekly_time_invested: "",
  avg_weekly_test_analysis_time: 0,
  no_of_review_doubts_and_other_misc_sessions: 0,
  target_score_range_for_the_first_attempt: 0,
  grand_total: 0,
};

interface IUserProfile {
  mutateUrl: any;
}
const seoMetaInformation = {
  title: "Profile",
};

const AdminProfileDetail: React.FC<IUserProfile> = ({ mutateUrl }: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);
  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };
  const [uploadMode, setUploadMode] = React.useState<any>(false);
  const [user, setUser] = React.useState<any>();
  const [displayPage, setDisplayPage] = React.useState<any>(null);

  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user) {
      setUser(userToken?.user);
    }
  }, [setUser]);

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

  const { data: userDetail, error: userDetailError } = useSWR(
    user && user?.id ? [USER_WITH_ID_ENDPOINT(user?.id), `user-${user?.id}`] : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (userDetail && reset) {
      reset({
        id: userDetail?.id || "",
        first_name: userDetail?.first_name,
        last_name: userDetail?.last_name,
        email: userDetail?.email || "",
        about: userDetail?.about || "",
        dob: userDetail?.dob || "",
        user_timezone: userDetail?.user_timezone || "",
        whatsapp_number: userDetail?.whatsapp_number || "",
        profile_img: userDetail?.profile_img || "",

        address: userDetail?.address || "",
        city: userDetail?.city || "",
        state: userDetail?.state || "",
        country: userDetail?.country || "",
        pincode: userDetail?.pincode || "",

        parent_1_name: userDetail?.parent_1_name || "",
        parent_1_email: userDetail?.parent_1_email || "",
        parent_1_mobile: userDetail?.parent_1_mobile || "",

        parent_2_name: userDetail?.parent_2_name || "",
        parent_2_email: userDetail?.parent_2_email || "",
        parent_2_mobile: userDetail?.parent_2_mobile || "",

        school: userDetail?.school || "",
        school_name: userDetail?.school_name || "",
        school_address: userDetail?.school_address || "",
        school_city: userDetail?.school_city || "",
        school_state: userDetail?.school_state || "",
        school_country: userDetail?.school_country || "",
        year_of_passing: userDetail?.year_of_passing || "",
        school_board: userDetail?.school_board || "",
        school_type: userDetail?.school_type || "",
        school_curriculum: userDetail?.school_curriculum || "",

        // reference
        source_type: userDetail?.referred_by?.source_type || "",
        source_name: userDetail?.referred_by?.source_name || "",
        company_name: userDetail?.referred_by?.company_name || "",
      });
    }
  }, [userDetail, reset]);

  const validations = {
    first_name: {},
    last_name: {},
    email: {},
    about: {},
    dob: {},
    timezone: {},
    address: {},
    country: {},
    state: {},
    city: {},
    pincode: {},
    parent_1_name: {},
    parent_1_email: {},
    parent_1_mobile: {},
    parent_2_name: {},
    parent_2_email: {},
    parent_2_mobile: {},
    school: {},
    school_name: {},
    school_address: {},
    school_city: {},
    year_of_passing: {},
    school_board: {},
    school_type: {},
  };

  const onSubmit = async (data: any) => {
    let payload: any = {
      id: data?.id,
      first_name: data?.first_name.trim() || "",
      last_name: data?.last_name.trim() || "",
      email: data?.email.trim() || "",
      about: data?.about.trim() || "",
      whatsapp_number: data?.whatsapp_number.trim() || "",
      profile_img: data?.profile_img.trim() || "",

      dob: data?.dob.trim() || null,
      user_timezone: data?.user_timezone.trim() || "",

      address: data?.address.trim() || "",
      city: data?.city.trim() || "",
      state: data?.state.trim() || "",
      country: data?.country.trim() || "",
      pincode: data?.pincode.trim() || "",

      parent_1_name: data?.parent_1_name.trim() || "",
      parent_1_email: data?.parent_1_email.trim() || "",
      parent_1_mobile: data?.parent_1_mobile.trim() || "",

      parent_2_name: data?.parent_2_name.trim() || "",
      parent_2_email: data?.parent_2_email.trim() || "",
      parent_2_mobile: data?.parent_2_mobile.trim() || "",

      school: data?.school.trim() || "",
      school_name: data?.school_name?.trim() || "",
      school_city: data?.school_city.trim() || "",
      school_state: data?.school_state.trim() || "",
      school_country: data?.school_country.trim() || "",
      year_of_passing: data?.year_of_passing.trim() || "",
      school_curriculum: data?.school_curriculum.trim() || "",
      school_type: data?.school_type.trim() || "",

      test_results: data?.test_results || [],
      referred_by: {
        source_type: data?.source_type,
        source_name: data?.source_name,
        company_name: data?.company_name,
      },
    };

    return User.update(payload)
      .then((response) => {
        handleAlert("success", "Success.", "User updated successfully.");
      })
      .catch((error) => {
        handleAlert("error", "Something went wrong.", "Error updating user. Please try again.");
      });
  };
  const handleImageUpload = (url: any) => {
    setValue("profile_img", url);
    let payload = {
      id: userDetail.id,
      profile_img: url
    }
    return User.update(payload)
      .then((response) => {
        let userToken: any = getAuthenticationToken();
        userToken = userToken ? JSON.parse(userToken) : null;
        if (userToken) {
          userToken.user.profile_img = url;
        }
        setAuthenticationToken(userToken);
        handleAlert("success", "Success.", "User profile picture updated.");
      })
      .catch((error) => {
        handleAlert("error", "Something went wrong.", "Error updating user. Please try again.");
      });
  }
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <AdminHeader title="My Profile" />

        {userDetail && !userDetailError ? (
          <div className="space-y-4">
            <div className="border border-gray-200 bg-white rounded-sm shadow-sm p-3 px-4">
              <div className="flex gap-4">
                <div className="flex">
                  <div className="mr-4 relative h-full w-32">
                    <div className="w-full h-full">
                      <Image
                        src={watch("profile_img") ? watch("profile_img") : "/default_image.png"}
                        className="rounded-lg"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div
                      onClick={() => setUploadMode(true)}
                      className="absolute w-5 h-5 bg-red-400 rounded-full bottom-0 right-0 text-white p-1 cursor-pointer"
                    >
                      <PencilIcon />
                    </div>
                  </div>
                  <ImageUploadModal
                    size={"lg"}
                    modal={uploadMode}
                    handleModal={setUploadMode}
                    handleImage={handleImageUpload}
                    context="users"
                  />
                </div>
                <div className="w-full space-y-1">
                  <div className="flex gap-2 items-center">
                    <div className="text-gray-600 text-sm">Name:</div>
                    <div className="font-medium">
                      {userDetail?.first_name} {userDetail?.last_name}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-gray-600 text-sm">Email:</div>
                    <div className="font-medium">{userDetail?.email ? userDetail.email : "-"}</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-gray-600 text-sm">DOB:</div>
                    <div className="font-medium">{userDetail?.dob ? userDetail.dob : "-"}</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-gray-600 text-sm">Address:</div>
                    <div className="font-medium">
                      {userDetail?.address ? userDetail.address : "-"}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-gray-600 text-sm">Timezone:</div>
                    <div className="font-medium">
                      {userDetail?.user_timezone ? userDetail.user_timezone : "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 bg-white rounded-sm shadow-sm p-3 px-4 space-y-6">
              <ProfileForm
                register={register}
                setValue={setValue}
                watch={watch}
                validations={validations}
                errors={errors}
                control={control}
                reset={reset}
                userDetail={userDetail}
                getValues={getValues}
                setDisplayPage={setDisplayPage}
              />
              {!displayPage ? (
                <Button size="sm" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">Loading...</div>
        )}
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminProfileDetail, {
  authRequired: true,
  role: ["admin", "tutor", "typist", "manager"],
});
