import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


export function DetailDadabadi({ id }: { id: string }) {
  return (
    <Link
    href={`/dadabadis/${id}/detail`}
      className="rounded-md border p-2 bg-blue-500 hover:bg-gray-100"
    > <PencilIcon className="w-5" />
    </Link>
  );
}