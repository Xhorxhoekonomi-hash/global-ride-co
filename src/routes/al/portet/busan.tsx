import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/portet/busan")({
  head: () => keywordHead(KEYWORD_PAGES[31], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[31]} sq={true} />,
});
