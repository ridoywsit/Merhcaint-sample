import { Combobox } from '@headlessui/react';
import { matchSorter } from 'match-sorter';
import React from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { useThrottle } from 'react-use';
import { string } from 'zod';

interface SelectControllerProps extends UseControllerProps<any> {
  inputs: Array<{ id: string; value: string }>;
  placeholder?: string;
}

function useSearch(term: string, inputs: Array<{ id: string; value: string }>) {
  return React.useMemo(
    () =>
      term.trim() === ''
        ? null
        : matchSorter(inputs, term, {
            keys: ['id', 'value'],
          }),
    [term, inputs],
  );
}

const SelectController = ({
  inputs,
  placeholder,
  ...props
}: SelectControllerProps) => {
  const {
    field: { onChange, value, ...restField },
    fieldState: { error },
  } = useController(props);

  const [term, setTerm] = React.useState('');

  const handleChange = (val: string) => {
    onChange(val);
    setTerm(val);
  };
  const results = useSearch(term, inputs);

  return (
    <Combobox
      as="div"
      {...restField}
      value={value}
      onChange={handleChange}
      className=""
    >
      <div className="relative">
        <Combobox.Input
          onChange={(e) => setTerm(e.target.value)}
          className={` flex-1 input placeholder:text-merchaint-text-light-grey ${
            error ? 'input-error' : null
          }`}
          displayValue={(val) =>
            // @ts-ignore
            inputs.find((i) => i.id === val)?.value as string
          }
          autoComplete="off"
          placeholder={placeholder}
        />
        {results != null && results.length > 0 ? (
          <Combobox.Options className="absolute z-10 w-full py-3 bg-white border rounded-lg top-10 drop-shadow-btn-menu">
            {results.slice(0, 10).map((input, index) => {
              return (
                <Combobox.Option
                  className={({ active }) =>
                    `px-2 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer hover:bg-merchaint-grey-base  ${
                      active
                        ? 'bg-merchaint-grey-200 text-black'
                        : 'text-gray-900'
                    }`
                  }
                  key={index}
                  value={input.id}
                >
                  {input.value}
                </Combobox.Option>
              );
            })}
          </Combobox.Options>
        ) : null}
      </div>
    </Combobox>
  );
};

export default SelectController;
