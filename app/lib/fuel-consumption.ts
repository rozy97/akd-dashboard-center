import { NextResponse } from 'next/server';

type BaseResponse = {
    data: FuelConsumptionResponse[];
}

type EquipmentFuelConsumptionResponse = {
    id: string;
    category: string;
    equipment_type: string;
    code: string;
}

type OperatorFuelConsumptionResponse = {
    id: string;
    name: string;
}

type FuelConsumptionResponse = {
    id: string;
    equipment: EquipmentFuelConsumptionResponse;
    operator: OperatorFuelConsumptionResponse | null;
    amount: number | string;
    hm_or_km: string | number | null;
    hm_or_km_unit: string | null;
    time: Date;
}

export async function getListFuelConsumption(page: number): Promise<BaseResponse> {
    const baseUrl = process.env.API_HOST || 'https://api.malili.adisarana.id'
    const url = baseUrl + '/v1/fuel/consumption' + `?page=${page}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data: BaseResponse = await response.json(); // Ensure the response is an array of objects
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return { data: [] }; // Return an empty array on failure
    }
}

// const FormSchema = z.object({
//     equipment_id: z.string({
//         invalid_type_error: 'Please select an equipment.',
//     }),
//     operator_id: z.coerce.string().nullable(),
//     amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
//     hm_or_km: z.coerce.number().nullable(),
//     hm_or_km_unit: z.enum(['hour', 'km',]).nullable(),
// });

// const CreateFuelConsumption = FormSchema.omit({});

// export interface FormErrors {
//     equipment_id?: string[];
//     operator_id?: string[];
//     amount?: string[];
//     hm_or_km?: string[];
//     hm_or_km_unit?: string[];
// }

// export interface State {
//     errors?: FormErrors;
//     message?: string;
// }


// export async function createFuelConsumption(user_id: string, formData: FormData) {
//     // Validate form using Zod
//     const validatedFields = CreateFuelConsumption.safeParse({
//         equipment_id: formData.get('equipmentId'),
//         operator_id: formData.get('operatorId'),
//         amount: formData.get('amount'),
//         hm_or_km: formData.get('hm_or_km'),
//         hm_or_km_unit: formData.get('hm_or_km_unit')
//     });

//     console.log("EQ ID: ", validatedFields.data?.equipment_id)

//     // If form validation fails, return errors early. Otherwise, continue.
//     if (!validatedFields.success) {
//         console.log("CHECKPOINT")
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Missing Fields. Failed to Report Fuel Consumption.',
//         };
//     }

//     const baseUrl = process.env.API_HOST || 'https://api.malili.adisarana.id'
//     const url = baseUrl + '/v1/fuel/consumption'


//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-User-Id": user_id
//             },
//             body: JSON.stringify(validatedFields.data),
//             cache: "no-store"
//         });


//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }
//         // const response = await axios.post(url, validatedFields.data, {
//         //     headers: {
//         //         "Content-Type": "application/json",
//         //         "X-User-Id": user_id
//         //     }
//         // });

//         // // Axios automatically throws an error for non-2xx status codes,
//         // // so if we reach here, the request was successful
//         // console.log('Response:', response.data);


//     } catch (error) {
//         console.error("Fetch error:", error);
//         return { data: [] }; // Return an empty array on failure
//     }
// }

export interface createFuelConsumptionPayload {
    equipment_id: string
    operator_id: string | null
    amount: number
    hm_or_km: number | null
    hm_or_km_unit: string | null
}

export async function createFuelConsumption(userId: string, params: createFuelConsumptionPayload) {
    const baseUrl = process.env.API_HOST || 'https://api.malili.adisarana.id'
    const url = baseUrl + '/v1/fuel/consumption'

    console.log(url)
    console.log(userId, params)

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-Id": userId
            },
            body: JSON.stringify(params),
            cache: "no-store"
        });


        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return NextResponse.json({ message: 'Report Created' });
    } catch (error) {
        console.error("Fetch error:", error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
        }
    }
}