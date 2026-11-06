import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/import-makinash-ne-spanje")({
  head: () => keywordHead(KEYWORD_PAGES[7], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[7]} sq={true} />,
});
