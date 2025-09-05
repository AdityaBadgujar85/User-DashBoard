import React from "react";

function EditUserIcon({ size = 28, strokeWidth = 2, className = "" }) {
  const s = { width: size, height: size };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

export default EditUserIcon;
