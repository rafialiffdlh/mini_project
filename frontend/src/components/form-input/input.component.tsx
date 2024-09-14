"use client";
import React, { useState } from "react";

type Props = {
  value: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputComponent({
  value,
  name,
  type,
  placeholder,
  className,
  onChange,
}: Props) {
  const [_value, setValue] = useState("");
  const input = (
    <input
      value={value}
      name={name}
      type={type ?? "text"}
      placeholder={placeholder}
      className={
        className ??
        "w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      }
      onChange={onChange}
    />
  );
  return [_value, setValue, input];
}
