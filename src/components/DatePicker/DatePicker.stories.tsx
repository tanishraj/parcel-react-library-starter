// src/components/DatePicker/DatePicker.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { addDays } from 'date-fns';

import { DatePicker, DatePickerProps, DateRange } from './DatePicker';
import { DatePickerInput } from './DatePickerInput';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['single', 'range', 'month'],
    },
    size: {
      control: { type: 'radio' },
      options: ['default', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Basic DatePicker stories
export const Default: Story = {
  args: {
    mode: 'single',
  },
};

export const RangeMode: Story = {
  args: {
    mode: 'range',
  },
};

export const MonthPicker: Story = {
  args: {
    mode: 'month',
  },
};

export const WithPreselectedDate: Story = {
  args: {
    mode: 'single',
    selected: new Date(2025, 2, 22), // March 22, 2025
  },
};

export const WithPreselectedRange: Story = {
  args: {
    mode: 'range',
    selected: {
      from: new Date(2025, 2, 22),
      to: new Date(2025, 2, 26),
    },
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
  },
};

// Interactive examples with state
export const InteractiveSingleDate = () => {
  const [selected, setSelected] = useState<Date | undefined>(
    new Date(2025, 2, 22),
  );

  return (
    <div className='space-y-4'>
      <p>Selected date: {selected ? selected.toLocaleDateString() : 'None'}</p>
      <DatePicker
        mode='single'
        selected={selected}
        onSelect={setSelected as (date: Date | undefined) => void}
      />
    </div>
  );
};

export const InteractiveRangeSelection = () => {
  const [range, setRange] = useState<DateRange>({
    from: new Date(2025, 2, 22),
    to: new Date(2025, 2, 26),
  });

  return (
    <div className='space-y-4'>
      <p>
        Selected range: {range.from ? range.from.toLocaleDateString() : 'None'}
        {range.to ? ` - ${range.to.toLocaleDateString()}` : ''}
      </p>
      <DatePicker
        mode='range'
        selected={range}
        onSelect={setRange as (range: DateRange | undefined) => void}
      />
    </div>
  );
};

export const InteractiveMonthSelection = () => {
  const [selected, setSelected] = useState<Date | undefined>(
    new Date(2025, 2, 1),
  );

  return (
    <div className='space-y-4'>
      <p>
        Selected month:{' '}
        {selected
          ? selected.toLocaleDateString(undefined, {
              month: 'long',
              year: 'numeric',
            })
          : 'None'}
      </p>
      <DatePicker
        mode='month'
        selected={selected}
        onSelect={setSelected as (date: Date | undefined) => void}
      />
    </div>
  );
};

// DatePickerInput stories
export const InputWithSingleDate = () => {
  const [selected, setSelected] = useState<Date | undefined>(
    new Date(2025, 2, 22),
  );

  return (
    <div className='w-[300px]'>
      <DatePickerInput
        mode='single'
        selected={selected}
        onSelect={setSelected as (date: Date | undefined) => void}
        placeholder='Select a date'
      />
    </div>
  );
};

export const InputWithDateRange = () => {
  const [range, setRange] = useState<DateRange>({
    from: new Date(2025, 2, 22),
    to: new Date(2025, 2, 26),
  });

  return (
    <div className='w-[300px]'>
      <DatePickerInput
        mode='range'
        selected={range}
        onSelect={setRange as (range: DateRange | undefined) => void}
        placeholder='Select date range'
      />
    </div>
  );
};

export const InputWithMonthPicker = () => {
  const [selected, setSelected] = useState<Date | undefined>(
    new Date(2025, 2, 1),
  );

  return (
    <div className='w-[300px]'>
      <DatePickerInput
        mode='month'
        selected={selected}
        onSelect={setSelected as (date: Date | undefined) => void}
        placeholder='Select a month'
      />
    </div>
  );
};

export const DisabledInput = () => {
  return (
    <div className='w-[300px]'>
      <DatePickerInput
        mode='single'
        selected={new Date(2025, 2, 22)}
        disabled={true}
      />
    </div>
  );
};
