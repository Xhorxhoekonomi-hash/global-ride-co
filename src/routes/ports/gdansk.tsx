import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/ports/gdansk")({
  head: () => keywordHead(KEYWORD_PAGES[29], false),
  component: () => <KeywordPage page={KEYWORD_PAGES[29]} sq={false} />,
});
