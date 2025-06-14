"use client";

import React, { JSX } from "react";

export type NodeType = {
  tag: keyof JSX.IntrinsicElements;
  classNames?: string;
  content?: string;
  children?: string | NodeType[];
  [key: string]: any;
};

type ProjectDataParserProps = {
  data: string; // stringified JSON
  replacements?: string; // stringified JSON
};

const ProjectDataParser: React.FC<ProjectDataParserProps> = ({
  data,
  replacements = "{}",
}) => {
  let parsedData: NodeType[];
  let parsedReplacements: Record<string, string | NodeType[]> = {};

  try {
    parsedData = JSON.parse(data);
  } catch (e) {
    console.error("Invalid JSON in `data` passed to ProjectDataParser:", e);
    return <div>Error parsing layout data</div>;
  }

  try {
    parsedReplacements = JSON.parse(replacements);
  } catch (e) {
    console.error(
      "Invalid JSON in `replacements` passed to ProjectDataParser:",
      e
    );
    return <div>Error parsing replacement data</div>;
  }

  // ✨ Utility to convert \n to <br /> inside strings
  const renderStringWithLineBreaks = (text: string) =>
    text
      .split("\n")
      .flatMap((part, idx, arr) =>
        idx < arr.length - 1 ? [part, <br key={`br-${idx}`} />] : [part]
      );

  const renderNode = (
    node: NodeType,
    key: string | number
  ): React.ReactNode => {
    const { tag: Tag, classNames, content, children, ...rest } = node;

    const resolvedProps: Record<string, any> = {
      className: classNames || "",
    };

    // Resolve props like src, alt, href, etc.
    for (const [propKey, propValue] of Object.entries(rest)) {
      if (
        typeof propValue === "string" &&
        parsedReplacements[propValue] &&
        typeof parsedReplacements[propValue] === "string"
      ) {
        resolvedProps[propKey] = parsedReplacements[propValue];
      } else {
        resolvedProps[propKey] = propValue;
      }
    }

    // Handle content
    if (content) {
      const replacement = parsedReplacements[content];
      if (typeof replacement === "string") {
        return (
          <Tag key={key} {...resolvedProps}>
            {renderStringWithLineBreaks(replacement)}
          </Tag>
        );
      }
      return (
        <Tag key={key} {...resolvedProps}>
          {renderStringWithLineBreaks(content)}
        </Tag>
      );
    }

    // Handle string-based children (e.g., "__cards-map-1__")
    if (typeof children === "string") {
      const replacement = parsedReplacements[children];
      if (typeof replacement === "string") {
        return (
          <Tag key={key} {...resolvedProps}>
            {renderStringWithLineBreaks(replacement)}
          </Tag>
        );
      } else if (Array.isArray(replacement)) {
        return (
          <Tag key={key} {...resolvedProps}>
            {replacement.map((child, idx) =>
              renderNode(child, `${key}-${idx}`)
            )}
          </Tag>
        );
      } else {
        return (
          <Tag key={key} {...resolvedProps}>
            {renderStringWithLineBreaks(children)}
          </Tag>
        );
      }
    }

    // Handle children as array of NodeType
    if (Array.isArray(children)) {
      return (
        <Tag key={key} {...resolvedProps}>
          {children.map((child, idx) => renderNode(child, `${key}-${idx}`))}
        </Tag>
      );
    }

    // Fallback
    return <Tag key={key} {...resolvedProps} />;
  };

  return <>{parsedData.map((node, idx) => renderNode(node, idx))}</>;
};

export default ProjectDataParser;
