import React from "react";
// uuid
import { v4 as uuidV4 } from "uuid";
// components
import Button from "@components/ui/Button";
// api routes
import { ASSESSMENT_BULK_RESULT_DOWNLOAD_ENDPOINT } from "@constants/api-routes";
// api services
import { initializeXMLHttpRequest } from "@lib/services/xml.service";

const AssessmentResultBulkDownload = ({ assessment }: any) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);

  const downloadAttendanceCsv = (csvStr: string) => {
    let hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvStr);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${assessment?.name}_${uuidV4()}.csv`;
    hiddenElement.click();
  };

  // downloading all attendance details
  const initiateBulkDownload = async () => {
    setButtonLoader(true);
    let xmlHttp = initializeXMLHttpRequest(
      ASSESSMENT_BULK_RESULT_DOWNLOAD_ENDPOINT(assessment?.id)
    );
    const reqListener = (e: ProgressEvent) => {
      const target = e.currentTarget as XMLHttpRequest;
      downloadAttendanceCsv(target?.response);
    };
    xmlHttp.addEventListener("load", reqListener);
    xmlHttp.onerror = () => {
      alert("Error while downloading attendance details");
    };
    setButtonLoader(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={"primary"}
        size="xs"
        className="whitespace-nowrap"
        onClick={initiateBulkDownload}
        disabled={buttonLoader}
      >
        {buttonLoader ? "Downloading..." : "Download Results"}
      </Button>
    </div>
  );
};

export default AssessmentResultBulkDownload;
