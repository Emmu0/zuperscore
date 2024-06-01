import React from "react";
// next imports
import Link from "next/link";
// components
import Button from "@components/ui/Button";

const RequestSiteAccess = () => {
  return (
    <div>
      <div>Your account access is restricted. Please contact administrator.</div>
      <div>
        <Link href={`/`}>
          <a>
            <Button type="button" size="xs">
              Go to Home page
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default RequestSiteAccess;
