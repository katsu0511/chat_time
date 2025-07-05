import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { Input, Button } from '@mui/material';
import { blue } from '@mui/material/colors';

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return redirect('/login');
  }

  return (
    <div className='flex w-full h-full border-blue-500 border-x-4'>
      <div className='w-3/10 h-full'></div>
      <div className='w-7/10 h-full'>
        <div className='bg-blue-100 w-full h-19/20'></div>
        <div className='flex w-full h-1/20'>
          <Input
            disableUnderline
            sx={{
              display: 'block',
              width: '90%',
              height: '100%'
            }}
            inputProps={{
              sx: {
                display: 'block',
                border: '2px solid',
                borderColor: blue[400],
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                p: 1,
                appearance: 'none'
              }
            }}
          />
          <Button
            variant='contained'
            color='secondary'
            disableElevation={true}
            sx={{
              display: 'block',
              width: '10%',
              height: '100%',
              borderRadius: '0'
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
