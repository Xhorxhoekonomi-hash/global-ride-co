import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/port-handling")({
  head: () => keywordHead(KEYWORD_PAGES[42], false),
  component: () => <KeywordPage page={KEYWORD_PAGES[42]} sq={false} />,
});
