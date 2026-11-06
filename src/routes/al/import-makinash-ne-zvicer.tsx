import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/import-makinash-ne-zvicer")({
  head: () => keywordHead(KEYWORD_PAGES[5], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[5]} sq={true} />,
});
