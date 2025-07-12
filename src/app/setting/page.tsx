import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { FormControl } from '@mui/material';
import RadioGroupWrapper from '@/components/RadioGroupWrapper';

export default async function Setting() {
  const session = await getAuthSession();
  if (!session) return redirect('/login');

  return (
    <div className='flex justify-center w-full h-full'>
      <FormControl>
        <RadioGroupWrapper />
      </FormControl>
    </div>
  );
}
