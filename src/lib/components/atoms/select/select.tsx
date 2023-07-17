"use client";

import type { SelectProps } from "./select.type";
import type { ChangeEvent } from "react";
import { forwardRef, useEffect, useState } from "react";
import { RiVipDiamondLine } from "react-icons/ri";
import clsx from "clsx";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  premiumIndicator,
  disabled,
  options,
  label,
  value: valueProps,
  onChange, ...props
}, ref) => {
  const [value, setValue] = useState(valueProps);
  const randomId = Math.random().toString(36).substring(7);

  const containerClass = clsx(
    "group flex items-center justify-between bg-gray-800 rounded-md p-2",
    className
  );

  const inputClass = clsx(
    "w-full bg-transparent outline-none",
    {
      "text-white": !disabled,
      "text-gray-400 cursor-not-allowed": disabled,
      "appearance-none": premiumIndicator
    }
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setValue(event.target.value);
    onChange?.(event);
  };

  useEffect(() => {
    setValue(valueProps);
  }, [valueProps]);

  return (
    <>
      {label && (
        <label htmlFor={randomId} className="mb-1 text-sm text-gray-400">
          {label}
        </label>
      )}

      <div className={containerClass}>
        <select
          ref={ref}
          id={randomId}
          placeholder={props.placeholder}
          disabled={disabled || premiumIndicator}
          className={inputClass}
          value={value}
          onChange={handleChange}
          {...props}
        >
          {options?.map(({ value, label, disabled }) => (
            <option
              key={value}
              className="bg-gray-800"
              value={value}
              disabled={disabled}>
              {label}
            </option>
          ))}
        </select>

        {premiumIndicator && (
          <div className="flex items-center justify-center rounded-lg ml-2">
            <RiVipDiamondLine className="text-gray-400 -ml-5 group-hover:text-yellow-500 transition-colors duration-300 ease-in-out" />
          </div>
        )}
      </div>
    </>
  );
});

Select.displayName = "Select";