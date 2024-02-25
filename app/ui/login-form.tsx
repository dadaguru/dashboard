'use client';
import { mukta } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
//import { signIn } from '@/auth';
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const loginWithGoogle = async () => {
    console.log("reached in login with google");
    const result = await signIn("google", {
      callbackUrl: "/dashboard",
    });
    console.log({ result });

    //signIn('google', {callbackUrl : 'http://localhost:3000/dashboard'})
  }

  return (
    <> <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-amber-500 px-6 pb-4 pt-8">
        <h1 className={`${mukta.className} mb-3 text-2xl text-keshar-saffronRedDark`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-keshar-saffronRedDark"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-keshar-saffronRedDark py-[9px] pl-10 text-sm outline-2 placeholder:text-amber-900"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-900 peer-focus:text-amber-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-keshar-saffronRedDark"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-keshar-saffronRedDark py-[9px] pl-10 text-sm outline-2 placeholder:text-amber-900"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-900 peer-focus:text-amber-900" />
            </div>
          </div>
        </div>
        <LoginButton />

        {/* Add form errors here */}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

      </div>
    </form>
    {/* <button onClick={loginWithGoogle}     
      className='flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
    >
     Log in with Google
    </button> */}
      <Link
        href="/dadabadis"
        className="flex h-10 items-center rounded-lg bg-keshar-saffronRedDark px-4 text-sm font-medium text-white transition-colors hover:bg-keshar-saffronRedLight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 active:bg-sky-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      >
        <span>Go to HomePage</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </>

  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full bg-keshar-saffronRedDark text-white p-3 hover:bg-keshar-saffronRedLight" aria-disabled={pending}>
      Log in<ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
    </Button>
  );
}
