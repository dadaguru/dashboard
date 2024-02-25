import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteDadabadi } from '@/app/lib/dadabadiactions';

export function CreateDadabadi() {
  return (
    <Link
      href="/dashboard/dadabadis/create"
      className="flex h-10 items-center rounded-lg bg-amber-500 px-4 text-sm font-medium text-black transition-colors hover:bg-amber-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Dadabadi</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UploadDadabadi() {
  return (
    <Link
      href="/dashboard/dadabadis/create"
      className="flex h-10 items-center rounded-lg bg-amber-500 px-4 text-sm font-medium text-black transition-colors hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Upload Dadabadis Data</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateDadabadi({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/dadabadis/${id}/edit`}
      className="rounded-md bg-amber-500 p-2 hover:bg-amber-700 hover:text-white"
    >
      <PencilIcon className="w-4" />
    </Link>
  );
}

export function DeleteDadabadi({ id }: { id: string }) {
  const deleteDadabadiWithId = deleteDadabadi.bind(null, id);
  return (
    <form action={deleteDadabadiWithId}>
      <button className="rounded-md bg-amber-500 p-2 hover:bg-amber-700 hover:text-white">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}


export function DetailDadabadi({ id }: { id: string }) {
  return (
    <Link
    href={`/dadabadis/${id}/detail`}
      className="rounded-md border p-2 hover:bg-gray-100"
    > Detail
      <PencilIcon className="w-5" />
    </Link>
  );
}