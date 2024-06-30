import { Field, Label, Switch } from "@headlessui/react";

export const Toggle = ({
  enabled,
  setEnabled,
  label1,
  label2,
}: {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  label1: string;
  label2: string;
}) => {
  return (
    <Field className="flex gap-2 items-center">
      <Label className="text-sm font-bold">{label2}</Label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-green-500"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
      <Label className="text-sm font-bold">{label1}</Label>
    </Field>
  );
};
