import { Node, mergeAttributes } from "@tiptap/core";

// <div class="faq-block"> wrapper
export const FaqWrapper = Node.create({
  name: "faqWrapper",
  group: "block",
  content: "block+",
  parseHTML() {
    return [{ tag: "div.faq-block" }];
  },
  renderHTML() {
    return ["div", { class: "faq-block" }, 0];
  },
});

// <details class="faq-item">
export const FaqDetails = Node.create({
  name: "faqDetails",
  group: "block",
  content: "faqSummary block+",
  defining: true,
  parseHTML() {
    return [{ tag: "details" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["details", mergeAttributes(HTMLAttributes), 0];
  },
});

// <summary class="faq-question">
export const FaqSummary = Node.create({
  name: "faqSummary",
  content: "inline*",
  defining: true,
  parseHTML() {
    return [{ tag: "summary" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["summary", mergeAttributes(HTMLAttributes), 0];
  },
});
