import { NodeSelection } from "prosemirror-state";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BaseImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useCallback, useState } from "react";
import { useImageUpload } from "../../hooks/useImageUpload";
import { FaqWrapper, FaqDetails, FaqSummary } from "./FaqExtensions";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Loader2,
  HelpCircle,
  Plus,
  Trash2,
  X,
} from "lucide-react";

// Extend Image to support data-size attribute
const Image = BaseImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      "data-size": {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-size"),
        renderHTML: (attributes: Record<string, string>) => {
          if (!attributes["data-size"]) return {};
          return { "data-size": attributes["data-size"] };
        },
      },
    };
  },
});

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const { upload, uploading } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingImageSize = useRef<"small" | "medium" | "banner">("medium");
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqItems, setFaqItems] = useState([{ q: "", a: "" }]);
  const editingFaqPosRef = useRef<number | null>(null);

  // Ref to track onChange without causing re-renders
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Track the last HTML the editor emitted (to distinguish internal vs external changes)
  const editorOutputRef = useRef(value || "");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({
        HTMLAttributes: { class: "content-image" },
        allowBase64: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Commencez a ecrire...",
      }),
      FaqWrapper,
      FaqDetails,
      FaqSummary,
    ],
    content: value || "",
    onUpdate: ({ editor: e }) => {
      const html = e.getHTML();
      editorOutputRef.current = html;
      onChangeRef.current(html);
    },
  });

  // Sync ONLY external value changes (e.g. language tab switch)
  useEffect(() => {
    if (editor && value !== editorOutputRef.current) {
      editorOutputRef.current = value;
      editor.commands.setContent(value || "", { emitUpdate: false } as any);
    }
  }, [editor, value]);

  const handleImageUpload = useCallback(
    async (file: File, size: "small" | "medium" | "banner") => {
      if (!editor) return;
      const url = await upload(file, "content");
      if (url) {
        editor
          .chain()
          .focus()
          .setImage({ src: url, alt: "", title: "", "data-size": size } as any)
          .run();
      }
    },
    [editor, upload]
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file, pendingImageSize.current);
      }
      e.target.value = "";
    },
    [handleImageUpload]
  );

  const insertFaq = useCallback(() => {
    if (!editor) return;
    const validItems = faqItems.filter((i) => i.q.trim() && i.a.trim());
    if (validItems.length === 0) return;
    const html =
      `<div class="faq-block">` +
      validItems
        .map(
          (item) =>
            `<details><summary>${item.q}</summary><p>${item.a}</p></details>`
        )
        .join("") +
      `</div>`;

    if (editingFaqPosRef.current !== null) {
      const pos = editingFaqPosRef.current;
      const node = editor.state.doc.nodeAt(pos);
      if (node) {
        editor
          .chain()
          .command(({ tr, state, dispatch }) => {
            if (!dispatch) return false;
            dispatch(tr.setSelection(NodeSelection.create(state.doc, pos)));
            return true;
          })
          .focus()
          .deleteSelection()
          .insertContent(html)
          .run();
      }
    } else {
      editor.chain().focus().insertContent(html).run();
    }

    setShowFaqModal(false);
    setFaqItems([{ q: "", a: "" }]);
    editingFaqPosRef.current = null;
  }, [editor, faqItems]);

  const insertLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL du lien:", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all duration-200 ${
        active
          ? "bg-[#E40714] text-white shadow-sm"
          : "text-[#1B1B1B]/60 hover:bg-[#E40714]/10 hover:text-[#E40714]"
      }`}
    >
      {children}
    </button>
  );

  const Separator = () => <div className="w-px h-6 bg-[#C6C6C6]/40 mx-2" />;

  return (
    <div className="border border-[#E0E0E0] rounded-xl overflow-hidden focus-within:border-[#E40714] transition-colors">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-2.5 bg-[#F8F8F8] border-b border-[#E0E0E0] flex-wrap">
        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Gras"
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italique"
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Souligne"
        >
          <UnderlineIcon size={16} />
        </ToolbarButton>

        <Separator />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Titre H2"
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Titre H3"
        >
          <Heading3 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          active={editor.isActive("heading", { level: 4 })}
          title="Titre H4"
        >
          <Heading4 size={16} />
        </ToolbarButton>

        <Separator />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Liste a puces"
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Liste numerotee"
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Citation"
        >
          <Quote size={16} />
        </ToolbarButton>

        <Separator />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Aligner a gauche"
        >
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Centrer"
        >
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Aligner a droite"
        >
          <AlignRight size={16} />
        </ToolbarButton>

        <Separator />

        {/* Link */}
        <ToolbarButton
          onClick={insertLink}
          active={editor.isActive("link")}
          title="Lien"
        >
          <LinkIcon size={16} />
        </ToolbarButton>

        <Separator />

        {/* FAQ */}
        <ToolbarButton
          onClick={() => {
            if (editor.isActive("faqWrapper")) {
              // Extract existing items
              const { state } = editor;
              const $from = state.doc.resolve(state.selection.from);
              let faqNode = null;
              let faqPos: number | null = null;
              for (let i = $from.depth; i >= 0; i--) {
                const n = $from.node(i);
                if (n.type.name === "faqWrapper") {
                  faqNode = n;
                  faqPos = $from.before(i);
                  break;
                }
              }
              if (faqNode && faqPos !== null) {
                const items: { q: string; a: string }[] = [];
                faqNode.forEach((det: any) => {
                  if (det.type.name === "faqDetails") {
                    let q = "", a = "";
                    det.forEach((child: any) => {
                      if (child.type.name === "faqSummary") q = child.textContent;
                      else if (!a) a = child.textContent;
                    });
                    items.push({ q, a });
                  }
                });
                setFaqItems(items.length > 0 ? items : [{ q: "", a: "" }]);
                editingFaqPosRef.current = faqPos;
              }
            } else {
              setFaqItems([{ q: "", a: "" }]);
              editingFaqPosRef.current = null;
            }
            setShowFaqModal(true);
          }}
          active={editor.isActive("faqWrapper")}
          title={editor.isActive("faqWrapper") ? "Modifier la FAQ" : "Insérer une FAQ"}
        >
          <HelpCircle size={16} />
        </ToolbarButton>

        <Separator />

        {/* Image sizes */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Image petite (300px)"
            onClick={() => {
              pendingImageSize.current = "small";
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[#1B1B1B]/60 hover:bg-[#E40714]/10 hover:text-[#E40714] transition-all text-[11px] font-bold"
          >
            <ImageIcon size={14} />
            <span>S</span>
          </button>
          <button
            type="button"
            title="Image moyenne (50%)"
            onClick={() => {
              pendingImageSize.current = "medium";
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[#1B1B1B]/60 hover:bg-[#E40714]/10 hover:text-[#E40714] transition-all text-[11px] font-bold"
          >
            <ImageIcon size={14} />
            <span>M</span>
          </button>
          <button
            type="button"
            title="Image banniere (100%)"
            onClick={() => {
              pendingImageSize.current = "banner";
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[#1B1B1B]/60 hover:bg-[#E40714]/10 hover:text-[#E40714] transition-all text-[11px] font-bold"
          >
            <ImageIcon size={14} />
            <span>L</span>
          </button>
        </div>

        {uploading && (
          <div className="flex items-center gap-1.5 ml-2 text-[#E40714] text-[12px]">
            <Loader2 size={14} className="animate-spin" />
            <span>Upload...</span>
          </div>
        )}
      </div>

      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="rich-editor-content px-5 py-4 min-h-[250px] text-[15px] max-w-none focus:outline-none"
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />

      {/* FAQ Builder Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl" style={{ display: "grid", gridTemplateRows: "auto 1fr auto", maxHeight: "85vh", overflow: "hidden" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E40714] rounded-lg flex items-center justify-center">
                  <HelpCircle size={16} color="white" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121]">{editingFaqPosRef.current !== null ? "Modifier la FAQ" : "Créer une FAQ"}</h3>
              </div>
              <button type="button" onClick={() => setShowFaqModal(false)} className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                <X size={18} className="text-[#1B1B1B]/50" />
              </button>
            </div>

            {/* Items */}
            <div className="px-6 py-4 space-y-4" style={{ overflowY: "auto", minHeight: 0 }}>
              {faqItems.map((item, i) => (
                <div key={i} className="bg-[#F8F8F8] rounded-xl p-4 border border-[#E0E0E0]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-bold text-[#E40714] uppercase tracking-wider">Question {i + 1}</span>
                    {faqItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setFaqItems(faqItems.filter((_, idx) => idx !== i))}
                        className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Question ?"
                    value={item.q}
                    onChange={(e) => setFaqItems(faqItems.map((it, idx) => idx === i ? { ...it, q: e.target.value } : it))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] text-[14px] font-semibold text-[#212121] focus:outline-none focus:border-[#E40714] mb-2"
                  />
                  <textarea
                    placeholder="Réponse..."
                    value={item.a}
                    rows={3}
                    onChange={(e) => setFaqItems(faqItems.map((it, idx) => idx === i ? { ...it, a: e.target.value } : it))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] text-[14px] text-[#1B1B1B]/80 focus:outline-none focus:border-[#E40714] resize-none"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => setFaqItems([...faqItems, { q: "", a: "" }])}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[#C6C6C6] hover:border-[#E40714] text-[#1B1B1B]/50 hover:text-[#E40714] transition-all text-[14px] font-semibold"
              >
                <Plus size={16} />
                Ajouter une question
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex gap-3">
              <button
                type="button"
                onClick={() => setShowFaqModal(false)}
                className="flex-1 py-3 rounded-xl border border-[#E0E0E0] text-[14px] font-semibold text-[#1B1B1B]/60 hover:bg-[#F5F5F5] transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={insertFaq}
                disabled={!faqItems.some((i) => i.q.trim() && i.a.trim())}
                className="flex-1 py-3 rounded-xl bg-[#E40714] text-white text-[14px] font-bold hover:bg-[#C00612] transition-colors disabled:opacity-40"
              >
                {editingFaqPosRef.current !== null ? "Enregistrer" : "Insérer la FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
