import { PencilIcon, PlusIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


export function DetailDadabadi({ id }: { id: string }) {
  return (
    <Link
    href={`/dadabadis/${id}/detail`}
      className="rounded p-1 bg-amber-500 hover:bg-keshar-saffronRedLight hover:text-white"
    > <InformationCircleIcon className="w-6" />
    </Link>
  );
}