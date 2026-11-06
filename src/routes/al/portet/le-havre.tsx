import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/portet/le-havre")({
  head: () => keywordHead(KEYWORD_PAGES[22], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[22]} sq={true} />,
});
