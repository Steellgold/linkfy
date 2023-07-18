"use client";

import { BsFillEmojiSunglassesFill, BsFillEmojiFrownFill, BsFillEmojiAngryFill, BsFillEmojiNeutralFill, BsFillEmojiSmileFill } from "react-icons/bs";
import type { InputProps } from "./input.type";
import type { ChangeEvent } from "react";
import { forwardRef, useEffect, useState } from "react";
import { RiVipDiamondLine } from "react-icons/ri";
import clsx from "clsx";

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  text,
  premiumIndicator,
  disabled,
  label,
  error,
  required,
  passwordChecker,
  value: valueProps,
  onChange, ...props
}, ref) => {
  const [value, setValue] = useState(valueProps);

  const passwordStrength = (password: string): number => {
    const strength = {
      length: 0,
      uppercase: 0,
      lowercase: 0,
      numbers: 0,
      symbols: 0
    };

    if (password.length >= 8) strength.length = 1;
    if (password.match(/[A-Z]/g)) strength.uppercase = 1;
    if (password.match(/[a-z]/g)) strength.lowercase = 1;
    if (password.match(/[0-9]/g)) strength.numbers = 1;
    if (password.match(/[^a-zA-Z0-9]/g)) strength.symbols = 1;

    console.log(strength);

    return Object.values(strength).reduce((a, b) => a + b);
  };

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

  useEffect(() => {
    setValue(valueProps);
  }, [valueProps]);

  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={props.id} className="mb-1 text-sm text-gray-400">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className={containerClass}>
        {text && <span className="text-gray-400">{text}</span>}

        <input
          ref={ref}
          type={props.type}
          id={props.id}
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

        {passwordChecker && typeof value === "string" && value.length > 0 && (
          <div className="flex items-center justify-center rounded-lg ml-2">
            {passwordStrength(value) === 0 && <BsFillEmojiAngryFill className="text-red-500" />}
            {passwordStrength(value) === 1 && <BsFillEmojiFrownFill className="text-yellow-500" />}
            {passwordStrength(value) === 2 && <BsFillEmojiNeutralFill className="text-yellow-500" />}
            {passwordStrength(value) === 3 && <BsFillEmojiSmileFill className="text-green-500" />}
            {passwordStrength(value) >= 4 && <BsFillEmojiSunglassesFill className="text-green-500" />}
          </div>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-sm mb-3">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";