import classNames from 'classnames';
import { useSelect } from 'downshift';
import React from 'react';
import { FiArrowUp, FiChevronUp } from 'react-icons/fi';

import Button, { useButtonClass } from 'components/Button';

type Props = {
  items: string[];
  itemToString?: (value: string | null) => string;
  onSelect: (value: string) => void;
  defaultValue?: string;
  wrapperClass?: string;
  buttonText?: string;
  showSelectedValue?: boolean;
  value?: string;
};

function defaultItemsToString(item: string | null) {
  return item ? item.toLowerCase() : '';
}

const GenericSelectMenu = ({
  items,
  onSelect,
  defaultValue,
  wrapperClass,
  buttonText = 'Select',
  showSelectedValue = false,
  itemToString = defaultItemsToString,
  value,
}: Props) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    closeMenu,
    openMenu,
    selectItem,
  } = useSelect({
    items: items,
    itemToString,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSelect(selectedItem);
      }
    },
  });
  const buttonClass = useButtonClass({
    size: 'base',
    variant: 'white',
    className: 'w-full flex justify-between capitalize',
  });

  React.useEffect(() => {
    if (value) {
      selectItem(value);
    } else if (value === 'ALL') {
      selectItem('');
    } else {
      selectItem('');
    }
  }, [selectItem, value]);

  return (
    <div>
      <div className={wrapperClass}>
        <button className={buttonClass} {...getToggleButtonProps({})}>
          {showSelectedValue && selectedItem != null ? (
            <span>{selectedItem || buttonText}</span>
          ) : (
            <span>{buttonText}</span>
          )}
          <FiChevronUp
            className={classNames(
              'w-5 h-5 text-inherit transform transition-transform ml-2',
              {
                'rotate-180': !isOpen,
              },
            )}
          />
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className="absolute z-20 py-2 overflow-x-hidden overflow-y-auto bg-white rounded shadow-md"
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={classNames(
                highlightedIndex === index && 'bg-slate-100',
                selectedItem === item && 'font-bold',
                'px-4 py-2 cursor-pointer min-w-[164px]',
              )}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              <span className="capitalize">
                {item.replaceAll('_', ' ').toLowerCase()}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GenericSelectMenu;
