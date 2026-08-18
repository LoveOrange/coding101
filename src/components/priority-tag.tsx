import React, { type PropsWithChildren } from "react";
import "./priority-tag.css";

type PriorityTagProps = PropsWithChildren;

export const Yellow: React.FC<PriorityTagProps> = ({ children }) => {
  return <span className="priority-tag yellow">{children}</span>;
};

export const Green: React.FC<PriorityTagProps> = ({ children }) => {
  return <span className="priority-tag green">{children}</span>;
};

export const Blue: React.FC<PriorityTagProps> = ({ children }) => {
  return <span className="priority-tag blue">{children}</span>;
};

export const Red: React.FC<PriorityTagProps> = ({ children }) => {
  return <span className="priority-tag red">{children}</span>;
};
