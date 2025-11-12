import React from "react";

const InputField = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="font-medium text-gray-700">{label}</label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={onChange}
        placeholder="Ingrese precio"
        className="border border-gray-300 rounded-xl p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default InputField;