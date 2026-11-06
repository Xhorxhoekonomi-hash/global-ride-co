import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/ports/busan")({
  head: () => keywordHead(KEYWORD_PAGES[31], false),
  component: () => <KeywordPage page={KEYWORD_PAGES[31]} sq={false} />,
});
