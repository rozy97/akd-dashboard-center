import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { getListFuelConsumption } from '@/app/lib/fuel-consumption'
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';

// dayjs.extend(utc);
// dayjs.extend(timezone);

export default async function FuelConsumptionsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    // const fuelConsumptions = await fetchFilteredInvoices(query, currentPage);
    const fuelConsumptions = await getListFuelConsumption(currentPage);
    const hourDiffFromUTC: any = {
        "Asia/Jakarta": {
            diff: 7,
            ext: "WIB",
            zone: "Asia/Jakarta"
        },
        "Asia/Makassar": {
            diff: 8,
            ext: "WITA",
            zone: "Asia/Makassar"
        },
        "Asia/Jayapura": {
            diff: 9,
            ext: "WIT",
            zone: "Asia/Jayapura"
        }
    }
    const timezone = hourDiffFromUTC[Intl.DateTimeFormat().resolvedOptions().timeZone]

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {fuelConsumptions?.data?.map((item) => (
                            <div
                                key={item.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p className="text-xl font-medium text-green-800">
                                            {item.equipment.equipment_type} <b>{item.equipment.code}</b>
                                        </p>

                                        <p className="text-sm text-gray-500">{item.time.toString()}</p>
                                        <p className="text-sm text-gray-500">{item.hm_or_km_unit ? `HM/KM Unit: ${item.hm_or_km} ${item.hm_or_km_unit}` : ''}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>


                                        <div className="mb-2 flex items-center">
                                            {item?.operator && <><Image
                                                src='/customers/avatar.png'
                                                className="rounded-full"
                                                width={28}
                                                height={28}
                                                alt={`${item?.operator?.name}'s profile picture`}
                                            />
                                                <p className='ml-2'>{item?.operator?.name}</p></>}
                                        </div>
                                        <p className='text-pink-700'>{item.amount} Liter</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateInvoice id={item.id} />
                                        <DeleteInvoice id={item.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Time
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Operator
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Equipment
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Amount (Liter)
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    HM/KM Unit
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {fuelConsumptions?.data?.map((item) => (
                                <tr
                                    key={item.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {item.time.toString()}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            {item?.operator ? <><Image
                                                src='/customers/avatar.png'
                                                className="rounded-full"
                                                width={28}
                                                height={28}
                                                alt={`${item?.operator?.name}'s profile picture`}
                                            />
                                                <p>{item?.operator?.name}</p></> : <p>-</p>}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {item.equipment.equipment_type} <b>{item.equipment.code}</b>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {item.amount}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {item.hm_or_km_unit ? `${item.hm_or_km} ${item.hm_or_km_unit}` : '-'}
                                    </td>

                                    {/* <td className="whitespace-nowrap px-3 py-3">
                                        <InvoiceStatus status={invoice.status} />
                                    </td> */}
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateInvoice id={item.id} />
                                            <DeleteInvoice id={item.id} />
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
