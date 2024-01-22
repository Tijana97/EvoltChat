import React, { PropsWithChildren } from "react";

export const ScreenWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{ height: "calc(100% - 56px)", width: "100%", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};
