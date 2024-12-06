import React from "react";
import "./priority-tag.css";

export const Yellow: React.FC = ({ children }) => {
  return <span className="priority-tag yellow">{children}</span>;
};

export const Green: React.FC = ({ children }) => {
  return <span className="priority-tag green">{children}</span>;
};

export const Blue: React.FC = ({ children }) => {
  return <span className="priority-tag blue">{children}</span>;
};

export const Red: React.FC = ({ children }) => {
  return <span className="priority-tag red">{children}</span>;
};
