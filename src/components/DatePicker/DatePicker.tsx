import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '../../utils';

import 'react-day-picker/style.css';

// Define variants using CVA
const datePickerVariants = cva('bg-white rounded-md shadow-lg p-1', {
  variants: {
    size: {
      default: 'w-[320px]',
      large: 'w-[400px]',
    },
    mode: {
      single: '',
      range: '',
      month: '',
    },
  },
  defaultVariants: {
    size: 'default',
    mode: 'single',
  },
});

export interface DateRange {
  from: Date;
  to?: Date;
}

export interface DatePickerProps
  extends VariantProps<typeof datePickerVariants> {
  mode?: 'single' | 'range' | 'month';
  selected?: Date | DateRange;
  onSelect?: (date: Date | DateRange | undefined) => void;
  className?: string;
  showOutsideDays?: boolean;
  disabled?: Date | Date[] | ((date: Date) => boolean);
  footer?: React.ReactNode;
}

export const DatePicker = ({
  mode = 'single',
  selected,
  onSelect,
  className,
  size,
  showOutsideDays = true,
  disabled,
  footer,
}: DatePickerProps) => {
  // State for month view
  const [month, setMonth] = useState<Date>(
    selected instanceof Date ? selected : selected?.from || new Date(),
  );

  // Handle month selection for month picker mode
  const handleMonthSelect = (date: Date) => {
    if (mode === 'month' && onSelect) {
      onSelect(date);
    }
  };

  // Custom navigation components
  const NavButton = ({
    onClick,
    children,
  }: {
    onClick?: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className='p-1 rounded-full hover:bg-gray-100 transition-colors'
    >
      {children}
    </button>
  );

  return (
    <div className={cn(datePickerVariants({ size, mode }), className)}>
      {mode === 'month' ? (
        <div className='month-picker'>
          <div className='flex justify-between items-center mb-4'>
            <NavButton
              onClick={() =>
                setMonth(new Date(month.getFullYear() - 1, month.getMonth()))
              }
            >
              <ChevronLeftIcon className='h-5 w-5' />
            </NavButton>
            <div className='font-medium'>{format(month, 'yyyy')}</div>
            <NavButton
              onClick={() =>
                setMonth(new Date(month.getFullYear() + 1, month.getMonth()))
              }
            >
              <ChevronRightIcon className='h-5 w-5' />
            </NavButton>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date(month.getFullYear(), i, 1);
              return (
                <button
                  key={i}
                  onClick={() => handleMonthSelect(date)}
                  className={cn(
                    'py-2 rounded-md hover:bg-blue-100',
                    selected instanceof Date &&
                      selected.getMonth() === i &&
                      selected.getFullYear() === month.getFullYear()
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50',
                  )}
                >
                  {format(date, 'MMM')}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <DayPicker
          mode={mode === 'range' ? 'range' : 'single'}
          selected={selected}
          onSelect={onSelect}
          month={month}
          onMonthChange={setMonth}
          showOutsideDays={showOutsideDays}
          disabled={disabled}
          className='custom-day-picker'
          classNames={{
            months: 'flex flex-col',
            month: 'space-y-4',
            caption: 'flex justify-between pt-1 relative items-center',
            caption_label: 'text-sm font-medium',
            nav: 'space-x-1 flex items-center',
            nav_button:
              'h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100',
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell:
              'text-muted-foreground rounded-md w-9 font-normal text-xs',
            row: 'flex w-full mt-2',
            cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
            day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 rounded-full',
            day_selected:
              'bg-blue-500 text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white',
            day_today: 'bg-accent text-accent-foreground',
            day_outside: 'text-muted-foreground opacity-50',
            day_disabled: 'text-muted-foreground opacity-50',
            day_range_middle:
              'aria-selected:bg-accent aria-selected:text-accent-foreground',
            day_hidden: 'invisible',
          }}
          components={{
            IconLeft: () => <ChevronLeftIcon className='h-5 w-5' />,
            IconRight: () => <ChevronRightIcon className='h-5 w-5' />,
          }}
          footer={footer}
        />
      )}
    </div>
  );
};
