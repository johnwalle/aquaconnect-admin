'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { MOCK_WOREDAS } from '../mock/woredaAdmins.mock';

const DAYS = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];

export default function ScheduleForm({ onSubmit, defaultValues, loading }) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

  useEffect(() => {
    defaultValues ? reset({
      woredaId: defaultValues.woreda?.id,
      day: defaultValues.day,
      startTime: defaultValues.startTime,
      endTime: defaultValues.endTime,
      note: defaultValues.note,
    }) : reset({});
  }, [defaultValues, reset]);

  const startTime = watch('startTime');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!defaultValues && (
        <FormField label="Woreda" error={errors.woredaId?.message}>
          <Select
            error={errors.woredaId}
            {...register('woredaId', { required: 'Please select a woreda.' })}
          >
            <option value="">Select woreda</option>
            {MOCK_WOREDAS.map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </Select>
        </FormField>
      )}

      <FormField label="Day of week" error={errors.day?.message}>
        <Select
          error={errors.day}
          {...register('day', { required: 'Please select a day.' })}
        >
          <option value="">Select day</option>
          {DAYS.map((d) => (
            <option key={d} value={d}>{d.charAt(0) + d.slice(1).toLowerCase()}</option>
          ))}
        </Select>
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Start time" error={errors.startTime?.message}>
          <Input
            type="time"
            error={errors.startTime}
            {...register('startTime', { required: 'Start time is required.' })}
          />
        </FormField>
        <FormField label="End time" error={errors.endTime?.message}>
          <Input
            type="time"
            error={errors.endTime}
            {...register('endTime', {
              required: 'End time is required.',
              validate: (v) => !startTime || v > startTime || 'End time must be after start time.',
            })}
          />
        </FormField>
      </div>

      <FormField label="Note (optional)" error={errors.note?.message}>
        <Input
          placeholder="e.g. Morning water supply"
          {...register('note')}
        />
      </FormField>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1D9E75] text-[#020f1a] font-syne font-bold py-3 rounded-xl hover:bg-[#5DCAA5] transition-all disabled:opacity-60 text-sm mt-2"
      >
        {loading ? 'Saving...' : defaultValues ? 'Update Schedule' : 'Create Schedule'}
      </button>
    </form>
  );
}