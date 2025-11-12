import React from "react";

const ResultDisplay = ({ label, value }) => {
  return (
    <div className="flex justify-between p-2 border-b">
      <span className="font-medium">{label}</span>
      <span className="text-gray-700 font-semibold">L {value.toFixed(2)}</span>
    </div>
  );
};

export default ResultDisplay;