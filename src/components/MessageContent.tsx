import dayjs from 'dayjs';

export default function MessageContent(props: {id: number, message: Message}) {
  const justify = props.id === props.message.senderId ? 'justify-end' : 'justify-start';
  const order = props.id === props.message.senderId ? 'order-0 mr-1' : 'order-2 ml-1';
  const datetime = dayjs(props.message.createdAt).format('YYYY/MM/DD HH:mm');
  const speechBubble1 = props.id === props.message.senderId ? 'right-2 bg-blue-500 rounded-[0_0_100%_0]' : 'left-2 bg-white rounded-[0_0_0_100%]';
  const speechBubble2 = props.id === props.message.senderId ? 'right-1' : 'left-1';
  const backGround = props.id === props.message.senderId ? 'bg-blue-500 mr-3' : 'bg-white ml-3';
  const color = props.id === props.message.senderId ? 'text-white' : 'text-black-500';

  return (
    <div className={`flex ${justify} items-end relative w-full h-12`}>
      <div className={`text-xs mb-3 ${order}`}>{datetime}</div>
      <div className='order-1'>
        <span className={`absolute top-3 ${speechBubble1} w-3 h-3 z-1`}></span>
        <span className={`absolute top-[3px] ${speechBubble2} bg-blue-100 w-6 h-3 rounded-[50%_/_0_0_100%_100%] z-2`}></span>
        <div className={`relative h-6 rounded-xl ${backGround} my-3 px-2 z-3`}>
          <p className={`${color} w-full h-12 leading-6`}>{props.message.content}</p>
        </div>
      </div>
    </div>
  );
}
