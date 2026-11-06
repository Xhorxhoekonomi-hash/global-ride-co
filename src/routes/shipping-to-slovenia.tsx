import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";
export const Route = createFileRoute("/shipping-to-slovenia")({ head: () => keywordHead(KEYWORD_PAGES[50], false), component: () => <KeywordPage page={KEYWORD_PAGES[50]} sq={false} /> });
