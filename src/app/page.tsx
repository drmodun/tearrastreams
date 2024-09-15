import Image from "next/image";
import { TitleCard, TitleCardButtonProps } from "@/components/ui/titleCard";
import earth from "@assets/earth.svg";
import { SpecialTitle } from "@/components/ui/specialTitle";
import { SlimCard, SlimCardProps } from "@/components/ui/slimCard";
import broadcast from "@assets/broadcast.svg";
import personAdd from "@assets/person-add.svg";
import announcement from "@assets/announcement.svg";
import logoSection from "@assets/logo-section.svg";
import {
  FAQ,
  FrequentlyAskedQuestionsProps,
  QuestionProp,
} from "@/components/ui/faq";

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
    buttonIcon: broadcast,
  },
  {
    title: "Contribute Your User Data",
    description:
      "Upload GeoJSON files with ease, and let TerraStream analyze your region's environmental status in seconds.",
    buttonLink: "/map",
    buttonIcon: personAdd,
  },
  {
    title: "Social Listening & Sentiment Analysis",
    buttonIcon: announcement,
    description:
      "Track and analyze social media posts related to environmental issues, with insights into public sentiment on sustainability in specific regions.",
    buttonLink: "/map",
  },
];

const questions: QuestionProp[] = [
  {
    question: " How does TerraStream gather data?",
    answer:
      "TerraStream combines Copernicus satellite data, user-generated content, and social media sentiment to provide real-time risk assessments and insights. ",
  },
  {
    question: "Can anyone upload environmental data?",
    answer: "Absolutely not, data is heavily vetted and verified by our team.",
  },
  {
    question: "How does social listening work?",
    answer:
      "TerraStream uses sentiment analysis and machine learning to track social media posts related to environmental issues. ",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, you can try TerraStream for free for 30 days.",
  },
  {
    question: "How secure is my data?",
    answer: "TerraStream cares about your privacy and data security. ",
  },
  {
    question: "What integrations are available?",
    answer:
      "TerraStream integrates with GIS systems, social media monitoring platforms, and sustainability management software.",
  },
];

// TODO: fix these questions

export default function Home() {
  return (
    <div className="bg-[#101112] flex-col align-middle md:px-[19vw]">
      <TitleCard
        titleFirstPart="Your Data-Powered Environmental"
        specialWord="Risk"
        sideContentImage
        titleSecondPart="Evaluator"
        superLargeFont
        description="Leverage satellite data, user-generated content, and social listening to deliver real-time insights on environmental risks. Empower your sustainability strategies with TerraStream today."
        buttons={mainTitleButtons}
      >
        <div className="w-100%">
          <Image layout="fill" src={earth} alt="Hero image" priority />
        </div>
      </TitleCard>
      <section className="flex-col md:gap-y-[2vw]">
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
      </section>
      <section className="flex-col md:gap-y-[2vw]">
        <TitleCard
          titleFirstPart="Seamless tool"
          sideContentImage
          description=" TerraStream integrates with existing tools such as GIS systems, social media monitoring platforms, and sustainability management software."
          specialWord="Integration"
        >
          <div className="w-100%">
            <Image layout="fill" src={logoSection} alt="Hero image" priority />
          </div>
        </TitleCard>
      </section>
      <section id="faq">
        <TitleCard
          titleFirstPart="Frequently Asked"
          specialWord="Questions"
          description="Have questions about our service? Find 
        answers to the most common questions and learn how our 
        platform gather data and enhance your policy making process."
        >
          <FAQ questions={questions} />
        </TitleCard>
      </section>
    </div>
  );
}
