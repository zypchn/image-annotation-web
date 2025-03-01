import React from "react";

const PageHeader = ({
  title,
  gradientFrom = "#4cc9f0",
  gradientTo = "#4361ee",
  className = "mb-5",
}) => {
  return (
    <div className={`row ${className}`}>
      <div className="col-12">
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "16px",
            padding: "20px 30px",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
