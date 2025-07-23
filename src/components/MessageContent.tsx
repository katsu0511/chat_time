import dayjs from 'dayjs';

export default function MessageContent(props: {id: number, message: Message}) {
  const datetime = dayjs(props.message.createdAt).format('YYYY/MM/DD HH:mm');
  const align = props.id === props.message.senderId ? 'text-right' : 'text-left';
  const backGround = props.id === props.message.senderId ? 'bg-blue-500 mr-3' : 'bg-white ml-3';

  return (
    <div className={`w-full h-12 ${align}`}>
      {props.id === props.message.senderId && <div className='inline-block text-xs align-bottom my-3 ml-3 mr-1'>{datetime}</div>}
      <div className={`inline-block relative h-6 rounded-xl ${backGround} px-2 my-3`}>
        <p className='w-full h-12 leading-6'>{props.message.content}</p>
      </div>
      {props.id === props.message.receiverId && <div className='inline-block text-xs align-bottom my-3 ml-1 mr-3'>{datetime}</div>}
    </div>
  );
}
