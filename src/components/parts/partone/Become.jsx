import Card from "../../common/Card";

const box = [
  {
    title: "Legally Guaranteed Returns",
    paragraph:
      "Enjoy Annual Co-op Dividends Based on Your Membership Contribution",
  },
  {
    title: "Access Exclusive Investment Rounds",
    paragraph: "Develop Strategies Build Your Portfolio, and Track Success",
  },
  {
    title: "Expand Your Network",
    paragraph:
      "Participate in Members Meeting Online Chats, and Live Social Events with investors & Entrepreneurs",
  },
  {
    title: "Vote and Engage with Chain Coop Network",
    paragraph: "Contribute ideas and Commit to collective Growth",
  },
];

const Become = () => {
  return (
    <main className="mx-auto mb-[3em] flex items-center justify-center font-sans lg:w-[86%] ">
      <div>
        <header className="py-8 text-center text-text4">
          <h1 className="mb-2 font-bold sm:text-2xl lg:text-3xl">
            Become an Early Member
          </h1>
          <h1 className="mb-2 font-bold sm:text-2xl lg:text-3xl">
            with a One-Time N100K Membership Fee
          </h1>
          <p className="font-semibold">
            Enjoy All the Benefits Chain Coop Has to Offer
          </p>
        </header>
        <div className="grid justify-center sm:grid-cols-[1fr] lg:grid-cols-[1fr,1fr] lg:gap-2">
          {box.map((item, index) => (
            <Card className="sm:p-3 md:p-[3.2em] lg:p-[3.2em]" key={index}>
              <div className="lg:px-3em] sm:px-[1em]">
                <h2 className="mb-2 text-lg font-bold">{item.title}</h2>
                <p className="font-sans lg:mt-[2em]">{item.paragraph}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Become;
