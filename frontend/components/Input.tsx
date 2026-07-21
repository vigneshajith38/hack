import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: Props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black ${className}`}
    />
  );
}