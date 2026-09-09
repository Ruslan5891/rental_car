'use client';

import { useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import { createBookingRequest } from '@/lib/api';
import { BOOKING_ERROR_TOAST, BOOKING_FIELDS, BOOKING_INITIAL_VALUES } from '@/lib/constants';
import { toBookingRequest, validateBooking } from '@/lib/validation';
import type { BookingErrors, BookingRequest } from '@/types/car';
import type { BookingFormProps } from './types';
import css from './BookingForm.module.css';

export default function BookingForm({ carId }: BookingFormProps) {
  const [values, setValues] = useState<BookingRequest>(BOOKING_INITIAL_VALUES);
  const [errors, setErrors] = useState<BookingErrors>({});

  const { mutate, isPending } = useMutation({
    mutationFn: (booking: BookingRequest) => createBookingRequest(carId, booking),
    onSuccess: data => {
      toast.success(data.message);
      setValues(BOOKING_INITIAL_VALUES);
    },
    onError: () => {
      toast.error(BOOKING_ERROR_TOAST);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateBooking(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    mutate(toBookingRequest(values));
  };

  return (
    <form className={css.form} noValidate onSubmit={handleSubmit} aria-labelledby="booking-title">
      <div className={css.heading}>
        <h2 id="booking-title" className={css.title}>
          Book your car now
        </h2>
        <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      </div>
      <div className={css.fields}>
        <TextField
          label="Name"
          name={BOOKING_FIELDS.name}
          type="text"
          autoComplete="name"
          required
          value={values.name}
          error={errors.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name={BOOKING_FIELDS.email}
          type="email"
          autoComplete="email"
          required
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
        <TextField
          label="Comment"
          name={BOOKING_FIELDS.comment}
          multiline
          rows={3}
          aria-required="true"
          value={values.comment}
          error={errors.comment}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className={css.submit} disabled={isPending}>
        Send
      </Button>
    </form>
  );
}
