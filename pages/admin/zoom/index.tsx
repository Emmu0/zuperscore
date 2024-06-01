import React, { useState } from "react";
import Container from "@components/Container";
import SubjectArchive from "@components/admin/subjects/SubjectArchive";
import SubjectCreateView from "@components/admin/subjects/create";
import Button from "@components/buttons";
import UserSchedule from "@components/user/UserSchedule";
import Dropdown from "@components/utilities/Dropdown";
import ConfigPopup from "@components/zoom@Config/ConfigPopup";
import AdminLayout from "@layouts/AdminLayout";
import { BinIcon, DotsVerticalIcon, PlusIcon } from "@ui/icons";
import Link from "next/link";
import { NextPage } from "next";

const ZoomIndex = () => {
  const seoMetaInformation = {
    title: "Zoom Page",
  };

  const [zoomPopup, setzoomPopup] = useState<any>(false);

  const popupHandler = (vl: any) => {
    setzoomPopup(vl);
  };
  return (
    <div>
      <Container meta={seoMetaInformation}>
        <AdminLayout padding={false}>
          <div className="py-5">
            <div className="container mx-auto px-5 flex justify-between items-center">
              <div className="text-2xl font-medium pb-1">Zoom</div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => popupHandler("admin")}
                >
                  <PlusIcon width="14" height="14" fill="#F3E4B1" /> Create Event
                </Button>
              </div>
            </div>

            <div className="mt-5">
              <UserSchedule type="admin" />
            </div>
          </div>
        </AdminLayout>
      </Container>
      {zoomPopup && <ConfigPopup zoomPopup={zoomPopup} popupHandler={popupHandler} />}
    </div>
  );
};

export default ZoomIndex;
