import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/t1-transit")({
  head: () => keywordHead(KEYWORD_PAGES[40], false),
  component: () => <KeywordPage page={KEYWORD_PAGES[40]} sq={false} />,
});
