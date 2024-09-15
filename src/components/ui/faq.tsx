"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/common/accordion";

export interface QuestionProp {
  question: string;
  answer: string;
}

export interface FrequentlyAskedQuestionsProps {
  questions: QuestionProp[];
}

export function FAQ({ questions }: FrequentlyAskedQuestionsProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {questions.map((question, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="w-full">
          <AccordionTrigger className="text-white md:text-[0.9375vw] font-semibold md:leading-[1.21875vw]">
            {question.question}
          </AccordionTrigger>
          <AccordionContent className="text-[#D9D9D9] md:text-[0.9375vw] font-normal md:leading-[1.125vw]">
            {question.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
