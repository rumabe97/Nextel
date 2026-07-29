import { Fragment } from 'react';

export interface RichTextProps {
  /** Copy where `**like this**` marks a bold run. */
  text: string;
}

// Splitting on a capturing group interleaves the segments: even positions are plain text,
// odd positions are what sat between the asterisks. Keys come from a running character
// offset so they stay unique even when the same word appears twice in one line.
//
// A plain function rather than inline in the component: the running offset is a local
// mutation, which the React Compiler rightly refuses to allow inside a render body.
function toParts(text: string) {
  let offset = 0;

  return text.split(/\*\*(.+?)\*\*/g).map((segment, position) => {
    const key = `${offset}-${segment}`;

    offset += segment.length;

    return { bold: position % 2 === 1, key, segment };
  });
}

// Copy in the dictionaries is plain text so translators never touch JSX, but several lines
// emphasise a phrase mid-sentence. This renders that one convention and nothing else — it is
// deliberately not a Markdown parser.
export function RichText({ text }: RichTextProps) {
  return (
    <Fragment>
      {toParts(text).map(part => (part.bold ? <strong key={part.key}>{part.segment}</strong> : <Fragment key={part.key}>{part.segment}</Fragment>))}
    </Fragment>
  );
}
