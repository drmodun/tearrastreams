import Image from "next/image";
import { TitleCard, TitleCardButtonProps } from "@/components/ui/titleCard";
import earth from "@assets/earth.svg";
import { SpecialTitle } from "@/components/ui/specialTitle";
import { SlimCard, SlimCardProps } from "@/components/ui/slimCard";

const mainTitleButtons: TitleCardButtonProps[] = [
  {
    buttonText: "Get started",
    link: "/map",
  },
  {
    buttonText: "Learn more",
    variant: "link",
    link: "/#faq",
  },
];

const slimCardsData: SlimCardProps[] = [
  {
    title: "Add your GeoData",
    description:
      "Upload GeoJSON files with ease, and let TerraStream analyze your region's environmental status in seconds.",
    buttonLink: "/map",
  },
  {
    title: "Generate Real-Time reports",
    description:
      "Using satellite data from Copernicus, TerraStream calculates deforestation, water pollution risks, and carbon footprint metrics.",
    buttonLink: "/map",
  },
  {
    title: "Contribute Your User Data",
    description:
      "Upload GeoJSON files with ease, and let TerraStream analyze your region's environmental status in seconds.",
    buttonLink: "/map",
  },
  {
    title: "Social Listening & Sentiment Analysis",
    description:
      "Track and analyze social media posts related to environmental issues, with insights into public sentiment on sustainability in specific regions.",
    buttonLink: "/map",
  },
];

export default function Home() {
  return (
    <div className="bg-[#101112] flex-col align-middle md:px-[19vw]">
      <TitleCard
        titleFirstPart="Your Data-Powered Environmental"
        specialWord="Risk"
        titleSecondPart="Evaluator"
        description="Leverage satellite data, user-generated content, and social listening to deliver real-time insights on environmental risks. Empower your sustainability strategies with TerraStream today."
        buttons={mainTitleButtons}
      >
        <div className="w-100% h-">
          <Image layout="fill" src={earth} alt="Hero image" priority />
        </div>
      </TitleCard>
      <article className="flex-col md:gap-y-[2vw]">
        <SpecialTitle
          textBeforeSpecialSection="Unleash Your Power for"
          specialWord="Sustainability"
          description="TerraStreams enables citizens, companies, and governments to monitor environmental risks and reduce their carbon footprint using satellite data, user-generated content, and sentiment analysis."
        />
        <section className="flex flex-row md:gap-x-[1vw]">
          {slimCardsData.map((card, index) => (
            <SlimCard key={index} {...card} />
          ))}
        </section>
      </article>
    </div>
  );
}
