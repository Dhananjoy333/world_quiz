import { NextResponse } from "next/server";
import countries from "@/data/countries.json";

type Flag = {
  id: number;
  name: string;
  code: string;
};

let lastIndex = -1;

function nextQuestion(list:Flag[]) {
  let index;

  do {
    index = Math.floor(Math.random() * list.length);
  } while (index === lastIndex && list.length > 1);

  lastIndex = index;

  return list[index];
}

export async function GET() {
  const question = nextQuestion(countries);

  return NextResponse.json({
    id: question.id,
    country: question.name,
    flag: question.code,
  });
}