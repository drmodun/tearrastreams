export interface specialTitleProps {
  textBeforeSpecialSection?: string;
  specialWord: string;
  textAfterSpecialSection?: string;
  description: string;
}

export function SpecialTitle({
  textBeforeSpecialSection,
  specialWord,
  textAfterSpecialSection,
  description,
}: specialTitleProps) {
  return (
    <div className="flex flex-col md:gap-y-[0.5vw] md:mb-[2vw]">
      <div className="text-white md:text-[3.33333vw] font-medium md:leading-[3.66667vw]">
        {`${textBeforeSpecialSection} `}
        <span className="text-[#914BF1] md:text-[3.33333vw] font-medium md:leading-[3.66667vw]">
          {specialWord}&nbsp;
        </span>
        {textAfterSpecialSection}
      </div>
      <div className="text-[#D9D9D9] md:text-[0.9375vw] font-normal md:leading-[1.125vw]">
        {description}
      </div>
    </div>
  );
}
