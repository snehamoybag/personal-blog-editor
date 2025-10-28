import type { ReactElement } from "react";
import Markdown from "react-markdown";
import Tittle700 from "./titles/Tittle700";
import TagPreview from "./TagPreview";
import AuthorAndDate from "./AuthorAndDate";
import useUser from "../hooks/useUser";
import Tittle400 from "./titles/Title400";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface EditorPreviewProps {
  title?: string;
  content?: string;
  tags?: string[];
  coverImgUrl?: string;
}

const EditorPreview = ({
  title = "",
  content = "",
  tags = [],
  coverImgUrl = "",
}: Readonly<EditorPreviewProps>): ReactElement => {
  const { user } = useUser();

  if (!user) {
    throw new Error("Please login to preview a blog.");
  }

  return (
    <article className="grid gap-y-8 pb-12 border-b-1 border-neutral-700">
      <header className="grid gap-y-4">
        <Tittle700 as="h1">{title}</Tittle700>
        <AuthorAndDate author={user} date={{ createdAt: new Date() }} />
        {coverImgUrl && <img src={coverImgUrl} alt="cover image" />}
      </header>

      <section className="wrap-anywhere hyphens-auto whitespace-pre-wrap">
        <h2 className="sr-only">content:</h2>

        <Markdown
          components={{
            // map headers
            h1: (props) => (
              <h2 className="text-2xl font-bold sm:text-3xl" {...props} />
            ),

            h2: (props) => (
              <h2 className="text-2xl font-bold sm:text-3xl" {...props} />
            ),

            h3: (props) => (
              <h3 className="text-xl font-bold sm:text-2xl" {...props} />
            ),

            h4: (props) => (
              <h4 className="text-lg font-bold sm:text-xl" {...props} />
            ),

            h5: (props) => (
              <h5 className="text-base font-bold sm:text-lg" {...props} />
            ),

            h6: (props) => <h6 className="text-base font-bold" {...props} />,

            // code block
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  children={
                    typeof children === "string"
                      ? String(children).replace(/\n$/, "")
                      : ""
                  }
                  language={match[1]}
                  style={gruvboxDark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </section>

      <footer>
        <div className="flex gap-2">
          <Tittle400>Tags: </Tittle400>

          <ul className="flex flex-wrap items-center gap-2">
            {tags.map((tagName) => (
              <li key={tagName}>
                <TagPreview name={tagName} />
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </article>
  );
};

export default EditorPreview;
