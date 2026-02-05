'use client';

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
}

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  disabled,
}: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-xs font-medium text-[#9B97B0]">{label}</label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className="w-full rounded-lg border border-[#2E2B3F] bg-[#242136] 
          px-3 py-2.5 text-sm text-white placeholder:text-[#6B7280]
          focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors"
      />
    </div>
  );
}
