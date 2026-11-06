import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/locations/dubai")({
  head: () => keywordHead(KEYWORD_PAGES[33], false),
  component: () => <KeywordPage page={KEYWORD_PAGES[33]} sq={false} />,
});
