import classNames from 'classnames';
import { useSelect } from 'downshift';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface SelectProps extends UseControllerProps<any> {
  placeholder?: string;
  arrayValues: string[];
}

const SelectInput = ({ placeholder, arrayValues, ...props }: SelectProps) => {
  const { field, fieldState } = useController(props);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    onSelectedItemChange: (item) => {
      field.onChange(item.selectedItem);
    },
    items: arrayValues,
    itemToString(item) {
      return item ? item : '';
    },
    initialSelectedItem: props.defaultValue,
  });

  return (
    <div className="relative">
      <div className="flex border rounded border-merchaint-grey-base focus:ring-1 focus:ring-merchaint-teal-base">
        <button
          aria-label="toggle menu"
          className={classNames(
            { 'input-error': fieldState.error },
            'border-0 input focus:ring-0 text-left',
          )}
          type="button"
          {...getToggleButtonProps()}
        >
          <span>{selectedItem ? selectedItem : null}</span>
        </button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen && arrayValues.length > 0 && (
          <div className="absolute z-20 mt-[2px] w-full bg-white border border-[#E2E8F0] rounded-lg shadow py-2 max-h-72 overflow-y-auto">
            {arrayValues.map((item, index) => (
              <li
                className={classNames(
                  highlightedIndex === index && 'bg-merchaint-grey-base',
                  selectedItem === item && '',
                  'px-2 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer bg-white',
                )}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                <span className="capitalize">{item}</span>
              </li>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
};

export default SelectInput;
