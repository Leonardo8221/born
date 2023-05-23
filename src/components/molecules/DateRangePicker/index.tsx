import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from '@/utils';

interface DateRangePickerProps {
  className?: string;
  editMode?: boolean;
  label?: string;
  value?: string;
  onDateChange?: (value: any) => void;
  handleStartDate?: (value: any) => void;
  handleEndDate?: (value: any) => void;
}

const DateRangePicker: FC<DateRangePickerProps> = ({
  className,
  label,
  value,
  handleStartDate,
  handleEndDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const [start, end]: any = value?.split(' - ');
    setStartDate(
      (start &&
        (new Date(start) as any) !== 'Invalid Date' &&
        new Date(start)) ||
        null
    );
    setEndDate(
      (end && (new Date(end) as any) !== 'Invalid Date' && new Date(end)) ||
        null
    );
  }, []);

  const handleChange = (date: any) => {
    if (!startDate) {
      setStartDate(date[0]);
      handleStartDate?.(date[0])
      setEndDate(null);
      return;
    } else if (startDate && !endDate) {
      setStartDate(date[0]);
      setEndDate(date[1]);
      handleEndDate?.(date[1])
      setIsOpen(false);
      return;
    } else if ((!startDate && !endDate) || (startDate && endDate)) {
      setStartDate(date[0]);
      handleStartDate?.(date[0]);
      setEndDate(null);
      return;
    }
  };

  return (
    <div className={clsx('flex-1', className)}>
      <>
        <div
          className="relative flex cursor-text border border-[#D8D8D8] rounded w-full p-2 overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <label className="block cursor-text text-[#999999] font-light leading-tight mr-4 min-w-[132px] max-w-[132px]:">
            {label}
          </label>
          <div className="w-full text-[#666666] font-light leading-tight focus:outline-none focus:shadow-outline h-full">
            {(startDate !== 'Invalid Date' && formatDate(startDate)) ||
              'DD/MM/YYYY'}{' '}
            -{' '}
            {(endDate !== 'Invalid Date' && formatDate(endDate)) ||
              'DD/MM/YYYY'}
          </div>
        </div>
        {isOpen && (
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            inline
            selectsRange
            onChange={handleChange}
            selectsEnd={Boolean(startDate)}
          />
        )}
      </>
    </div>
  );
};

export default DateRangePicker;
