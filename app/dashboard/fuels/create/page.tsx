import Form from '@/app/ui/fuels/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

import { getListEquipment } from '@/app/lib/equipment';
import { getListOperator } from '@/app/lib/operator';
import { auth } from '@/auth';


export default async function Page() {
    const operators = await getListOperator();
    const equipments = await getListEquipment()

    const session = await auth()
    const user = session?.user
    const user_id = user?.image || ''

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Fuel', href: '/dashboard/fuels' },
                    {
                        label: 'Submit Fuel Consumption',
                        href: '/dashboard/fuels/create',
                        active: true,
                    },
                ]}
            />
            <Form user_id={user_id} operators={operators.data} equipments={equipments.data} />
        </main>
    );
}