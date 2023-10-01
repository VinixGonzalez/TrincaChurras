import React from "react";

function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-center bg-cover bg-churras"></div>
      <div className="gradient-overlay">{children}</div>
    </div>
  );
}

export default CustomLayout;
