import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/carnet-de-passage")({
  head: () => keywordHead(KEYWORD_PAGES[41], false),
  component: () => <KeywordPage page={KEYWORD_PAGES[41]} sq={false} />,
});
