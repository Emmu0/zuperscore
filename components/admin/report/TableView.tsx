import React from "react";
// next import
import { useRouter } from "next/router";
import Link from "next/link";
// components
import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import TableViewResults from "./TableViewResults";
// common
import { dateTimePreview } from "@constants/common";
// icon
import { PencilAltIcon } from "@heroicons/react/solid";
// user assessment service
import { UserAssessmentSessions } from "@lib/services/user.assessment.service";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

interface IReportTableView {
  sessions?: any;
  users?: any;
  cursor?: any;
}

const EditScaledScore = ({ session, placeholder, onClose, fieldName }: any) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [score, setScore] = React.useState("");
  const handleSave = () => {
    setButtonLoader(true);
    let data = { ...session?.data };
    data[fieldName] = score;
    session.data = data;

    UserAssessmentSessions.update({ id: session.id, data: data })
      .then((res) => {
        setButtonLoader(false);
        onClose(session);
      })
      .catch((e: any) => {
        console.log("this is error", e);
        setButtonLoader(false);
      });
  };

  return (
    <div className="flex items-center gap-3 border border-gray-400 px-1 rounded-md">
      <div className="w-full">
        <input
          type="number"
          name="score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder={placeholder}
          className="border-0 py-2 focus:outline-none px-1 my-auto w-full bg-white"
        />
      </div>
      <div>
        <Button size="xs" onClick={handleSave} disabled={buttonLoader}>
          {buttonLoader ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

const ReportTableView: React.FC<IReportTableView> = ({ sessions, users, cursor }) => {
  const router = useRouter();
  const currentUrl = router.asPath;
  const [sessionList, setSessionList] = React.useState(sessions);
  const [modalSettings, setModalSettings] = React.useState<any>();

  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user) {
      setUser(userToken?.user);
    }
  }, [setUser]);

  React.useEffect(() => {
    const updatedSessionList = sessions.map((session: any) => {
      if (Array.isArray(session?.section_analysis_data)) {
        session["math_analysis_data"] = session.section_analysis_data.filter(
          (data: any) => data.group_by === "math"
        );
        session["rw_analysis_data"] = session.section_analysis_data.filter(
          (data: any) => data.group_by === "reading_and_writing"
        );
      } else {
        session["math_analysis_data"] = [];
        session["rw_analysis_data"] = [];
      }
      return session;
    });

    // console.log('updatedSessionList', updatedSessionList)
    setSessionList(updatedSessionList);
  }, [sessions]);

  const handleClose = (session: any) => {
    const updatedSessionList = sessionList.map((_session: any, index: any) => {
      if (_session.id == session.id) {
        return { ..._session, data: session.data };
      }
      return _session;
    });
    setSessionList(updatedSessionList);
    setModalSettings({ ...modalSettings, state: false });
  };

  const renderUserName = (user_id: any) => {
    let user: any = user_id;

    if (users && users.length > 0) {
      let currentUser = users.find((_user: any) => _user.id === user_id);
      if (currentUser) user = `${currentUser?.first_name} ${currentUser?.last_name}`;
    }
    return user;
  };

  console.log("sessionList", sessionList);

  return (
    <div className="w-full h-full p-3 pt-0 overflow-auto relative">
      <table className="w-full border border-collapse whitespace-nowrap">
        <thead className="border bg-gray-100 h-10 text-violet-100 sticky top-0">
          <tr className="border text-left">
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase text-center">#</td>
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase text-center">Id</td>
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase">Name of the student</td>
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase">Test Name</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Started At</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Completed At</td>
            <td className="border px-3 py-1 min-w-[120px] text-sm uppercase">RW MD1</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">RW MD2</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Math MD1</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Math MD2</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Scaled Score RW</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Scaled Score Math</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Total Score</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Analysis</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">
              Analysis Completed At
            </td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">
              Download/View Analysis
            </td>
            <td className="border px-3 py-1 min-w-[120px] text-sm uppercase">Result</td>
          </tr>
        </thead>

        <tbody>
          {sessionList &&
            sessionList.map((_session: any, sessionIndex: any) => {
              return (
                <tr key={_session.id} className="text-sm">
                  <td className="min-w-[80px] border text-center">{sessionIndex + 1}</td>
                  <td className="min-w-[80px] border text-center px-3 py-2">
                    {_session.id || "-"}
                  </td>
                  <td className="min-w-[80px] border px-3 py-2">
                    {renderUserName(_session.user) || "-"}
                  </td>
                  <td className="min-w-[80px] border px-3 py-2">
                    {_session.assessment_detail?.name || "-"}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.started_at ? dateTimePreview(_session?.started_at) : "-"}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.submitted_at ? dateTimePreview(_session?.submitted_at) : "-"}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.rw_analysis_data?.[0] ? (
                      <div className="text-violet-100 font-medium">
                        {_session?.rw_analysis_data?.[0]?.results?.correct_answers || 0} out of{" "}
                        {_session?.rw_analysis_data?.[0]?.results?.total_no_of_questions || 0}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.rw_analysis_data?.[1] ? (
                      <div className="text-violet-100 font-medium">
                        {_session?.rw_analysis_data?.[1]?.results?.correct_answers || 0} out of{" "}
                        {_session?.rw_analysis_data?.[1]?.results?.total_no_of_questions || 0}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.math_analysis_data?.[0] ? (
                      <div className="text-violet-100 font-medium">
                        {_session?.math_analysis_data?.[0]?.results?.correct_answers || 0} out of{" "}
                        {_session?.math_analysis_data?.[0]?.results?.total_no_of_questions || 0}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.math_analysis_data?.[1] ? (
                      <div className="text-violet-100 font-medium">
                        {_session?.math_analysis_data?.[1]?.results?.correct_answers || 0} out of{" "}
                        {_session?.math_analysis_data?.[1]?.results?.total_no_of_questions || 0}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2 relative text-violet-100 font-medium">
                    {_session?.data?.scaled_rw || "-"}
                    <div
                      className={`h-6 w-6 absolute right-1 top-3 rounded-full border border-violet-100 p-1 hover:bg-violet-100 hover:text-white ${
                        user?.role === "tutor" && "hidden"
                      } `}
                      onClick={() =>
                        setModalSettings({
                          size: "sm",
                          title: "Scaled Score RW",
                          bottomNavigation: false,
                          state: true,
                          children: (
                            <EditScaledScore
                              session={_session}
                              placeholder={"Scaled Score RW"}
                              fieldName={"scaled_rw"}
                              onClose={handleClose}
                            />
                          ),
                        })
                      }
                    >
                      <PencilAltIcon />
                    </div>
                  </td>
                  <td className="min-w-[120px] border px-3 py-2 relative text-violet-100 font-medium">
                    {_session?.data?.scaled_math || "-"}
                    <div
                      className={`h-6 w-6 absolute right-1 top-3 rounded-full border border-violet-100 p-1 hover:bg-violet-100 hover:text-white ${
                        user?.role === "tutor" && "hidden"
                      } `}
                      onClick={() =>
                        setModalSettings({
                          size: "sm",
                          title: "Scaled Score Math",
                          bottomNavigation: false,
                          state: true,
                          children: (
                            <EditScaledScore
                              session={_session}
                              fieldName={"scaled_math"}
                              placeholder={"Scaled Score Math"}
                              onClose={handleClose}
                            />
                          ),
                        })
                      }
                    >
                      <PencilAltIcon />
                    </div>
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {" "}
                    {_session?.total_correct} out of {_session?.total_questions}{" "}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.is_reviewed == true ? (
                      <div className="text-xs px-1.5 py-1 rounded-lg font-medium inline-block bg-green-600 text-white">
                        {_session?.state}
                      </div>
                    ) : (
                      <div className="text-xs px-1.5 py-1 rounded-lg font-medium inline-block bg-red-600 text-white">
                        UNANALYSED
                      </div>
                    )}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.is_reviewed == true ? dateTimePreview(_session?.updated_at) : "-"}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    <Button
                      variant="secondary"
                      type="button"
                      size="xs"
                      onClick={() =>
                        setModalSettings({
                          title: "View Analysis",
                          size: "full",
                          state: true,
                          bottomNavigation: false,
                          children: <TableViewResults session_id={_session.id} />,
                        })
                      }
                    >
                      View Analysis
                    </Button>
                  </td>
                  <td className="border px-3 py-2">
                    {_session.is_submitted ? (
                      <>
                        <Link
                          href={{
                            pathname: `/assessments/${_session?.assessment}/sessions/${_session?.id}`,
                            query: { prevUrl: currentUrl },
                          }}
                          shallow
                        >
                          <a target="_blank">
                            <Button variant="secondary" type="button" size="xs">
                              View Results
                            </Button>
                          </a>
                        </Link>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {modalSettings && (
        <Modal
          size={modalSettings?.size}
          setModal={(data: any) => setModalSettings({ ...modalSettings, state: data })}
          title={modalSettings?.title}
          modal={modalSettings?.state}
          bottomNavigation={modalSettings?.bottomNavigation}
          onClose={() => setModalSettings({ ...modalSettings, state: false })}
        >
          {modalSettings.children}
        </Modal>
      )}
    </div>
  );
};

export default ReportTableView;
