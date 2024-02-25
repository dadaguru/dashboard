import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { mukta } from '@/app/ui/fonts';
import { fetchLatestDadabadis } from '@/app/lib/dadabadidata';

export default async function LatestDadabadis() {
  const latestDadabadis = await fetchLatestDadabadis();
  return (
    <div className="flex text-keshar-saffronRedDark w-full flex-col md:col-span-8">
      <h2 className={`${mukta.className} mb-4 text-xl md:text-2xl`}>
        Latest Dadabadis
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-orange-200 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {latestDadabadis.map((dadabadi, i) => {
            return (
              <div
                key={dadabadi.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src='/customers/emil-kowalski.png'
                    alt={`${dadabadi.title}'s picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {dadabadi.title}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {dadabadi.titlehin}
                    </p>
                  </div>
                </div>
                <p
                  className={`${mukta.className} truncate text-sm font-medium md:text-base`}
                >
                  {dadabadi.published}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-keshar-saffronRedLight" />
          <h3 className="ml-2 text-sm text-keshar-saffronRedLight">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
