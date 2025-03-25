// src/components/DatePicker/DatePickerInput.tsx
import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { cn } from '../../utils';
import { DatePicker, DateRange } from './DatePicker';

interface DatePickerInputProps {
  mode?: 'single' | 'range' | 'month';
  selected?: Date | DateRange;
  onSelect?: (date: Date | DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  format?: string;
}

export const DatePickerInput = ({
  mode = 'single',
  selected,
  onSelect,
  placeholder = 'Select date',
  className,
  inputClassName,
  disabled = false,
  format: formatStr = 'PPP',
}: DatePickerInputProps) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const handleSelect = (value: Date | DateRange | undefined) => {
    if (onSelect) {
      onSelect(value);
    }
    if (mode !== 'range' || (value as DateRange)?.to) {
      setOpen(false);
    }
  };

  const getInputValue = () => {
    if (!selected) return '';

    if (mode === 'single' && selected instanceof Date) {
      return format(selected, formatStr);
    }

    if (mode === 'range' && typeof selected === 'object') {
      const { from, to } = selected as DateRange;
      if (from && to) {
        return `${format(from, formatStr)} - ${format(to, formatStr)}`;
      }
      if (from) {
        return `${format(from, formatStr)} - ?`;
      }
    }

    if (mode === 'month' && selected instanceof Date) {
      return format(selected, 'MMMM yyyy');
    }

    return '';
  };

  return (
    <div className={cn('relative', className)}>
      <input
        ref={inputRef}
        type='text'
        placeholder={placeholder}
        value={getInputValue()}
        onClick={handleInputClick}
        readOnly
        disabled={disabled}
        className={cn(
          'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          disabled && 'bg-gray-100 cursor-not-allowed',
          inputClassName,
        )}
      />

      {open && (
        <div className='absolute z-50 mt-1'>
          <DatePicker
            mode={mode}
            selected={selected}
            onSelect={handleSelect}
            footer={
              mode === 'range' && (
                <div className='p-2 border-t text-center text-sm'>
                  {selected &&
                  typeof selected === 'object' &&
                  (selected as DateRange).from ? (
                    <span>
                      {(selected as DateRange).to
                        ? `${format((selected as DateRange).from!, 'PPP')} - ${format((selected as DateRange).to!, 'PPP')}`
                        : `${format((selected as DateRange).from!, 'PPP')} - ?`}
                    </span>
                  ) : (
                    <span>Please select the first day.</span>
                  )}
                </div>
              )
            }
          />
          <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
};
