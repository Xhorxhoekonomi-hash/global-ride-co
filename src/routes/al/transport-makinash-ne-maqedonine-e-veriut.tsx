import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";

export const Route = createFileRoute("/al/transport-makinash-ne-maqedonine-e-veriut")({
  head: () => keywordHead(KEYWORD_PAGES[12], true),
  component: () => <KeywordPage page={KEYWORD_PAGES[12]} sq={true} />,
});
