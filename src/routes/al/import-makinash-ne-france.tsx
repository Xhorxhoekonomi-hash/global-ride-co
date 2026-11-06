import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/import-makinash-ne-france")({
  head: () => keywordHead(KEYWORD_PAGES[2], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[2]} sq={true} />,
});
