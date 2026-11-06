import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/transport-tokesor")({
  head: () => keywordHead(KEYWORD_PAGES[37], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[37]} sq={true} />,
});
