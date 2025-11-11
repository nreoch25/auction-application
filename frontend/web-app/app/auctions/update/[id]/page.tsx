import { getDetailedViewData } from "@/app/actions/auctionActions";
import AuctionForm from "@/app/components/auctions/AuctionForm";
import Heading from "@/app/components/extra/Heading";

const UpdateAuctionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getDetailedViewData(id);

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update your auction"
        subtitle="Please update the details of your car"
      />
      <AuctionForm auction={data} />
    </div>
  );
};

export default UpdateAuctionPage;
