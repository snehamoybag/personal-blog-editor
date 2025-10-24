import { useEffect, type ChangeEventHandler, type ReactElement } from "react";
import useDataFetcher from "../../hooks/useDataFetcher";
import LoadingSpinner from "../LoadingSpinner";
import getApiUrl from "../../libs/getApiUrl";

interface TagSelectOptionsProps {
  name: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

const apiUrl = getApiUrl();

export default function TagSelectOptions({
  name,
  onChange,
  className = "",
}: Readonly<TagSelectOptionsProps>): ReactElement {
  const { isLoading, data, error, fetcher } = useDataFetcher();
  const searchedTags = data && data.tags ? (data.tags as string[]) : [];

  useEffect(() => {
    if (!name) {
      return;
    }

    const url = `${apiUrl}/tags/?name=${name}&limit=5&offset=0`;
    void fetcher(url, { mode: "cors", method: "GET" });
  }, [name, fetcher]);

  if (isLoading) {
    return (
      <div
        className={`flex items-center gap-2 p-4 border-1 border-neutral-700 rounded-lg shadow-lg ${className}`}
      >
        <LoadingSpinner />
        <p>Searching tags...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p
        className={`text-red-300 p-4 border-1 border-neutral-700 rounded-lg shadow-lg ${className}`}
      >
        Failed to load tags
      </p>
    );
  }

  if (searchedTags.length) {
    return (
      <select
        id="searched-tags"
        size={searchedTags.length}
        multiple={true}
        onChange={onChange}
        className={`appearance-none border-1 border-neutral-700 rounded-lg shadow-lg overflow-auto ${className}`}
      >
        {searchedTags.map((tag) => (
          <option
            key={tag}
            value={tag}
            className="clickable p-4 border-b-1 border-b-neutral-700 last-of-type:border-none hover:bg-neutral-700 checked:bg-neutral-700 checked:opacity-75"
          >
            {tag}
          </option>
        ))}
      </select>
    );
  }

  return <></>;
}
