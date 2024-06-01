import React from "react";

interface IAdminHeader {
  title?: string;
  description?: string;
  button?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  margin?: boolean;
}

const AdminHeader: React.FC<IAdminHeader> = ({ title, description, button, margin = true }) => {
  return (
    <div className={`flex items-center justify-between gap-2 ${margin ? `mb-2` : ``} `}>
      <div>
        {title && <h1 className="text-2xl font-medium pb-1">{title}</h1>}
        {description && <p className="font-light text-dark-100 w-90">{description}</p>}
      </div>
      {button && <>{button}</>}
    </div>
  );
};

export default AdminHeader;
