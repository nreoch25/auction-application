"use client";

import { Button, Spinner } from "flowbite-react";
import { FieldValues, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import Input from "../extra/Input";
import { Fragment, useEffect } from "react";
import DateInput from "../extra/DateInput";
import { createAuction, updateAuction } from "@/app/actions/auctionActions";
import { toast } from "react-hot-toast";
import { Auction } from "@/types";

type Props = {
  auction?: Auction;
};

const AuctionForm = ({ auction }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
    reset,
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (auction) {
      const { make, model, color, year, mileage } = auction;
      reset({ make, model, color, year, mileage });
    }
    setFocus("make");
  }, [setFocus, auction, reset]);

  async function onSubmit(data: FieldValues) {
    console.log({ data });
    try {
      let id = "";
      let res;

      if (pathname.includes("create")) {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }
      if (res?.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-3">
      <Input
        name="make"
        label="Make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <Input
        name="model"
        label="Model"
        control={control}
        rules={{ required: "Model is required" }}
      />
      <Input
        name="color"
        label="Color"
        control={control}
        rules={{ required: "Color is required" }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          name="year"
          label="Year"
          control={control}
          type="number"
          rules={{ required: "Year is required" }}
        />
        <Input
          name="mileage"
          label="Mileage"
          control={control}
          type="number"
          rules={{ required: "Mileage is required" }}
        />
      </div>

      {pathname.includes("create") && (
        <Fragment>
          <Input
            name="imageUrl"
            label="Image URL"
            control={control}
            rules={{ required: "Image URL is required" }}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              name="reservePrice"
              label="Reserve Price"
              control={control}
              type="number"
              rules={{ required: "Reserve Price is required" }}
            />
            <DateInput
              name="auctionEnd"
              label="Auction End"
              control={control}
              showTimeSelect
              dateFormat="dd MMMM yyyy hh:mm a"
              rules={{ required: "Auction End is required" }}
            />
          </div>
        </Fragment>
      )}

      <div className="flex justify-between">
        <Button color="alternative" onClick={() => router.push("/")}>
          Cancel
        </Button>
        <Button
          outline
          type="submit"
          color="green"
          disabled={!isValid || !isDirty}
        >
          {isSubmitting && <Spinner size="sm" />}
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AuctionForm;
