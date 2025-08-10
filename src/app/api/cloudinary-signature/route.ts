import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder') || 'ratatouille_images';

  const timestamp = Math.floor(Date.now() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiSecret) {
    return NextResponse.json({ error: 'Missing API secret' }, { status: 500 });
  }

  const paramsToSign = {
    timestamp,
    folder,
  };

  // const sortedKeys = Object.keys(paramsToSign).sort();
  // const toSign = sortedKeys.map(key => `${key}=${paramsToSign[key]}`).join('&');
  const toSign = Object.entries(paramsToSign)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const signature = crypto
    .createHash('sha1')
    .update(toSign + apiSecret)
    .digest('hex');

  return NextResponse.json({
    signature,
    timestamp,
    folder,
  });
}
