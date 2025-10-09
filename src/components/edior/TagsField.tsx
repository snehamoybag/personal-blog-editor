import {
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import TagItem from "./TagItem";
import FieldWrapper from "../form-elemets/FieldWrapper";
import Input from "../form-elemets/Input";
import type { FieldError } from "../../types/FieldError.type";
import ErrorLabel from "../form-elemets/ErrorLabel";

interface TagsFieldProps {
  value: string[];
  setValue: (newValue: string[]) => void;
  error?: FieldError;
}

export default function TagsField({
  value,
  setValue,
  error,
}: Readonly<TagsFieldProps>): ReactElement {
  const [inputValue, setInputValue] = useState("");
  const [minTagCharLength, maxTagCharLength] = [3, 55];

  const handleInputChagne: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const enteredValue = e.target.value;

    // do not allow repeated underscores
    if (enteredValue.endsWith("_") && inputValue.endsWith("_")) {
      return;
    }

    // only allow alphanumeric characters and undescores
    const validCharRegex = /^[0-9a-zA-Z_]+$/;

    if (validCharRegex.test(enteredValue) || enteredValue === "") {
      setInputValue(enteredValue);
    }
  };

  // adds new tags on enter and comma
  const handleInputKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "Enter" && e.key !== ",") {
      return;
    }

    let latestValue = inputValue.trim();

    // remove comma
    if (latestValue.endsWith(",")) {
      latestValue = inputValue.slice(0, inputValue.length - 1);
    }

    // trim undescores
    if (latestValue.startsWith("_")) {
      latestValue = latestValue.slice(1);
    }

    if (latestValue.endsWith("_")) {
      latestValue = latestValue.slice(0, latestValue.length - 1);
    }

    // tirm white if any left after comma and underscore removal
    latestValue.trim();

    if (
      latestValue.length < minTagCharLength ||
      latestValue.length > maxTagCharLength
    ) {
      return;
    }

    // do not add duplicate tags
    if (value.includes(latestValue)) {
      setInputValue(""); // clear input
      return;
    }

    const newTags = [...value, latestValue];
    setValue(newTags);
    setInputValue(""); // clear input
  };

  const handleTagRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    setValue(value.filter((tag) => tag !== e.currentTarget.value));
  };

  const tagItemElems = value.map((tag, index) => (
    <li key={tag + index}>
      <TagItem key={tag} name={tag} onRemove={handleTagRemove} />
    </li>
  ));

  return (
    <div>
      <ol role="list" className="flex flex-wrap itmes-center gap-2">
        {tagItemElems}
      </ol>

      <FieldWrapper className="mt-4">
        <label htmlFor="tags" className="sr-only">
          tags:
        </label>
        <Input
          id="tags"
          name="tags"
          placeholder="Add tags..."
          value={inputValue}
          minLength={minTagCharLength}
          maxLength={maxTagCharLength}
          onChange={handleInputChagne}
          onKeyUp={handleInputKeyUp}
          required={value.length < 1} // required till no tag is selected
          className={error ? "border-red-300" : ""}
        />

        {error && <ErrorLabel htmlFor="tags">{error.msg}</ErrorLabel>}
      </FieldWrapper>
    </div>
  );
}
