import { createFileRoute } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { KeywordPage, keywordHead } from "@/components/site/KeywordPage";
export const Route = createFileRoute("/locations/los-angeles")({ head: () => keywordHead(KEYWORD_PAGES[48], false), component: () => <KeywordPage page={KEYWORD_PAGES[48]} sq={false} /> });
