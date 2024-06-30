import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";
import { FC, useState } from "react";

const languages = [
  { id: 1, name: "Swati" },
  { id: 2, name: "Southern Sotho" },
  { id: 3, name: "English" },
  { id: 4, name: "Swahili" },
  { id: 5, name: "Xhosa" },
  { id: 6, name: "Zulu" },
  { id: 7, name: "Tswana" },
  { id: 8, name: "Northern Sotho" },
  { id: 9, name: "Afrikaans" },
];

export type DropdownProps = {
  selection: string;
  onChange: (value: string) => void;
};

export const Dropdown: FC<DropdownProps> = ({ selection, onChange }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ id: number; name: string } | null>(
    languages.find((language) => language.name === selection) ?? null
  );

  const filteredData =
    query === ""
      ? languages
      : languages.filter((language) => {
          return language.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div
      className="
        w-full
        rounded-lg
        border-none
        bg-white/5
        py-1.5
        pr-8
        pl-3
        text-sm/6
        text-black
        focus:outline-none
        data-[focus]:outline-2
        data-[focus]:-outline-offset-2
        data-[focus]:outline-white/25
    "
    >
      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          onChange(value?.name || "");
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border bg-slate-300 py-1.5 pr-8 pl-3 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(value: { id: number; name: string } | null) =>
              value?.name || ""
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <IoChevronDown className="size-4 fill-slate-500 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredData.map((language) => (
            <ComboboxOption
              key={language.id}
              value={language}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <FaCircleCheck className="invisible size-4 fill-slate-500 group-data-[selected]:visible" />
              <div className="text-xs/6 text-black">{language?.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};
