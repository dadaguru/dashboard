import Image from 'next/image';
import { UpdateDadabadi, DeleteDadabadi } from '@/app/ui/dadabadis/buttons';
import DadabadiStatus from '@/app/ui/dadabadis/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredDadabadis } from '@/app/lib/dadabadidata';
import PublishStatus from '@/app/ui/dadabadis/published';

export default async function DadabadisTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const dadabadis = await fetchFilteredDadabadis(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        <div className="md:hidden">
            {dadabadis?.map((dadabadi) => (
              <div
                key={dadabadi.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={dadabadi.image1}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${dadabadi.title}'s picture`}
                      /> */}
                      <p>{dadabadi.title} hi</p>
                    </div>
                    <p className="text-sm text-gray-500">{dadabadi.email}</p>
                  </div>
                  {/* <InvoiceStatus status={dadabadi.published} /> */}
                  <p>{dadabadi.published}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {dadabadi.address}
                    </p>
                    <p>{formatDateToLocal(dadabadi.created_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateDadabadi id={dadabadi.id} />
                    <DeleteDadabadi id={dadabadi.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  State
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contact Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contact Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  BhojanShala
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  DharmShala
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Published
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {dadabadis?.map((dadabadi) => (
                <tr
                  key={dadabadi.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={dadabadi.image2}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${dadabadi.title}'s profile picture`}
                      /> */}
                      <p>{dadabadi.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dadabadi.titlehin}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dadabadi.state}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dadabadi.contactname}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dadabadi.contactnumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <DadabadiStatus status={dadabadi.bhojanshala} />                    
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <DadabadiStatus status={dadabadi.dharmshala} />                    
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <PublishStatus status={dadabadi.published} />                    
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">                      
                      <UpdateDadabadi id={dadabadi.id} />
                      <DeleteDadabadi id={dadabadi.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
