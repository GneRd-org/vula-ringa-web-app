import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { map } from "lodash";
import { ReactElement, JSXElementConstructor, ReactNode, Key } from "react";

export const Tabs = ({
  tabs,
}: {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
}) => {
  return (
    <TabGroup
      as="section"
      className="w-full flex flex-col gap-4"
      defaultIndex={0}
    >
      <TabList className="flex gap-4 px-2">
        {map(tabs, ({ title }) => (
          <Tab
            className="rounded-full w-1/2 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-darkGreen/10 data-[hover]:bg-darkGreen/5 data-[selected]:data-[hover]:bg-darkGreen/10 data-[focus]:outline-1 data-[focus]:outline-darkGreen"
            key={title}
          >
            {title}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {map(tabs, ({ content }, index) => (
          <TabPanel key={index}>{content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};
