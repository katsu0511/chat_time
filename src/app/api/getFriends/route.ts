import { getFriends } from '@/lib/getter';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get('id');
  if (!idParam) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  const id = Number(idParam);
  if (isNaN(id)) return NextResponse.json({ error: 'ID must be a number' }, { status: 400 });
  const friends = await getFriends(id);
  return NextResponse.json(friends);
}
