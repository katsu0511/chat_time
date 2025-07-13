import { addFriend } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { id: idParam, friendId: friendIdParam } = await req.json();
  if (!idParam) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  if (!friendIdParam) return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
  const id = Number(idParam);
  if (isNaN(id)) return NextResponse.json({ error: 'ID must be a number' }, { status: 400 });
  const friendId = Number(friendIdParam);
  if (isNaN(friendId)) return NextResponse.json({ error: 'Friend ID must be a number' }, { status: 400 });
  const rows = await addFriend(id, friendId);
  return NextResponse.json(rows);
}
