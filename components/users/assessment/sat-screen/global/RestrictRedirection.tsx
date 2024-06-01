import React from "react";
// next imports
import { useRouter } from "next/router";
// recoil
import { useRecoilState } from "recoil";
// components
import Modal from "@components/ui/Modal";
import Button from "@components/ui/Button";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const RestrictRedirection = ({ assessment_id, session_id, section_id }: any) => {
  const router = useRouter();

  const [routeRestriction, recoilRouteRestriction] = useRecoilState(
    assessmentRecoil.routeRestrictionSelector
  );

  const defaultVideoUrl: { currentUrl: string | null; navigateUrl: string | null } = {
    currentUrl: null,
    navigateUrl: null,
  };
  const [touchedUrl, setTouchedUrl] = React.useState(defaultVideoUrl);

  const [show, setShow] = React.useState(false);
  const handleShow = (currentUrl: string, navigateUrl: string) => {
    setShow(true);
    setTouchedUrl({ ...defaultVideoUrl, currentUrl: currentUrl, navigateUrl: navigateUrl });
  };

  const handleLeavePage = () => {
    if (touchedUrl?.navigateUrl != null) {
      router.replace(`${touchedUrl?.navigateUrl}`, undefined, { shallow: true });
      setShow(false);
      setTouchedUrl(defaultVideoUrl);
      recoilRouteRestriction(false);
    }
  };

  const handleStayInThisPage = () => {
    if (touchedUrl?.currentUrl != null) {
      router.push(
        section_id
          ? {
              pathname: touchedUrl?.currentUrl,
              query: { section_id: section_id },
            }
          : {
              pathname: touchedUrl?.currentUrl,
            },
        undefined,
        { shallow: true }
      );
      setShow(false);
      setTouchedUrl(defaultVideoUrl);
      recoilRouteRestriction(false);
    }
  };

  const routeChangeStart = React.useCallback(
    (url: any, { shallow }: any) => {
      if (routeRestriction) {
        let currentUrl = `/assessment/${assessment_id}/${session_id}`;
        handleShow(currentUrl, url);
        router.events.emit("routeChangeError");
        throw "routeChange aborted.";
      } else {
        setShow(false);
        return undefined;
      }
    },
    [router.events, routeRestriction]
  );

  const eventListenerRouteChangeStart = (event: any) => {
    event.preventDefault();
    return (event.returnValue = "Are you sure you want to exit?");
  };

  React.useEffect(() => {
    if (routeRestriction === true) {
      router.events.on("routeChangeStart", routeChangeStart);
      window.addEventListener("beforeunload", eventListenerRouteChangeStart, { capture: true });
    }
    if (routeRestriction === false) {
      router.events.off("routeChangeStart", routeChangeStart);
      window.removeEventListener("beforeunload", eventListenerRouteChangeStart, { capture: true });
    }

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      window.removeEventListener("beforeunload", eventListenerRouteChangeStart, { capture: true });
    };
  }, [router.events, routeChangeStart, routeRestriction]);

  return (
    <>
      <Modal
        title={`Redirect restriction`}
        modal={show}
        setModal={handleStayInThisPage}
        onClose={() => {}}
        bottomNavigation={false}
      >
        Are you sure you want to quit the test?
        <div className="mt-5 flex gap-3 justify-end items-center">
          <Button variant="secondary" size="sm" onClick={handleLeavePage}>
            Leave the test
          </Button>
          <Button size="sm" onClick={handleStayInThisPage}>
            Continue the test
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RestrictRedirection;
