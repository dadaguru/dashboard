import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  BuildingLibraryIcon,
  InboxArrowDownIcon,
} from '@heroicons/react/24/outline';
import { mukta } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { fetchCardDataDadabadis } from '@/app/lib/dadabadidata';

const iconMap = {
  dadabadis: BuildingLibraryIcon,
  emails: InboxArrowDownIcon,
  pending: ClockIcon,
  users: UserGroupIcon,
};

export default async function CardWrapper() {
  const {    
    numberOfDadabadis,
    numberOfPublishPending,
    totalUsers,
    totalEmails,
  } = await fetchCardDataDadabadis();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Total Dadabadis" value={numberOfDadabadis} type="dadabadis" />
      <Card title="Publish Pending" value={numberOfPublishPending} type="pending" />
      <Card title="Total Users" value="781" type="users" />
      <Card
        title="Total Emails"
        value="2993"
        type="emails"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'users' | 'emails' | 'pending' | 'dadabadis';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-keshar-saffronRedDark p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-white" /> : null}
        <h3 className="ml-2 text-white text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${mukta.className}
          truncate rounded-xl bg-amber-500 text-keshar-saffronRedDark px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
