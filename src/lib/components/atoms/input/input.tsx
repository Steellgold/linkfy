"use client";

import type { InputProps } from "./input.type";
import type { ChangeEvent } from "react";
import { forwardRef, useState } from "react";
import { RiVipDiamondLine } from "react-icons/ri";
import clsx from "clsx";

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  text,
  premiumIndicator,
  disabled,
  label,
  value: valueProps,
  onChange, ...props
}, ref) => {
  const [value, setValue] = useState(valueProps);
  const randomId = Math.random().toString(36).substring(7);

  const containerClass = clsx(
    "group flex border rounded-lg p-2.5",
    "border-gray-600 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
    "border-gray-600 bg-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
    {
      "text-white bg-gray-700": !disabled,
      "text-gray-400 bg-gray-700 cursor-not-allowed": disabled
    },
    className
  );

  const inputClass = clsx(
    "w-full bg-transparent outline-none",
    {
      "text-white": !disabled,
      "text-gray-400 cursor-not-allowed": disabled
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    if (onChange) onChange(event);
  };

  return (
    <>
      {label && (
        <label htmlFor={randomId} className="mb-1 text-sm text-gray-400">
          {label}
        </label>
      )}

      <div className={containerClass}>
        {text && <span className="text-gray-400">{text}</span>}

        <input
          ref={ref}
          type={props.type}
          id={randomId}
          placeholder={props.placeholder}
          disabled={disabled}
          className={inputClass}
          value={value}
          onChange={handleChange}
          {...props}
        />

        {premiumIndicator && (
          <div className="flex items-center justify-center rounded-lg ml-2">
            <RiVipDiamondLine className="group-hover:text-yellow-500 transition-colors duration-300 ease-in-out" />
          </div>
        )}
      </div>
    </>
  );
});

Input.displayName = "Input";