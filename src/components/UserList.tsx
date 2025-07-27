import type { User } from 'next-auth';
import { Button } from '@mui/material';

const addFriend = async (id: number, friendId: number) => {
  const res = await fetch('/api/addFriend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, friendId }),
  });

  if (!res.ok) return null;
  const json: number = await res.json();
  if (json === 0)
    return null;
  else
    return json;
};

export default function UserList(props: {user: User, myId: string, friendIds: number[]}) {
  return (
    <li key={props.user.id} className='w-full max-w-100 h-[50px] mx-auto px-5 my-0'>
      <div className='flex w-full h-full border-blue-500 border-b-1'>
        <div className='w-[calc(100%-72px)] max-w-82 h-full text-left px-2'>
          <p className='text-xl w-full h-[25px]'>{props.user.name}</p>
          <p className='text-sm w-full h-6 leading-6'>{props.user.userId}</p>
        </div>
        <div className='w-18 h-full pr-2'>
          {
            props.user.id != props.myId &&
            <Button
              variant='contained'
              color='secondary'
              disableElevation={true}
              disabled={props.friendIds.includes(props.user.id as unknown as number)}
              onClick={() => addFriend(props.myId as unknown as number, props.user.id as unknown as number)}
              sx={{
                display: 'block',
                width: '64px',
                height: '36px',
                borderRadius: '5px',
                padding: 0,
                marginTop: '7px',
                marginBottom: '6px'
              }}
            >
              {props.friendIds.includes(props.user.id as unknown as number) ? 'Friend' : 'Add'}
            </Button>
          }
        </div>
      </div>
    </li>
  );
}
