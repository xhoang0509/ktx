import React from "react";

const HomeLabel: React.FC<{ label: string }> = ({ label }) => {
  return <div className="text-primary text-xl my-4 font-semibold">{label}</div>;
};

export default HomeLabel;
