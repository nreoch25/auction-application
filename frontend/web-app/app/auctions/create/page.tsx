import Heading from "@/app/components/extra/Heading";
import AuctionForm from "@/app/components/auctions/AuctionForm";

const CreateAuctionPage = () => {
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Sell Your Car"
        subtitle="Please enter the details of your car"
      />
      <AuctionForm />
    </div>
  );
};

export default CreateAuctionPage;
