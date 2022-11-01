import classNames from 'classnames';
import startsWith from 'lodash/startsWith';
import React from 'react';
import {
  useController,
  UseControllerProps,
  UseFormSetError,
} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface Props extends UseControllerProps<any> {
  containerClass?: string;
  inputClass?: string;
  buttonClass?: string;
  dropdownClass?: string;
  searchClass?: string;
}

const PhoneNumberInput = ({
  containerClass,
  inputClass,
  buttonClass,
  dropdownClass,
  searchClass,
  ...props
}: Props) => {
  const { field, fieldState } = useController(props);

  return (
    <PhoneInput
      isValid={(inputNumber, country, countries) => {
        const isValid = countries.some((country: any) => {
          return (
            startsWith(inputNumber, country.dialCode) ||
            startsWith(country.dialCode, inputNumber)
          );
        });
        if (!isValid) {
          field.onChange(null);
        }
        return isValid;
      }}
      onBlur={field.onBlur}
      onChange={field.onChange}
      value={field.value}
      inputProps={{
        name: field.name,
      }}
      containerClass={classNames(
        fieldState.error
          ? 'focus:!border-merchaint-red-base focus:ring-merchaint-red-base'
          : '',
        containerClass,

        'flex rounded focus:ring-1 focus:ring-merchaint-teal-base',
      )}
      inputClass={classNames(
        inputClass,
        'border  text-sm rounded block py-2.5 w-full placeholder:text-merchaint-text-light-grey focus-visible:border-merchaint-teal-base focus:outline-none focus:ring-1 focus:ring-merchaint-teal-base pl-12 telinput',
        fieldState.error
          ? 'focus:!border-merchaint-red-base focus:ring-merchaint-red-base'
          : '',
      )}
      buttonClass={classNames(
        'text-left',
        buttonClass,
        fieldState.error
          ? '!border-merchaint-red-base focus:ring-merchaint-red-base'
          : '',
      )}
      dropdownClass={classNames('text-left', dropdownClass)}
      searchClass={classNames('text-left', searchClass)}
    />
  );
};

export default PhoneNumberInput;
