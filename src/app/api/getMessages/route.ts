import { getMessages } from '@/lib/getter';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const senderIdParam = searchParams.get('senderId');
  const receiverIdParam = searchParams.get('receiverId');
  if (!senderIdParam) return NextResponse.json({ error: 'Sender ID is required' }, { status: 400 });
  if (!receiverIdParam) return NextResponse.json({ error: 'Receiver ID is required' }, { status: 400 });
  const senderId = Number(senderIdParam);
  if (isNaN(senderId)) return NextResponse.json({ error: 'Sender ID must be a number' }, { status: 400 });
  const receiverId = Number(receiverIdParam);
  if (isNaN(receiverId)) return NextResponse.json({ error: 'Receiver ID must be a number' }, { status: 400 });
  const messages = await getMessages(senderId, receiverId);
  return NextResponse.json(messages);
}
