import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/transport-makinash-ne-holande")({
  head: () => keywordHead(KEYWORD_PAGES[15], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[15]} sq={true} />,
});
