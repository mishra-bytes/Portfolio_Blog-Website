"use client";

import { useState, type FormEvent } from "react";

type PublicCommentRecord = {
  id: string;
  slug: string;
  author_name: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  is_author: boolean;
  upvotes: number | null;
};

type CommentFormProps = {
  slug: string;
  parentId?: string;
  onSuccess: (comment: PublicCommentRecord) => void | Promise<void>;
};

export function CommentForm({
  slug,
  parentId,
  onSuccess,
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setError("Please enter a comment.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          name: name.trim(),
          email: email.trim(),
          content: content.trim(),
          parentId,
        }),
      });

      const result = (await response.json()) as {
        comment?: PublicCommentRecord;
        error?: string;
      };

      if (!response.ok || !result.comment) {
        throw new Error(result.error ?? "Unable to save comment.");
      }

      setName("");
      setEmail("");
      setContent("");
      await onSuccess(result.comment);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save comment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          disabled={isSubmitting}
          className="w-full rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-slate-300 focus:bg-white"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          disabled={isSubmitting}
          className="w-full rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-slate-300 focus:bg-white"
        />
      </div>

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder={parentId ? "Write a reply..." : "What are your thoughts?"}
        disabled={isSubmitting}
        className="mb-4 min-h-[100px] w-full resize-none rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-slate-300 focus:bg-white"
      />

      <div className="flex items-center justify-between gap-4">
        {error ? <p className="text-sm text-red-500">{error}</p> : <div />}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-800 px-6 py-2.5 font-medium text-white transition-colors hover:bg-slate-900 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : parentId ? "Reply" : "Post"}
        </button>
      </div>
    </form>
  );
}
