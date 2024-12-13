"use client";

// import { useActionState } from 'react';
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  CircleStackIcon,
  TruckIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createFuelConsumption } from "@/app/lib/fuel-consumption";
import { EquipmentResponse } from "@/app/lib/equipment";
import { Operator } from "@/app/lib/operator";
import { FormEvent, useActionState, useState } from "react";
import { revalidateThenRedirect } from "@/app/lib/actions";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Form({
  user_id,
  operators,
  equipments,
}: {
  user_id: string;
  operators: Operator[];
  equipments: EquipmentResponse[];
}) {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const equipment_id = formData.get("equipmentId")?.toString() || "";
    const operator_id = formData.get("operatorId")?.toString() || null;
    const amount = parseInt(formData.get("amount")?.toString() || "0");
    const hm_or_km = parseInt(formData.get("hm_or_km")?.toString() || "0");
    const hm_or_km_unit = formData.get("hm_or_km_unit")?.toString() || null;



    createFuelConsumption(user_id, {
      equipment_id,
      operator_id,
      amount,
      hm_or_km,
      hm_or_km_unit,
    })
      .then(() => {
        revalidateThenRedirect("/dashboard/fuels");
        // revalidatePath("/dashboard/fuels")
        // redirect("/dashboard/fuels")
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Failed to submit report.",
          description: "",
          action: (
            <ToastAction altText="Goto schedule to undo">Close</ToastAction>
          ),
        });
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose Equipment
          </label>
          <div className="relative">
            <select
              id="equipment"
              name="equipmentId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
              aria-describedby="equipment-error"
            >
              <option value="" disabled>
                Select an Equipment
              </option>
              {equipments.map((equipment) => (
                <option key={equipment.id} value={equipment.id}>
                  {equipment.equipment_type.name} {equipment.code}
                </option>
              ))}
            </select>
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {/* {state?.errors?.equipment_id &&
              state.errors.equipment_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="operator" className="mb-2 block text-sm font-medium">
            Choose Operator
          </label>
          <div className="relative">
            <select
              id="operator"
              name="operatorId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="operator-error"
            >
              <option value="" disabled>
                Select an Operator
              </option>
              {operators.map((operator) => (
                <option key={operator.id} value={operator.id}>
                  {operator.name} ({operator.position.name})
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.operator_id &&
              state.errors.operator_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Input an amount (in Liter)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter Liter amount"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CircleStackIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Input HM/KM amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="hm_or_km"
                name="hm_or_km"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <ArrowTrendingUpIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the HM/KM unit
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="hour"
                  name="hm_or_km_unit"
                  type="radio"
                  value="hour"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Hour <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="km"
                  name="hm_or_km_unit"
                  type="radio"
                  value="km"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Km <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/fuels"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Report"}</Button>
      </div>
    </form>
  );
}
