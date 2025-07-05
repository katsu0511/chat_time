import { FormControl } from '@mui/material';
import RadioGroupWrapper from '@/components/RadioGroupWrapper';

export default function Setting() {
  return (
    <div className='flex justify-center w-full h-full'>
      <FormControl>
        <RadioGroupWrapper />
      </FormControl>
    </div>
  );
}
