import { FormControl, FormLabel } from '@mui/material';
import RadioGroupWrapper from '@/components/RadioGroupWrapper';

export default function Setting() {
  return (
    <div className='flex justify-center w-full h-full'>
      <FormControl>
        <div className='flex items-center w-full h-100'>
          <FormLabel component='legend' sx={{ marginRight: 1 }}>Theme: </FormLabel>
          <RadioGroupWrapper />
        </div>
      </FormControl>
    </div>
  );
}
