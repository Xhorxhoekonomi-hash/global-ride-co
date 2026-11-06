import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/shipping-to-north-macedonia")({
  head: () => keywordHead(KEYWORD_PAGES[12], false),
  component: () => <KeywordPage page={KEYWORD_PAGES[12]} sq={false} />,
});
