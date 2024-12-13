type BaseResponse = {
    data: EquipmentResponse[];
}

type EquipmentType = {
    id: string;
    name: string;
}

export type EquipmentResponse = {
    id: string;
    category: string;
    equipment_type: EquipmentType;
    model: string;
    code: string;
    factor: number;
}

export async function getListEquipment(): Promise<BaseResponse> {
    const baseUrl = process.env.API_HOST || 'https://api.malili.adisarana.id'
    const url = baseUrl + '/v1/equipment?page=1&size=1000'
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