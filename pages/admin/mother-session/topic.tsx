import Container from '@components/Container';
import MotherSessionModal from '@components/admin/mother_session/MotherSessionModal';
import MotherSessionTable from '@components/admin/mother_session/MotherSessionTable';
import Button from '@components/buttons';
import AdminLayout from '@layouts/AdminLayout';
import { PlusIcon } from '@ui/icons';
import React, { useState } from 'react'

const topic = () => {
  const seoMetaInformation: any = {
    title: "Motehr Session",
  };
  const [popup, setpopup] = useState<any>();

  const popupHandler: any = (vl: any) => {
    setpopup(vl);
  };
  return (
    <div>
      <Container meta={seoMetaInformation}>
        <AdminLayout padding={false}>
          <div className="py-5">
            <div className="container mx-auto px-5 flex justify-between items-center">
              <div className="text-2xl font-medium pb-1">Topic</div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => popupHandler("topic")}
                >
                  <PlusIcon width="14" height="14" fill="#F3E4B1" /> Create Topic
                </Button>
              </div>
            </div>

            <div className="mt-5">
            <MotherSessionTable type="topic" />
                        </div>
          </div>
        </AdminLayout>
      </Container>
    {popup && <MotherSessionModal popup={popup} popupHandler={popupHandler}/>}
    </div>
  )
}

export default topic