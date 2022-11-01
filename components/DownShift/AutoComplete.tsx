import classNames from 'classnames';
import { useCombobox } from 'downshift';
import { matchSorter } from 'match-sorter';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { HiX } from 'react-icons/hi';

import Spinner from 'components/Spinner';

interface AutoCompleteObjectArrayInputProps extends UseControllerProps<any> {
  placeholder?: string;
  arrayValues: Array<Record<string, string>>;
  displayPath: string;
  valuePath: string;
  inputClass?: string;
}

type UseSearchInput = {
  term: string;
  inputs: Record<string, string>[];
  displayPath: string;
  valuePath: string;
};

function search({ term, inputs, displayPath, valuePath }: UseSearchInput) {
  return matchSorter(inputs, term, {
    keys: [displayPath],
  });
}

export function AutoCompleteObjectArrayInput({
  placeholder,
  arrayValues,
  displayPath,
  valuePath,
  inputClass,
  ...props
}: AutoCompleteObjectArrayInputProps) {
  const { field, fieldState } = useController(props);
  const normalizedDefaultValue = React.useMemo(() => {
    if (props.defaultValue == null) return props.defaultValue;
    const defaultValue = arrayValues.find(
      (item) => item[valuePath] === props.defaultValue,
    )?.[displayPath];
    if (defaultValue == null) return props.defaultValue;
    const splitValue = defaultValue.split('_');
    if (splitValue.length > 1) {
      return splitValue.join(' ');
    } else {
      return props.defaultValue;
    }
  }, [arrayValues, displayPath, props.defaultValue, valuePath]);
  const [items, setItems] = React.useState(() => arrayValues);
  const memoValue = React.useMemo(() => {
    return field.value;
  }, [field.value]);
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
    openMenu,
    closeMenu,
    inputValue,
    setInputValue,
  } = useCombobox<Record<string, string> | null | undefined>({
    onSelectedItemChange: ({ inputValue, selectedItem }) => {
      const value = selectedItem ? selectedItem[valuePath] : null;
      field.onChange(value);
    },
    onInputValueChange({ inputValue, selectedItem }) {
      const searchInputs = search({
        term: inputValue ?? '',
        inputs: arrayValues,
        displayPath,
        valuePath,
      }).filter((item) => item[displayPath] !== inputValue);

      if (inputValue != null) {
        const splitInputValue = inputValue.split(' ');

        if (splitInputValue.length > 1) {
          const normalizedInputValue = splitInputValue.join('_');
          const item = arrayValues.find(
            (item) =>
              item[valuePath] === normalizedInputValue ||
              item[displayPath] === normalizedInputValue,
          );

          if (item) {
            field.onChange(item[valuePath]);
          } else {
            field.onChange(null);
          }
        } else {
          const item = arrayValues.find(
            (item) =>
              item[valuePath] === inputValue ||
              item[displayPath] === inputValue,
          );
          if (item) {
            field.onChange(item[valuePath]);
          } else {
            field.onChange(null);
          }
        }
      }
      setItems(searchInputs);
    },
    items,
    itemToString(item) {
      if (item == null) return '';
      return item[displayPath]
        ? item[displayPath].split('_').join(' ')
        : item[valuePath];
    },
  });
  React.useEffect(() => {
    if (selectItem === field.value) return;
    selectItem(arrayValues.find((item) => item[valuePath] === field.value));
  }, [arrayValues, selectItem, valuePath, field.value]);

  return (
    <div
      className={classNames(
        fieldState.error ? 'border-0' : '',
        'focus:ring-1 focus:ring-merchaint-teal-base',
      )}
    >
      <div
        className={classNames(
          fieldState.error ? 'border-0' : 'border',
          'flex gap-1 border rounded relative',
        )}
        {...getComboboxProps()}
      >
        <input
          className={classNames(
            fieldState.error ? 'input__v2--error' : 'border-transparent',
            'input__v2 focus:ring-0',
            inputClass,
          )}
          {...getInputProps({
            onClick: () => {
              // setItems(arrayValues)
              openMenu();
            },
            placeholder: placeholder,
          })}
        />

        {selectedItem || inputValue ? (
          <button
            aria-label="clear selection"
            className="absolute right-0 px-2 top-2.5"
            type="button"
            onClick={() => {
              selectItem(null);
              setInputValue('');
              field.onChange(null);
            }}
            tabIndex={-1}
          >
            <HiX className="w-5 h-5 text-gray-400" />
          </button>
        ) : null}
      </div>

      <ul {...getMenuProps()} className="">
        {isOpen && items.length > 0 && (
          <div className="absolute z-20 mt-[2px] w-full bg-white border border-[#E2E8F0] rounded-lg shadow py-2 max-h-72 overflow-y-auto">
            {items.map((item, index) => (
              <li
                className={classNames(
                  highlightedIndex === index && 'bg-merchaint-grey-base',
                  selectedItem === item && '',
                  'px-2 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer bg-white',
                )}
                key={`${item[displayPath]}${index}`}
                {...getItemProps({
                  item,
                  index,
                  onClick: () => closeMenu(),
                })}
              >
                <span className="capitalize">
                  {item[displayPath].split('_').join(' ')}
                </span>
              </li>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}

interface AutoCompleteArrayInput extends UseControllerProps<any> {
  placeholder?: string;
  arrayValues: string[];
  loading?: boolean;
  spinnerClass?: string;
}

type SearchArrayInput = {
  term: string;
  inputs: string[];
};

function searchArray({ term, inputs }: SearchArrayInput) {
  return matchSorter(inputs, term, {});
}

export function AutoCompleteArrayInput({
  placeholder,
  arrayValues,
  loading,
  spinnerClass,
  ...props
}: AutoCompleteArrayInput) {
  const { field, fieldState } = useController(props);

  const [items, setItems] = React.useState(() => arrayValues);
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
    openMenu,
    closeMenu,
    inputValue,
    setInputValue,
  } = useCombobox<string | null | undefined>({
    onSelectedItemChange: ({ inputValue, selectedItem }) => {
      const value = selectedItem ? selectedItem : null;
      field.onChange(value);
    },
    onInputValueChange({ inputValue, selectedItem }) {
      const searchInputs = searchArray({
        term: inputValue ?? '',
        inputs: arrayValues,
      }).filter((item) => item !== inputValue);
      setItems(searchInputs);
      if (inputValue == null) {
        field.onChange(null);
        return;
      }
      if (arrayValues.includes(inputValue)) {
        field.onChange(inputValue);
      }
    },
    items,
    itemToString(item) {
      if (item == null) return '';
      return item ? item.split('_').join(' ') : item;
    },
  });
  React.useEffect(() => {
    selectItem(arrayValues.find((item) => item === field.value));
  }, [arrayValues, field.value, selectItem]);

  return (
    <div
      className={classNames(
        fieldState.error ? 'border-0' : '',
        'focus:ring-1 focus:ring-merchaint-teal-base',
      )}
    >
      <div
        className={classNames(
          fieldState.error ? 'border-0' : 'border',
          'flex border rounded relative',
        )}
        {...getComboboxProps()}
      >
        <input
          className={classNames(
            fieldState.error
              ? 'input-error focus:ring-1 focus:ring-merchaint-red-base'
              : 'border-transparent ',
            'input focus:ring-0',
          )}
          {...getInputProps({
            onClick: () => {
              // setItems(arrayValues)
              openMenu();
            },
            placeholder: placeholder,
          })}
        />

        {selectedItem || (inputValue && !loading) ? (
          <button
            aria-label="clear selection"
            className="absolute right-0 px-2 top-2.5"
            type="button"
            onClick={() => {
              selectItem(null);
              field.onChange(null);
              setInputValue('');
            }}
            tabIndex={-1}
          >
            <HiX className="w-5 h-5 text-gray-400" />
          </button>
        ) : null}
        {loading ? (
          <span className="absolute right-0 px-2 top-2.5">
            <Spinner className={spinnerClass} />
          </span>
        ) : null}
      </div>

      <ul {...getMenuProps()} className="">
        {isOpen && items.length > 0 && (
          <div className="absolute z-20 mt-[2px] w-full bg-white border border-[#E2E8F0] rounded-lg shadow py-2 max-h-72 overflow-y-auto">
            {items.map((item, index) => (
              <li
                className={classNames(
                  highlightedIndex === index && 'bg-merchaint-grey-base',
                  selectedItem === item && '',
                  'px-2 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer bg-white',
                )}
                key={`${item}`}
                {...getItemProps({
                  item,
                  index,
                  onClick: () => closeMenu(),
                })}
              >
                <span className="capitalize">{item.split('_').join(' ')}</span>
              </li>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}
