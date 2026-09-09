import { BOOKING_ERRORS, EMAIL_PATTERN, NAME_PATTERN } from '@/lib/constants';
import type { BookingErrors, BookingRequest } from '@/types/car';

export function validateBooking(values: BookingRequest): BookingErrors {
  const errors: BookingErrors = {};

  if (!NAME_PATTERN.test(values.name.trim())) errors.name = BOOKING_ERRORS.name;
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = BOOKING_ERRORS.email;
  if (!values.comment?.trim()) errors.comment = BOOKING_ERRORS.comment;

  return errors;
}

export function toBookingRequest(values: BookingRequest): BookingRequest {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    comment: values.comment?.trim(),
  };
}
