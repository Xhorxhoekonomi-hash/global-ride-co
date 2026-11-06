import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/ports/antwerp")({
  head: () => keywordHead(KEYWORD_PAGES[20], false),
  component: () => <KeywordPage page={KEYWORD_PAGES[20]} sq={false} />,
});
