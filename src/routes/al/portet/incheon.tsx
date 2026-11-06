import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/portet/incheon")({
  head: () => keywordHead(KEYWORD_PAGES[32], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[32]} sq={true} />,
});
