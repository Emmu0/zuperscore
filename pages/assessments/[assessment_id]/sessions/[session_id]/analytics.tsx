import React from "react";
// next imports
import { NextPage } from "next";
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// components
import Container from "@components/Container";
import BarChart from "@components/users/assessment/result/analytics/BarChart";
import AssessmentResultHeader from "@components/users/assessment/result/Header";
// layout
import UserLayout from "@layouts/UserLayout";
// api-routes
import { ASSESSMENT_WITH_ID_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";

// chartJS
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

// recoil
import { useSetRecoilState } from "recoil";
import * as assessmentRecoil from "recoil/assessments/index";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Test Analytics",
};

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const AssessmentAnalytics: NextPage = () => {
  const router = useRouter();
  const { assessment_id } = router.query as { assessment_id: any };

  // recoil
  const recoilAssessmentSet = useSetRecoilState(assessmentRecoil.assessmentSelector);

  const { data: assessmentDetail, error: assessmentDetailError } = useSWR(
    assessment_id ? [ASSESSMENT_WITH_ID_ENDPOINT(parseInt(assessment_id)), assessment_id] : null,
    APIFetcher
  );

  // updating assessments
  React.useEffect(() => {
    if (assessmentDetail) recoilAssessmentSet(assessmentDetail);
  }, [recoilAssessmentSet, assessmentDetail]);

  return (
    <Container meta={seoMetaInformation}>
      <UserLayout>
        <div className="mx-auto mt-8 max-w-6xl">
          <AssessmentResultHeader resultScreen={"analytics"} />
          <div className="flex justify-between w-full my-8 align-center">
            <div className="font-bold text-xl ">Questions vs Time</div>
            <div className="flex  align-center justify-center" style={{ accentColor: "#721154" }}>
              <div className="">
                <input type="checkbox" className="bg-[#721154]" />
              </div>
              <div className="ml-1 text-[16px] text-[#721154]">Compare to topper</div>
            </div>
          </div>
          <BarChart />
          <div className=" justify-between w-full mb- align-center">
            <div className="relative max-h-max  my-8 mx-auto">
              <div className="font-bold text-xl my-4">Test Scores</div>
              <div className="flex flex-row border border-[#E2E2E2] py-6 px-4 mb-3">
                <div className="basis-4/5 mr-5">
                  <div className="flex flex-row bg-[#F4ECF1] p-4">
                    <div className="basis-3/4">
                      <div className="text-xs text-black font-bold">Target Test Date</div>
                      <div className="text-lg font-bold">16 July 2020</div>
                    </div>
                    <div className="basis-1/4 text-right">
                      <div className="text-xs text-black font-bold">Target Test Score</div>
                      <div className="text-lg font-bold">1300</div>
                    </div>
                  </div>
                  <div className="basis-5/6">{/* <Line options={options2} data={data2} /> */}</div>
                </div>
                <div className="basis-1/5 ml-2">
                  {/* {datasetLine.map((item, index) => {
                    return (
                      <div className="flex  items-center pt-3" key={index}>
                        <button
                          className="h-[12px] w-[24px]  mr-1"
                          style={{ backgroundColor: item.backgroundColor }}
                        ></button>
                        <span className="text-[12px] font-[500]">{item.label}</span>
                      </div>
                    );
                  })} */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="font-[600] text-xl pb-3">Graph Name</div>
            <div className="flex flex-row ">
              <div className="basis-1/2 border border-[#E2E2E2]">
                <div className="relative  w-4/5 mx-auto  ">
                  {/* <Pie id="chart" data={datapie} options={option3} /> */}
                </div>
              </div>

              <div className="basis-1/2  flex-col space-between mx-3">
                <div className="flex flex-row h-30 border-2 rounded-sm py-4 mb-12">
                  <div className="basis-1/2 border-r-2 px-2 py-2 font-md font-bold pt-3">
                    800
                    <br></br>
                    Metric
                  </div>
                  <div className="basis-1/2 px-2 py-2 font-md font-bold">
                    234
                    <br></br>
                    Metric
                  </div>
                </div>
                <div className="flex flex-row h-30 border-2 rounded-sm pt-4  mb-12">
                  <div className="basis-1/2 border-r-2 px-2 py-2 font-md font-bold">
                    800
                    <br></br>
                    Metric
                  </div>
                  <div className="basis-1/2 px-2 py-4 font-md font-bold">
                    234
                    <br></br>
                    Metric
                  </div>
                </div>
                <div className="flex flex-row h-30 py-4 border-2 rounded-sm">
                  <div className="basis-1/2 border-r-2 px-2 py-2 font-md font-bold">
                    800
                    <br></br>
                    Metric
                  </div>
                  <div className="basis-1/2 px-2 py-2 font-md font-bold">
                    234
                    <br></br>
                    Metric
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </Container>
  );
};

export default authWrapper(AssessmentAnalytics, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
