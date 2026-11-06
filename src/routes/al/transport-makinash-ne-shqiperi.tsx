import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/transport-makinash-ne-shqiperi")({
  head: () => keywordHead(KEYWORD_PAGES[14], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[14]} sq={true} />,
});
