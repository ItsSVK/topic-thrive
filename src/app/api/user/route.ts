import { SignupSchema } from '@/schemas/SignupForm.schema';
import prisma from '@/lib/db';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  //   return NextResponse.json({ success: true });

  try {
    const body = await req.json();
    const { email, username, password } = SignupSchema.parse(body);

    const hashedPassword = await hash(password, 10);

    const exists = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (exists)
      return NextResponse.json(
        { message: 'user with this email or username already exists' },
        { status: 422 }
      );

    const { password: _password, ...user } = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { user, message: 'User created Successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
