import React from "react";
import "./priority-tag.css";

export const HighPriorityTag: React.FC = ({ children }) => {
  return <span className="priority-tag priority-high">{children}</span>;
};

export const MediumPriorityTag: React.FC = ({ children }) => {
  return <span className="priority-tag priority-medium">{children}</span>;
};

export const LowPriorityTag: React.FC = ({ children }) => {
  return <span className="priority-tag priority-low">{children}</span>;
};
