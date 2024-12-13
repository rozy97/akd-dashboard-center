import {
  BanknotesIcon,
  ClockIcon,
  TrashIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
// import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  ore_mining: BanknotesIcon,
  ob_removal: TrashIcon,
  fuel: ClockIcon,
  barging: InboxIcon,
};

export default async function CardWrapper() {
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Ore Mining" value={"1656 Ton (45% achieved)"} type="ore_mining" />
      <Card title="OB Removal" value={"513 BCM (37% achieved)"} type="ob_removal" />
      <Card title="Fuel Consumption" value={"4368 Liter"} type="fuel" />
      <Card
        title="Barging"
        value={"0 Rit"}
        type="barging"
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
  type: 'ore_mining' | 'ob_removal' | 'fuel' | 'barging';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
